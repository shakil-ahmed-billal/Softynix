"use client";

import { useState, useEffect } from "react";
import { useCourses, useCourseById } from "@/hooks/useCourses";
import {
  useCreateCourse,
  useUpdateCourse,
  useDeleteCourse,
} from "@/hooks/useCourseMutations";
import { useAllProducts } from "@/hooks/useAllProducts";
import { useActiveCategories } from "@/hooks/useCategories";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Plus, Edit, Trash2, Search, X, PlusCircle, GripVertical } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";

interface Milestone {
  milestone_id: number;
  milestone_name: string;
  description?: string;
  modules: Module[];
}

interface Module {
  module_id: number;
  module_name: string;
  duration: string;
  content?: string;
  viewed?: boolean;
  completed?: boolean;
  video_link: string;
}

export default function AdminCoursesPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<any>(null);
  const [formStatus, setFormStatus] = useState<"active" | "inactive">("active");
  const [selectedProductId, setSelectedProductId] = useState<string>("");
  const [milestones, setMilestones] = useState<Milestone[]>([]);

  const { data, isLoading, error, refetch } = useCourses({
    page,
    limit: 10,
    search: search || undefined,
  });

  // First, get the learning courses category ID
  const { data: categories } = useActiveCategories();
  const learningCourseCategory = categories?.find(
    (cat: any) => cat.slug?.toLowerCase() === "learning-courses"
  );
  
  // Then fetch products for that category
  const { data: productsData, isLoading: productsLoading } = useAllProducts({ 
    page: 1, 
    limit: 100,
    status: "active",
    categoryId: learningCourseCategory?.id
  });
  const products = productsData?.data || [];
  
  // Filter products by learning courses category (fallback client-side filter)
  const learningCourseProducts = products.filter((p: any) => {
    const categorySlug = p.category?.slug?.toLowerCase();
    return categorySlug === "learning-courses" || categorySlug === "learning courses" || 
           p.categoryId === learningCourseCategory?.id;
  });

  const createCourse = useCreateCourse();
  const updateCourse = useUpdateCourse();
  const deleteCourse = useDeleteCourse();

  // Load course data when editing
  useEffect(() => {
    if (editingCourse && editingCourse.modules) {
      try {
        const parsed = JSON.parse(editingCourse.modules);
        if (parsed.milestones && Array.isArray(parsed.milestones)) {
          setMilestones(parsed.milestones);
        } else if (parsed.course?.milestones) {
          setMilestones(parsed.course.milestones);
        } else {
          setMilestones([]);
        }
      } catch {
        setMilestones([]);
      }
    } else {
      setMilestones([]);
    }
  }, [editingCourse]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this course?")) return;
    try {
      await deleteCourse.mutateAsync(id);
      refetch();
    } catch (error: any) {
      toast.error(error.message || "Failed to delete course");
    }
  };

  const addMilestone = () => {
    const newMilestone: Milestone = {
      milestone_id: milestones.length + 1,
      milestone_name: `Milestone ${milestones.length + 1}`,
      description: "",
      modules: [],
    };
    setMilestones([...milestones, newMilestone]);
  };

  const updateMilestone = (index: number, field: keyof Milestone, value: any) => {
    const updated = [...milestones];
    updated[index] = { ...updated[index], [field]: value };
    setMilestones(updated);
  };

  const deleteMilestone = (index: number) => {
    setMilestones(milestones.filter((_, i) => i !== index));
  };

  const addModule = (milestoneIndex: number) => {
    const updated = [...milestones];
    const milestone = updated[milestoneIndex];
    const newModule: Module = {
      module_id: (milestone.modules?.length || 0) + 1,
      module_name: `Module ${(milestone.modules?.length || 0) + 1}`,
      duration: "1 hour",
      content: "",
      viewed: false,
      completed: false,
      video_link: "",
    };
    milestone.modules = [...(milestone.modules || []), newModule];
    setMilestones(updated);
  };

  const updateModule = (
    milestoneIndex: number,
    moduleIndex: number,
    field: keyof Module,
    value: any
  ) => {
    const updated = [...milestones];
    updated[milestoneIndex].modules[moduleIndex] = {
      ...updated[milestoneIndex].modules[moduleIndex],
      [field]: value,
    };
    setMilestones(updated);
  };

  const deleteModule = (milestoneIndex: number, moduleIndex: number) => {
    const updated = [...milestones];
    updated[milestoneIndex].modules = updated[milestoneIndex].modules.filter(
      (_, i) => i !== moduleIndex
    );
    setMilestones(updated);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (!selectedProductId) {
      toast.error("Please select a product");
      return;
    }

    // Build course structure
    const courseStructure = {
      course_id: editingCourse?.id ? parseInt(editingCourse.id.slice(-4), 16) || 1 : 1,
      course_name: formData.get("title") as string,
      description: (formData.get("description") as string) || "",
      milestones: milestones.map((m) => ({
        milestone_id: m.milestone_id,
        milestone_name: m.milestone_name,
        description: m.description || "",
        modules: m.modules.map((mod) => ({
          module_id: mod.module_id,
          module_name: mod.module_name,
          duration: mod.duration,
          content: mod.content || "",
          viewed: mod.viewed || false,
          completed: mod.completed || false,
          video_link: mod.video_link,
        })),
      })),
    };

    const modulesJson = JSON.stringify({ course: courseStructure });

    // Handle thumbnail file upload
    const thumbnailFile = formData.get("thumbnail") as File;
    const thumbnailUrl = formData.get("thumbnail-url") as string;
    
    // Create new FormData for submission
    const submitData = new FormData();
    submitData.append("productId", selectedProductId);
    submitData.append("title", (formData.get("title") as string).trim());
    
    const descriptionValue = (formData.get("description") as string).trim();
    if (descriptionValue) {
      submitData.append("description", descriptionValue);
    }
    
    const instructorValue = (formData.get("instructor") as string).trim();
    if (instructorValue) {
      submitData.append("instructor", instructorValue);
    }
    
    const durationValue = (formData.get("duration") as string).trim();
    if (durationValue) {
      submitData.append("duration", durationValue);
    }
    
    const levelValue = formData.get("level") as string;
    if (levelValue) {
      submitData.append("level", levelValue);
    }
    
    submitData.append("language", (formData.get("language") as string) || "en");
    submitData.append("videoUrl", (formData.get("videoUrl") as string).trim() || "");
    submitData.append("modules", modulesJson);
    submitData.append("status", formStatus);
    
    // Add thumbnail (file takes priority over URL)
    if (thumbnailFile && thumbnailFile.size > 0) {
      submitData.append("thumbnail", thumbnailFile);
    } else if (thumbnailUrl && thumbnailUrl.trim()) {
      submitData.append("thumbnail", thumbnailUrl.trim());
    }

    try {
      if (editingCourse) {
        submitData.append("id", editingCourse.id);
        await updateCourse.mutateAsync(submitData as any);
      } else {
        await createCourse.mutateAsync(submitData as any);
      }
      setIsDialogOpen(false);
      setEditingCourse(null);
      setMilestones([]);
      setSelectedProductId("");
      setFormStatus("active");
      refetch();
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || error?.message || "Failed to save course";
      toast.error(errorMessage);
    }
  };

  const openEditDialog = (course: any) => {
    setEditingCourse(course);
    setSelectedProductId(course.productId);
    setFormStatus(course.status || "active");
    setIsDialogOpen(true);
  };

  const openCreateDialog = () => {
    setEditingCourse(null);
    setSelectedProductId("");
    setMilestones([]);
    setFormStatus("active");
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Courses</h1>
          <p className="text-muted-foreground">Manage learning courses with modules and milestones</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog}>
              <Plus className="h-4 w-4 mr-2" />
              Add Course
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingCourse ? "Edit Course" : "Create Course"}
              </DialogTitle>
              <DialogDescription>
                {editingCourse
                  ? "Update course information and structure"
                  : "Create a new course with modules and milestones"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="productId">Product *</Label>
                <Select
                  value={selectedProductId}
                  onValueChange={setSelectedProductId}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a product" />
                  </SelectTrigger>
                  <SelectContent>
                    {productsLoading ? (
                      <SelectItem value="loading" disabled>Loading products...</SelectItem>
                    ) : learningCourseProducts.length > 0 ? (
                      learningCourseProducts.map((product: any) => (
                        <SelectItem key={product.id} value={product.id}>
                          {product.name}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="no-products" disabled>
                        No learning course products found. Create a product first.
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="title">Course Title *</Label>
                <Input
                  id="title"
                  name="title"
                  defaultValue={editingCourse?.title}
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  className="min-h-[100px]"
                  defaultValue={editingCourse?.description}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="instructor">Instructor</Label>
                  <Input
                    id="instructor"
                    name="instructor"
                    defaultValue={editingCourse?.instructor}
                  />
                </div>
                <div>
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    name="duration"
                    placeholder="e.g., 10 hours, 4 weeks"
                    defaultValue={editingCourse?.duration}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="level">Level</Label>
                  <Select
                    name="level"
                    defaultValue={editingCourse?.level || "beginner"}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="language">Language</Label>
                  <Input
                    id="language"
                    name="language"
                    defaultValue={editingCourse?.language || "en"}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="thumbnail">Thumbnail</Label>
                  <div className="space-y-2">
                    <Input
                      id="thumbnail"
                      name="thumbnail"
                      type="file"
                      accept="image/*"
                      className="cursor-pointer"
                    />
                    <div className="text-sm text-muted-foreground">Or enter URL:</div>
                    <Input
                      id="thumbnail-url"
                      name="thumbnail-url"
                      type="url"
                      placeholder="https://example.com/image.jpg"
                      defaultValue={editingCourse?.thumbnail || ""}
                    />
                    {editingCourse?.thumbnail && (
                      <div className="relative w-full h-32 border rounded-md overflow-hidden bg-muted">
                        <img
                          src={editingCourse.thumbnail}
                          alt="Current thumbnail"
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <Label htmlFor="videoUrl">Course Video URL</Label>
                  <Input
                    id="videoUrl"
                    name="videoUrl"
                    type="url"
                    defaultValue={editingCourse?.videoUrl}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={formStatus} onValueChange={(value) => setFormStatus(value as "active" | "inactive")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Milestones and Modules Editor */}
              <div className="border-t pt-4">
                <div className="flex items-center justify-between mb-4">
                  <Label className="text-lg font-semibold">Course Structure</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addMilestone}
                  >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Milestone
                  </Button>
                </div>

                <div className="space-y-4">
                  {milestones.map((milestone, mIndex) => (
                    <Card key={mIndex} className="p-4">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <GripVertical className="h-5 w-5 text-muted-foreground" />
                            <span className="font-semibold">Milestone {mIndex + 1}</span>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteMilestone(mIndex)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>

                        <div>
                          <Label>Milestone Name *</Label>
                          <Input
                            value={milestone.milestone_name}
                            onChange={(e) =>
                              updateMilestone(mIndex, "milestone_name", e.target.value)
                            }
                            required
                          />
                        </div>

                        <div>
                          <Label>Description</Label>
                          <Textarea
                            value={milestone.description || ""}
                            onChange={(e) =>
                              updateMilestone(mIndex, "description", e.target.value)
                            }
                            className="min-h-[60px]"
                          />
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <Label>Modules</Label>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => addModule(mIndex)}
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              Add Module
                            </Button>
                          </div>

                          <div className="space-y-3">
                            {milestone.modules.map((module, modIndex) => (
                              <Card key={modIndex} className="p-3 bg-muted/50">
                                <div className="space-y-2">
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">
                                      Module {modIndex + 1}
                                    </span>
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => deleteModule(mIndex, modIndex)}
                                    >
                                      <X className="h-4 w-4" />
                                    </Button>
                                  </div>

                                  <div>
                                    <Label className="text-xs">Module Name *</Label>
                                    <Input
                                      value={module.module_name}
                                      onChange={(e) =>
                                        updateModule(
                                          mIndex,
                                          modIndex,
                                          "module_name",
                                          e.target.value
                                        )
                                      }
                                      className="h-8 text-sm"
                                      required
                                    />
                                  </div>

                                  <div className="grid grid-cols-2 gap-2">
                                    <div>
                                      <Label className="text-xs">Duration</Label>
                                      <Input
                                        value={module.duration}
                                        onChange={(e) =>
                                          updateModule(
                                            mIndex,
                                            modIndex,
                                            "duration",
                                            e.target.value
                                          )
                                        }
                                        className="h-8 text-sm"
                                        placeholder="e.g., 1 hour"
                                      />
                                    </div>
                                    <div>
                                      <Label className="text-xs">Video Link *</Label>
                                      <Input
                                        value={module.video_link}
                                        onChange={(e) =>
                                          updateModule(
                                            mIndex,
                                            modIndex,
                                            "video_link",
                                            e.target.value
                                          )
                                        }
                                        className="h-8 text-sm"
                                        type="url"
                                        placeholder="https://..."
                                        required
                                      />
                                    </div>
                                  </div>

                                  <div>
                                    <Label className="text-xs">Content/Description</Label>
                                    <Textarea
                                      value={module.content || ""}
                                      onChange={(e) =>
                                        updateModule(
                                          mIndex,
                                          modIndex,
                                          "content",
                                          e.target.value
                                        )
                                      }
                                      className="min-h-[60px] text-xs"
                                      placeholder="Module description..."
                                    />
                                  </div>
                                </div>
                              </Card>
                            ))}

                            {milestone.modules.length === 0 && (
                              <p className="text-sm text-muted-foreground text-center py-4">
                                No modules yet. Click "Add Module" to add one.
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}

                  {milestones.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-8">
                      No milestones yet. Click "Add Milestone" to create the course structure.
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsDialogOpen(false);
                    setEditingCourse(null);
                    setMilestones([]);
                    setSelectedProductId("");
                    setFormStatus("active");
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {editingCourse ? "Update Course" : "Create Course"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search courses..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="pl-10"
          />
        </div>
      </div>

      {/* Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Instructor</TableHead>
              <TableHead>Level</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-destructive">
                  Error loading courses. Please check your admin authentication.
                </TableCell>
              </TableRow>
            ) : data?.data && data.data.length > 0 ? (
              data.data.map((course: any) => (
                <TableRow key={course.id}>
                  <TableCell className="font-medium">{course.title}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {course.product?.name || "N/A"}
                  </TableCell>
                  <TableCell>{course.instructor || "N/A"}</TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {course.level || "N/A"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        course.status === "active" ? "default" : "secondary"
                      }
                    >
                      {course.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditDialog(course)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(course.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  No courses found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>

      {/* Pagination */}
      {data?.pagination && data.pagination.totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {data.pagination.page} of {data.pagination.totalPages}
          </span>
          <Button
            variant="outline"
            onClick={() =>
              setPage((p) => Math.min(data.pagination.totalPages, p + 1))
            }
            disabled={page === data.pagination.totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}

