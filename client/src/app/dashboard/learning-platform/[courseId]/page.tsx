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
  Award,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock,
  Loader2,
  Play,
  Search,
  Target,
  TrendingUp,
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
    new Set(),
  );

  // Fetch course data
  const { data: courseAccess, isLoading } = useQuery({
    queryKey: ["course-access", courseId],
    queryFn: async () => {
      const response = await axiosAuth.get(
        `/api/user-product-access/${courseId}`,
      );
      return response.data.data;
    },
  });

  // Fetch lesson completions
  const { data: completions = [] } = useQuery({
    queryKey: ["lesson-completions", courseId],
    queryFn: async () => {
      const response = await axiosAuth.get(
        `/api/user-product-access/${courseId}/lesson-completions`,
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
        },
      );
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
              0,
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
        },
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
        },
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
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
          <p className="text-sm text-muted-foreground animate-pulse">
            Loading your course...
          </p>
        </div>
      </div>
    );
  }

  if (!courseData || !courseAccess || !courseData.course?.milestones) {
    return (
      <div className="p-4 sm:p-6 text-foreground bg-background min-h-screen">
        <Card className="border-destructive/50 bg-destructive/5">
          <CardContent className="p-6 space-y-3">
            <p className="text-base sm:text-lg font-semibold text-destructive">
              Course not found
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground">
              {!courseAccess
                ? "Course access not found"
                : "Course data is missing or invalid"}
            </p>
            <Button
              onClick={() => router.back()}
              variant="outline"
              size="sm"
              className="mt-4"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Calculate total lessons and completed lessons
  const totalLessons = courseData.course.milestones.reduce(
    (sum, milestone) => sum + (milestone.modules?.length || 0),
    0,
  );

  const completedLessons = Array.from(lessonCompletions.values()).filter(
    (c) => c.completed,
  ).length;
  const progress =
    totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  // Check if milestone is completed
  const isMilestoneCompleted = (milestoneId: number) => {
    if (!courseData?.course?.milestones) return false;
    const milestone = courseData.course.milestones.find(
      (m) => m.milestone_id === milestoneId,
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
      (m) => m.milestone_id === milestoneId,
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
        module.module_name?.toLowerCase().includes(searchQuery.toLowerCase()),
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
    <div className="min-h-screen">
      {/* Mobile-Optimized Header */}
      <div className="sticky top-16  md:top-0 z-50 shadow-lg">
        <div className="">
          <div className="flex items-center gap-2 sm:gap-3 mb-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="h-8 w-8 sm:h-9 sm:w-9 p-0 text-primary-foreground hover:bg-primary-foreground/20"
            >
              <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            <div className="flex-1 min-w-0">
              <h1 className="text-base sm:text-xl md:text-2xl font-bold text-primary-foreground truncate">
                {courseData.course.course_name}
              </h1>
            </div>
            <Badge className="hidden sm:flex bg-accent text-accent-foreground px-2 py-1 text-xs">
              <Award className="w-3 h-3 mr-1" />
              {progress}%
            </Badge>
          </div>

          {/* Mobile Progress Bar */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex-1">
              <Progress value={progress} className="h-1.5 sm:h-2" />
            </div>
            <span className="text-[10px] sm:text-xs text-primary-foreground/90 font-medium whitespace-nowrap">
              {completedLessons}/{totalLessons}
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Video Player - Full Width on Mobile */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            <Card className="border border-primary/20 shadow-xl overflow-hidden card-shine">
              <CardContent className="p-0">
                {selectedModuleData && selectedModuleData.video_link ? (
                  <div className="relative">
                    <div className="relative aspect-video bg-gradient-to-br from-primary/20 via-accent/10 to-background">
                      <iframe
                        src={selectedModuleData.video_link}
                        className="w-full h-full"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                        id="course-video-player"
                      />
                    </div>

                    {/* Video Info Overlay - Mobile Optimized */}
                    <div className="p-3 sm:p-4 bg-gradient-to-t from-background via-background/95 to-transparent">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm sm:text-base font-semibold text-foreground mb-1 truncate">
                            {selectedModuleData.module_name ||
                              "Untitled Lesson"}
                          </h3>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            <span>{selectedModuleData.duration || "N/A"}</span>
                            {selectedModule &&
                              lessonCompletions.get(
                                `${selectedModule.milestoneId}-${selectedModule.moduleId}`,
                              )?.completed && (
                                <>
                                  <span>•</span>
                                  <CheckCircle2 className="w-3 h-3 text-primary" />
                                  <span className="text-primary">
                                    Completed
                                  </span>
                                </>
                              )}
                          </div>
                        </div>
                        <Button
                          onClick={() => {
                            if (selectedModule) {
                              handleModuleComplete(
                                selectedModule.milestoneId,
                                selectedModule.moduleId,
                              );
                            }
                          }}
                          size="sm"
                          className="w-full sm:w-auto bg-gradient-primary hover:opacity-90 text-primary-foreground shadow-lg glow-primary"
                          disabled={
                            selectedModule
                              ? lessonCompletions.get(
                                  `${selectedModule.milestoneId}-${selectedModule.moduleId}`,
                                )?.completed
                              : false
                          }
                        >
                          <CheckCircle2 className="w-4 h-4 mr-2" />
                          {selectedModule &&
                          lessonCompletions.get(
                            `${selectedModule.milestoneId}-${selectedModule.moduleId}`,
                          )?.completed
                            ? "Completed"
                            : "Mark Complete"}
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="aspect-video flex flex-col items-center justify-center bg-gradient-to-br from-primary/10 via-accent/5 to-background p-6">
                    <div className="relative mb-6">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-primary flex items-center justify-center shadow-lg glow-primary animate-pulse-glow">
                        <Play className="w-8 h-8 sm:w-10 sm:h-10 text-primary-foreground ml-1" />
                      </div>
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-accent rounded-full animate-ping opacity-75" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 text-center">
                      Ready to Start Learning?
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground text-center max-w-md px-4">
                      Select a lesson from the course content below to begin
                      your journey
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
            {/* Premium Stats Cards - Mobile & Desktop Optimized */}
            <div className="hidden md:block">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
                {/* Total Lessons Card */}
                <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all duration-500" />
                  <CardContent className="relative p-4 sm:p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-primary flex items-center justify-center shadow-md glow-primary group-hover:scale-110 transition-transform duration-300">
                        <BookOpen className="w-3 h-3 sm:w-6 sm:h-6 text-primary-foreground" />
                      </div>
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    </div>
                    <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gradient-primary mb-1 group-hover:scale-105 transition-transform duration-300">
                      {totalLessons}
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground font-medium">
                      Total Lessons
                    </p>
                  </CardContent>
                </Card>

                {/* Completed Card */}
                <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all duration-500" />
                  <CardContent className="relative p-4 sm:p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-primary flex items-center justify-center shadow-md glow-primary group-hover:scale-110 transition-transform duration-300">
                        <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
                      </div>
                      {completedLessons > 0 && (
                        <Badge className="bg-primary/20 text-primary border-0 text-[10px] px-2 py-0.5 h-5">
                          Active
                        </Badge>
                      )}
                    </div>
                    <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gradient-primary mb-1 group-hover:scale-105 transition-transform duration-300">
                      {completedLessons}
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground font-medium">
                      Completed
                    </p>
                  </CardContent>
                </Card>

                {/* Progress Card */}
                <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-accent/10 via-accent/5 to-transparent shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-accent/5 rounded-full blur-2xl group-hover:bg-accent/10 transition-all duration-500" />
                  <CardContent className="relative p-4 sm:p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-accent flex items-center justify-center shadow-md glow-accent group-hover:scale-110 transition-transform duration-300">
                        <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-accent-foreground" />
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                        <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse delay-75" />
                        <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse delay-150" />
                      </div>
                    </div>
                    <p className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-accent bg-clip-text text-transparent mb-1 group-hover:scale-105 transition-transform duration-300">
                      {progress}%
                    </p>
                    <div className="space-y-1.5">
                      <p className="text-xs sm:text-sm text-muted-foreground font-medium">
                        Progress
                      </p>
                      <Progress
                        value={progress}
                        className="h-1.5 bg-accent/10"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Remaining Card */}
                <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all duration-500" />
                  <CardContent className="relative p-4 sm:p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-primary flex items-center justify-center shadow-md glow-primary group-hover:scale-110 transition-transform duration-300">
                        <Target className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
                      </div>
                      {totalLessons - completedLessons > 0 && (
                        <Badge className="bg-primary/20 text-primary border-0 text-[10px] px-2 py-0.5 h-5">
                          To-do
                        </Badge>
                      )}
                    </div>
                    <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gradient-primary mb-1 group-hover:scale-105 transition-transform duration-300">
                      {totalLessons - completedLessons}
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground font-medium">
                      Remaining
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Course Content Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            {/* Search Bar - Mobile Optimized */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search lessons..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-10 sm:h-11 text-sm bg-card/50 border-primary/20 focus:border-primary"
              />
            </div>

            {/* Lessons List - Mobile Optimized */}
            <Card className="border border-primary/20 shadow-xl overflow-hidden">
              <div className="bg-gradient-primary p-3 sm:p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" />
                    <h2 className="text-sm sm:text-base font-semibold text-primary-foreground">
                      Course Content
                    </h2>
                  </div>
                  <Badge className="bg-primary-foreground/20 text-primary-foreground border-0 text-xs px-2 py-0.5">
                    {courseData.course.milestones.length} Modules
                  </Badge>
                </div>
              </div>

              <CardContent className="p-0">
                <div className="max-h-[500px] sm:max-h-[600px] overflow-y-auto custom-scrollbar">
                  {filteredMilestones.map((milestone, index) => {
                    const isCompleted = isMilestoneCompleted(
                      milestone.milestone_id,
                    );
                    const milestoneProgress = getMilestoneProgress(
                      milestone.milestone_id,
                    );
                    const isExpanded = expandedMilestones.has(
                      milestone.milestone_id,
                    );
                    const isActive =
                      selectedModule?.milestoneId === milestone.milestone_id;

                    return (
                      <div
                        key={milestone.milestone_id}
                        className={`border-b last:border-b-0 transition-all duration-300 ${
                          isActive ? "bg-primary/5" : ""
                        }`}
                      >
                        {/* Milestone Header - Mobile Optimized */}
                        <div
                          className={`p-3 sm:p-4 cursor-pointer transition-all duration-200 ${
                            isActive
                              ? "bg-gradient-to-r from-primary/20 to-transparent"
                              : "hover:bg-muted/30"
                          }`}
                          onClick={() =>
                            toggleMilestone(milestone.milestone_id)
                          }
                        >
                          <div className="flex items-start gap-2 sm:gap-3">
                            {/* Milestone Icon */}
                            <div className="flex-shrink-0 mt-0.5">
                              {isCompleted ? (
                                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-primary flex items-center justify-center shadow-md">
                                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" />
                                </div>
                              ) : (
                                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-primary/40 bg-primary/5 flex items-center justify-center">
                                  <span className="text-xs sm:text-sm font-bold text-primary">
                                    {index + 1}
                                  </span>
                                </div>
                              )}
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2 mb-1.5">
                                <h3
                                  className={`text-sm sm:text-base font-semibold leading-tight ${
                                    isActive
                                      ? "text-primary"
                                      : "text-foreground"
                                  }`}
                                >
                                  {milestone.milestone_name}
                                </h3>
                                {isExpanded ? (
                                  <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                                ) : (
                                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                                )}
                              </div>

                              <div className="flex flex-wrap items-center gap-2 mb-2">
                                <span className="text-[10px] sm:text-xs text-muted-foreground">
                                  {milestoneProgress.completed}/
                                  {milestoneProgress.total} completed
                                </span>
                                {isCompleted && (
                                  <Badge
                                    variant="outline"
                                    className="border-primary text-primary text-[10px] px-1.5 py-0 h-4"
                                  >
                                    ✓ Done
                                  </Badge>
                                )}
                              </div>

                              <Progress
                                value={
                                  (milestoneProgress.completed /
                                    milestoneProgress.total) *
                                  100
                                }
                                className="h-1"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Module List - Mobile Optimized */}
                        {isExpanded && (
                          <div className="bg-muted/20 border-t border-border/50">
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
                                    className={`group relative transition-all duration-200 ${
                                      isModuleSelected
                                        ? "bg-primary/10 border-l-4 border-primary"
                                        : isModuleCompleted
                                          ? "bg-primary/5 border-l-2 border-primary/30 hover:bg-primary/10"
                                          : "border-l-2 border-transparent hover:bg-muted/40 hover:border-primary/20"
                                    }`}
                                    onClick={() =>
                                      handleModuleClick(
                                        milestone.milestone_id,
                                        module.module_id,
                                      )
                                    }
                                  >
                                    <div className="p-3 sm:p-4 cursor-pointer">
                                      <div className="flex items-start gap-2 sm:gap-3">
                                        {/* Module Checkbox */}
                                        <div
                                          className="flex-shrink-0 mt-0.5 cursor-pointer"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleModuleComplete(
                                              milestone.milestone_id,
                                              module.module_id,
                                            );
                                          }}
                                        >
                                          {isModuleCompleted ? (
                                            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-primary flex items-center justify-center shadow-sm">
                                              <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-primary-foreground" />
                                            </div>
                                          ) : (
                                            <div
                                              className={`w-5 h-5 sm:w-6 sm:h-6 rounded border-2 flex items-center justify-center transition-all ${
                                                isModuleSelected
                                                  ? "border-primary bg-primary/10"
                                                  : "border-muted-foreground/40 group-hover:border-primary/60"
                                              }`}
                                            >
                                              <span className="text-[9px] sm:text-[10px] font-semibold text-muted-foreground">
                                                {modIndex + 1}
                                              </span>
                                            </div>
                                          )}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                          <div className="flex items-center justify-between gap-2 mb-1">
                                            <p
                                              className={`text-xs sm:text-sm font-medium truncate ${
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
                                            <Play
                                              className={`w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 transition-colors ${
                                                isModuleSelected
                                                  ? "text-primary"
                                                  : "text-muted-foreground group-hover:text-primary/70"
                                              }`}
                                            />
                                          </div>

                                          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                                            <div className="flex items-center gap-1">
                                              <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-muted-foreground" />
                                              <span className="text-[10px] sm:text-xs text-muted-foreground">
                                                {module.duration || "N/A"}
                                              </span>
                                            </div>
                                            <Badge
                                              variant="outline"
                                              className="text-[9px] sm:text-[10px] px-1 sm:px-1.5 py-0 h-3.5 sm:h-4 border-muted-foreground/30"
                                            >
                                              Video
                                            </Badge>
                                            {isModuleCompleted && (
                                              <Badge
                                                variant="outline"
                                                className="text-[9px] sm:text-[10px] px-1 sm:px-1.5 py-0 h-3.5 sm:h-4 border-primary/50 text-primary"
                                              >
                                                ✓ Done
                                              </Badge>
                                            )}
                                            {isModuleSelected && (
                                              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary animate-pulse" />
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                );
                              },
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {filteredMilestones.length === 0 && (
                    <div className="p-8 text-center">
                      <Search className="w-12 h-12 mx-auto mb-3 text-muted-foreground opacity-50" />
                      <p className="text-sm text-muted-foreground">
                        No lessons found
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Try a different search term
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Padding for Safe Area */}
      <div className="h-6 sm:h-8" />
    </div>
  );
}
