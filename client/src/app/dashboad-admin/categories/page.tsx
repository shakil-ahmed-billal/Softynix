"use client";

import { useState } from "react";
import { useAllCategories } from "@/hooks/useCategories";
import {
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
} from "@/hooks/useCategoryMutations";
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
import { Plus, Edit, Trash2, Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";

export default function AdminCategoriesPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [formStatus, setFormStatus] = useState<string>("active");

  const { data, isLoading, refetch } = useAllCategories({
    page,
    limit: 10,
    search: search || undefined,
  });

  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    try {
      await deleteCategory.mutateAsync(id);
      toast.success("Category deleted successfully");
      refetch();
    } catch (error: any) {
      toast.error(error.message || "Failed to delete category");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    // Convert slug to lowercase and replace spaces with hyphens
    const rawSlug = (formData.get("slug") as string) || "";
    const slug = rawSlug.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    
    // Handle image file upload
    const imageFile = formData.get("image") as File;
    const imageUrl = formData.get("image-url") as string;
    
    // Create new FormData for submission
    const submitData = new FormData();
    submitData.append("name", (formData.get("name") as string).trim());
    submitData.append("slug", slug);
    
    const descriptionValue = (formData.get("description") as string) || "";
    if (descriptionValue.trim()) {
      submitData.append("description", descriptionValue.trim());
    }
    
    submitData.append("status", formStatus);
    
    // Add image (file takes priority over URL)
    if (imageFile && imageFile.size > 0) {
      submitData.append("image", imageFile);
    } else if (imageUrl && imageUrl.trim()) {
      submitData.append("image", imageUrl.trim());
    }

    // Validation
    if (!slug) {
      toast.error("Slug is required");
      return;
    }

    try {
      if (editingCategory) {
        submitData.append("id", editingCategory.id);
        await updateCategory.mutateAsync(submitData as any);
        toast.success("Category updated successfully");
      } else {
        await createCategory.mutateAsync(submitData as any);
        toast.success("Category created successfully");
      }
      setIsDialogOpen(false);
      setEditingCategory(null);
      setFormStatus("active");
      refetch();
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || error?.message || "Failed to save category";
      const errorDetails = error?.response?.data?.errors;
      if (errorDetails && Array.isArray(errorDetails)) {
        toast.error(errorDetails.map((e: any) => e.message || e).join(", "));
      } else {
        toast.error(errorMessage);
      }
    }
  };

  const openEditDialog = (category: any) => {
    setEditingCategory(category);
    setFormStatus(category.status || "active");
    setIsDialogOpen(true);
  };

  const openCreateDialog = () => {
    setEditingCategory(null);
    setFormStatus("active");
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Categories</h1>
          <p className="text-muted-foreground">Manage product categories</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog}>
              <Plus className="h-4 w-4 mr-2" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingCategory ? "Edit Category" : "Create Category"}
              </DialogTitle>
              <DialogDescription>
                {editingCategory
                  ? "Update category information"
                  : "Add a new category"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={editingCategory?.name}
                  required
                />
              </div>
              <div>
                <Label htmlFor="slug">Slug *</Label>
                <Input
                  id="slug"
                  name="slug"
                  defaultValue={editingCategory?.slug}
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  name="description"
                  className="w-full min-h-[100px] px-3 py-2 border rounded-md"
                  defaultValue={editingCategory?.description}
                />
              </div>
              <div>
                <Label htmlFor="image">Image</Label>
                <div className="space-y-2">
                  <Input
                    id="image"
                    name="image"
                    type="file"
                    accept="image/*"
                    className="cursor-pointer"
                  />
                  <div className="text-sm text-muted-foreground">Or enter image URL:</div>
                  <Input
                    id="image-url"
                    name="image-url"
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    defaultValue={editingCategory?.image || ""}
                  />
                  {editingCategory?.image && (
                    <div className="relative w-full h-32 border rounded-md overflow-hidden bg-muted">
                      <img
                        src={editingCategory.image}
                        alt="Current image"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                </div>
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={formStatus} onValueChange={setFormStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                <input type="hidden" name="status" value={formStatus} />
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsDialogOpen(false);
                    setEditingCategory(null);
                    setFormStatus("active");
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {editingCategory ? "Update" : "Create"}
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
            placeholder="Search categories..."
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
              <TableHead>Name</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Products</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : data?.data && data.data.length > 0 ? (
              data.data.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {category.slug}
                  </TableCell>
                  <TableCell>{category._count?.products || 0}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        category.status === "active" ? "default" : "secondary"
                      }
                    >
                      {category.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditDialog(category)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(category.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No categories found
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

