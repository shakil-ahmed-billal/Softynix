"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock,
  Loader2,
  Play,
  Search,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface CourseModule {
  milestone_id: number;
  milestone_name: string;
  description: string;
  modules: Array<{
    module_id: number;
    module_name: string;
    duration: string;
    content: string;
    viewed: boolean;
    completed: boolean;
    video_link: string;
  }>;
}

interface CourseData {
  course: {
    course_id: number;
    course_name: string;
    description: string;
    milestones: CourseModule[];
  };
}

interface LessonCompletion {
  milestoneId: number;
  moduleId: number;
  completed: boolean;
  viewed: boolean;
}

export default function CoursePlayerPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.courseId as string;
  const axiosAuth = useAxiosAuth();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedModule, setSelectedModule] = useState<{
    milestoneId: number;
    moduleId: number;
  } | null>(null);
  const [lessonCompletions, setLessonCompletions] = useState<
    Map<string, LessonCompletion>
  >(new Map());
  const [expandedMilestones, setExpandedMilestones] = useState<Set<number>>(
    new Set()
  );

  // Fetch course data
  const { data: courseAccess, isLoading } = useQuery({
    queryKey: ["course-access", courseId],
    queryFn: async () => {
      const response = await axiosAuth.get(
        `/api/user-product-access/${courseId}`
      );
      return response.data.data;
    },
  });

  // Fetch lesson completions
  const { data: completions = [] } = useQuery({
    queryKey: ["lesson-completions", courseId],
    queryFn: async () => {
      const response = await axiosAuth.get(
        `/api/user-product-access/${courseId}/lesson-completions`
      );
      return response.data.data || [];
    },
    enabled: !!courseId,
  });

  // Update completions state when data loads
  useEffect(() => {
    if (completions && Array.isArray(completions)) {
      const completionMap = new Map<string, LessonCompletion>();
      completions.forEach(
        (comp: {
          milestoneId: number;
          moduleId: number;
          completed: boolean;
          viewed: boolean;
        }) => {
          const key = `${comp.milestoneId}-${comp.moduleId}`;
          completionMap.set(key, {
            milestoneId: comp.milestoneId,
            moduleId: comp.moduleId,
            completed: comp.completed,
            viewed: comp.viewed,
          });
        }
      );
      // Use setTimeout to avoid synchronous setState in effect
      setTimeout(() => setLessonCompletions(completionMap), 0);
    }
  }, [completions]);

  // Expand first milestone by default
  useEffect(() => {
    if (
      courseAccess?.product?.course?.modules &&
      expandedMilestones.size === 0
    ) {
      try {
        const parsed =
          typeof courseAccess.product.course.modules === "string"
            ? JSON.parse(courseAccess.product.course.modules)
            : courseAccess.product.course.modules;

        if (parsed && typeof parsed === "object") {
          const milestones =
            "course" in parsed && parsed.course?.milestones
              ? parsed.course.milestones
              : "milestones" in parsed && Array.isArray(parsed.milestones)
              ? parsed.milestones
              : [];

          if (milestones.length > 0 && milestones[0]?.milestone_id) {
            setTimeout(
              () =>
                setExpandedMilestones(new Set([milestones[0].milestone_id])),
              0
            );
          }
        }
      } catch (error) {
        console.error("Error parsing milestones:", error);
      }
    }
  }, [courseAccess, expandedMilestones.size]);

  // Mark lesson as completed mutation
  const markLessonCompleted = useMutation({
    mutationFn: async ({
      milestoneId,
      moduleId,
    }: {
      milestoneId: number;
      moduleId: number;
    }) => {
      const response = await axiosAuth.post(
        `/api/user-product-access/${courseId}/complete-lesson`,
        {
          milestoneId,
          moduleId,
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["lesson-completions", courseId],
      });
      queryClient.invalidateQueries({ queryKey: ["course-access", courseId] });
    },
  });

  // Mark lesson as viewed
  const markLessonViewed = useMutation({
    mutationFn: async ({
      milestoneId,
      moduleId,
    }: {
      milestoneId: number;
      moduleId: number;
    }) => {
      const response = await axiosAuth.post(
        `/api/user-product-access/${courseId}/view-lesson`,
        {
          milestoneId,
          moduleId,
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["lesson-completions", courseId],
      });
    },
  });

  // Parse course modules from JSON
  let courseData: CourseData | null = null;

  if (courseAccess?.product?.course?.modules) {
    try {
      const parsedModules =
        typeof courseAccess.product.course.modules === "string"
          ? JSON.parse(courseAccess.product.course.modules)
          : courseAccess.product.course.modules;

      // Handle different JSON structures
      if (parsedModules && typeof parsedModules === "object") {
        if ("course" in parsedModules && parsedModules.course) {
          courseData = parsedModules as CourseData;
        } else if (
          "milestones" in parsedModules &&
          Array.isArray(parsedModules.milestones)
        ) {
          courseData = {
            course: {
              course_id:
                "course_id" in parsedModules &&
                typeof parsedModules.course_id === "number"
                  ? parsedModules.course_id
                  : 1,
              course_name:
                "course_name" in parsedModules &&
                typeof parsedModules.course_name === "string"
                  ? parsedModules.course_name
                  : courseAccess.product.name,
              description:
                "description" in parsedModules &&
                typeof parsedModules.description === "string"
                  ? parsedModules.description
                  : courseAccess.product.course.description || "",
              milestones: parsedModules.milestones || [],
            },
          };
        }
      }
    } catch (error) {
      console.error("Error parsing course modules:", error);
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!courseData || !courseAccess || !courseData.course?.milestones) {
    return (
      <div className="p-6 text-foreground bg-background min-h-screen">
        <p className="text-lg mb-2">Course not found or invalid</p>
        <p className="text-sm text-muted-foreground">
          {!courseAccess
            ? "Course access not found"
            : "Course data is missing or invalid"}
        </p>
      </div>
    );
  }

  // Calculate total lessons and completed lessons
  const totalLessons = courseData.course.milestones.reduce(
    (sum, milestone) => sum + (milestone.modules?.length || 0),
    0
  );

  const completedLessons = Array.from(lessonCompletions.values()).filter(
    (c) => c.completed
  ).length;
  const progress =
    totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  // Check if milestone is completed (all modules completed)
  const isMilestoneCompleted = (milestoneId: number) => {
    if (!courseData?.course?.milestones) return false;
    const milestone = courseData.course.milestones.find(
      (m) => m.milestone_id === milestoneId
    );
    if (!milestone || !milestone.modules) return false;

    return milestone.modules.every((module) => {
      const key = `${milestoneId}-${module.module_id}`;
      return lessonCompletions.get(key)?.completed === true;
    });
  };

  // Get milestone progress
  const getMilestoneProgress = (milestoneId: number) => {
    if (!courseData?.course?.milestones) return { completed: 0, total: 0 };
    const milestone = courseData.course.milestones.find(
      (m) => m.milestone_id === milestoneId
    );
    if (!milestone || !milestone.modules) return { completed: 0, total: 0 };

    const completed = milestone.modules.filter((module) => {
      const key = `${milestoneId}-${module.module_id}`;
      return lessonCompletions.get(key)?.completed === true;
    }).length;

    return { completed, total: milestone.modules.length };
  };

  // Get selected module data
  const selectedModuleData =
    selectedModule && courseData.course.milestones
      ? courseData.course.milestones
          .find((m) => m.milestone_id === selectedModule.milestoneId)
          ?.modules?.find((mod) => mod.module_id === selectedModule.moduleId)
      : null;

  // Filter milestones based on search
  const filteredMilestones = (courseData.course.milestones || [])
    .map((milestone) => ({
      ...milestone,
      modules: (milestone.modules || []).filter((module) =>
        module.module_name?.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((milestone) => (milestone.modules || []).length > 0);

  // Toggle milestone expansion
  const toggleMilestone = (milestoneId: number) => {
    const newExpanded = new Set(expandedMilestones);
    if (newExpanded.has(milestoneId)) {
      newExpanded.delete(milestoneId);
    } else {
      newExpanded.add(milestoneId);
    }
    setExpandedMilestones(newExpanded);
  };

  // Handle module click
  const handleModuleClick = async (milestoneId: number, moduleId: number) => {
    setSelectedModule({ milestoneId, moduleId });

    // Mark as viewed when clicked
    const key = `${milestoneId}-${moduleId}`;
    if (!lessonCompletions.get(key)?.viewed) {
      markLessonViewed.mutate({ milestoneId, moduleId });
    }
  };

  // Handle module completion toggle
  const handleModuleComplete = (milestoneId: number, moduleId: number) => {
    const key = `${milestoneId}-${moduleId}`;
    const completion = lessonCompletions.get(key);

    if (!completion?.completed) {
      markLessonCompleted.mutate({ milestoneId, moduleId });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {courseData.course.course_name}
          </h1>
          <p className="text-muted-foreground">
            {courseData.course.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content Area - Left */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Player */}
            <Card className="border">
              <CardContent className="p-0">
                {selectedModuleData && selectedModuleData.video_link ? (
                  <div className="relative aspect-video bg-gradient-to-br from-primary/10 to-background rounded-lg overflow-hidden">
                    <div className="relative w-full h-full">
                      <iframe
                        src={selectedModuleData.video_link}
                        className="w-full h-full"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                        id="course-video-player"
                      />
                      {/* Video completion button */}
                      <div className="absolute bottom-4 right-4">
                        <Button
                          onClick={() => {
                            if (selectedModule) {
                              handleModuleComplete(
                                selectedModule.milestoneId,
                                selectedModule.moduleId
                              );
                            }
                          }}
                          className="bg-primary hover:bg-primary/90 text-primary-foreground"
                          disabled={
                            selectedModule
                              ? lessonCompletions.get(
                                  `${selectedModule.milestoneId}-${selectedModule.moduleId}`
                                )?.completed
                              : false
                          }
                        >
                          <CheckCircle2 className="w-4 h-4 mr-2" />
                          {selectedModule &&
                          lessonCompletions.get(
                            `${selectedModule.milestoneId}-${selectedModule.moduleId}`
                          )?.completed
                            ? "Completed"
                            : "Mark as Completed"}
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="aspect-video flex flex-col items-center justify-center bg-gradient-to-br from-primary/10 to-background rounded-lg">
                    <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                      <Play className="w-10 h-10 text-primary ml-1" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Ready to Start Learning?
                    </h3>
                    <p className="text-muted-foreground text-center max-w-md">
                      Select a lesson from the course sidebar to begin your
                      learning journey.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Lesson Summary Cards */}
            <div className="grid grid-cols-3 gap-4">
              <Card className="border-primary/50">
                <CardContent className="p-4 text-center">
                  <p className="text-3xl font-bold text-primary mb-1">
                    {totalLessons}
                  </p>
                  <p className="text-sm text-muted-foreground">Total Lessons</p>
                </CardContent>
              </Card>
              <Card className="border-primary/50">
                <CardContent className="p-4 text-center">
                  <p className="text-3xl font-bold text-primary mb-1">
                    {completedLessons}
                  </p>
                  <p className="text-sm text-muted-foreground">Completed</p>
                </CardContent>
              </Card>
              <Card className="border-primary/50">
                <CardContent className="p-4 text-center">
                  <p className="text-3xl font-bold text-primary mb-1">
                    {progress}%
                  </p>
                  <p className="text-sm text-muted-foreground">Progress</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sidebar - Right */}
          <div className="space-y-6">
            {/* Course Progress Card */}
            <Card className="border">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="w-5 h-5 text-primary" />
                  <h2 className="text-lg font-semibold text-foreground">
                    Course Progress
                  </h2>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Module{" "}
                  {selectedModule
                    ? courseData.course.milestones.findIndex(
                        (m) => selectedModule.milestoneId === m.milestone_id
                      ) + 1 || 1
                    : 1}{" "}
                  of {courseData.course.milestones.length}
                </p>
                <div className="mb-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-primary font-medium">
                      {completedLessons}/{totalLessons}
                    </span>
                    <span className="text-muted-foreground">
                      {progress}% Complete
                    </span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
                <p className="text-xs text-primary mt-2 flex items-center gap-1">
                  <span>✓</span> On track
                </p>
              </CardContent>
            </Card>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search lessons..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Lessons List */}
            <Card className="border shadow-lg">
              <CardContent className="p-0">
                <div className="max-h-[600px] overflow-y-auto custom-scrollbar">
                  {filteredMilestones.map((milestone, index) => {
                    const isCompleted = isMilestoneCompleted(
                      milestone.milestone_id
                    );
                    const milestoneProgress = getMilestoneProgress(
                      milestone.milestone_id
                    );
                    const isExpanded = expandedMilestones.has(
                      milestone.milestone_id
                    );
                    const isActive =
                      selectedModule?.milestoneId === milestone.milestone_id;

                    return (
                      <div
                        key={milestone.milestone_id}
                        className={`mb-3 last:mb-0 ${
                          isActive
                            ? "bg-gradient-to-r from-primary/20 via-primary/10 to-transparent rounded-lg border-2 border-primary shadow-md"
                            : "bg-card/50 rounded-lg border border-border/50"
                        } transition-all duration-300`}
                      >
                        {/* Milestone Header - Enhanced Design */}
                        <div
                          className={`p-4 cursor-pointer transition-all duration-200 rounded-lg ${
                            isActive
                              ? "bg-gradient-to-r from-primary/30 to-primary/10 shadow-inner"
                              : "hover:bg-muted/30"
                          }`}
                          onClick={() =>
                            toggleMilestone(milestone.milestone_id)
                          }
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 flex-1">
                              {/* Milestone Icon/Checkbox - Larger and more prominent */}
                              <div className="relative">
                                {isCompleted ? (
                                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center ring-2 ring-primary/50">
                                    <CheckCircle2 className="w-6 h-6 text-primary" />
                                  </div>
                                ) : (
                                  <div
                                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                                      isActive
                                        ? "border-primary bg-primary/10 ring-2 ring-primary/30"
                                        : "border-muted-foreground/50 bg-muted/20"
                                    }`}
                                  >
                                    <span className="text-xs font-bold text-foreground">
                                      {index + 1}
                                    </span>
                                  </div>
                                )}
                                {isActive && (
                                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full ring-2 ring-background animate-pulse" />
                                )}
                              </div>

                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <p
                                    className={`text-base font-semibold ${
                                      isActive
                                        ? "text-primary"
                                        : "text-foreground"
                                    }`}
                                  >
                                    {milestone.milestone_name}
                                  </p>
                                  {isActive && (
                                    <Badge className="bg-primary text-primary-foreground text-xs px-2 py-0.5 animate-pulse">
                                      Active
                                    </Badge>
                                  )}
                                  {isCompleted && !isActive && (
                                    <Badge
                                      variant="outline"
                                      className="border-primary text-primary text-xs px-2 py-0.5"
                                    >
                                      Completed
                                    </Badge>
                                  )}
                                </div>
                                <div className="flex items-center gap-3">
                                  <p className="text-xs text-muted-foreground">
                                    {milestoneProgress.completed}/
                                    {milestoneProgress.total} lessons
                                  </p>
                                  <div className="flex-1 max-w-[100px]">
                                    <Progress
                                      value={
                                        (milestoneProgress.completed /
                                          milestoneProgress.total) *
                                        100
                                      }
                                      className="h-1.5"
                                    />
                                  </div>
                                </div>
                                {milestone.description && (
                                  <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                                    {milestone.description}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {isExpanded ? (
                                <ChevronDown
                                  className={`w-5 h-5 transition-transform ${
                                    isActive
                                      ? "text-primary"
                                      : "text-muted-foreground"
                                  }`}
                                />
                              ) : (
                                <ChevronRight
                                  className={`w-5 h-5 transition-transform ${
                                    isActive
                                      ? "text-primary"
                                      : "text-muted-foreground"
                                  }`}
                                />
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Milestone Modules - Distinct Design */}
                        {isExpanded && (
                          <div
                            className={`px-4 pb-3 space-y-1 ${
                              isActive ? "bg-primary/5" : "bg-muted/20"
                            } rounded-b-lg`}
                          >
                            {(milestone.modules || []).map(
                              (module, modIndex) => {
                                const key = `${milestone.milestone_id}-${module.module_id}`;
                                const completion = lessonCompletions.get(key);
                                const isModuleCompleted =
                                  completion?.completed === true;
                                const isModuleSelected =
                                  selectedModule?.milestoneId ===
                                    milestone.milestone_id &&
                                  selectedModule?.moduleId === module.module_id;

                                return (
                                  <div
                                    key={module.module_id}
                                    className={`group relative px-4 py-2.5 rounded-md cursor-pointer transition-all duration-200 ${
                                      isModuleSelected
                                        ? "bg-primary/15 border-l-4 border-primary shadow-sm"
                                        : isModuleCompleted
                                        ? "bg-primary/5 border-l-2 border-primary/40 hover:bg-primary/10"
                                        : "bg-background/50 border-l-2 border-transparent hover:bg-muted/40 hover:border-primary/30"
                                    }`}
                                    onClick={() =>
                                      handleModuleClick(
                                        milestone.milestone_id,
                                        module.module_id
                                      )
                                    }
                                  >
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-3 flex-1 min-w-0">
                                        {/* Module Checkbox - Smaller than milestone */}
                                        <div
                                          className="flex-shrink-0 cursor-pointer relative"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleModuleComplete(
                                              milestone.milestone_id,
                                              module.module_id
                                            );
                                          }}
                                        >
                                          {isModuleCompleted ? (
                                            <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center ring-1 ring-primary/50">
                                              <CheckCircle2 className="w-4 h-4 text-primary" />
                                            </div>
                                          ) : (
                                            <div
                                              className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                                                isModuleSelected
                                                  ? "border-primary bg-primary/10"
                                                  : "border-muted-foreground/40 group-hover:border-primary/60"
                                              }`}
                                            >
                                              <span className="text-[10px] font-medium text-muted-foreground">
                                                {modIndex + 1}
                                              </span>
                                            </div>
                                          )}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                          <div className="flex items-center gap-2 mb-1">
                                            <p
                                              className={`text-sm font-medium truncate ${
                                                isModuleCompleted
                                                  ? "text-muted-foreground line-through opacity-60"
                                                  : isModuleSelected
                                                  ? "text-primary"
                                                  : "text-foreground"
                                              }`}
                                            >
                                              {module.module_name ||
                                                "Untitled Lesson"}
                                            </p>
                                            {isModuleSelected && (
                                              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                            )}
                                          </div>
                                          <div className="flex items-center gap-2">
                                            <Clock className="w-3 h-3 text-muted-foreground" />
                                            <span className="text-xs text-muted-foreground">
                                              {module.duration || "N/A"}
                                            </span>
                                            <Badge
                                              variant="outline"
                                              className="text-[10px] px-1.5 py-0 h-4 border-muted-foreground/30"
                                            >
                                              Video
                                            </Badge>
                                            {isModuleCompleted && (
                                              <Badge
                                                variant="outline"
                                                className="text-[10px] px-1.5 py-0 h-4 border-primary/50 text-primary"
                                              >
                                                ✓ Done
                                              </Badge>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                      <Play
                                        className={`w-4 h-4 flex-shrink-0 ml-2 transition-colors ${
                                          isModuleSelected
                                            ? "text-primary"
                                            : "text-muted-foreground group-hover:text-primary/70"
                                        }`}
                                      />
                                    </div>
                                  </div>
                                );
                              }
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
