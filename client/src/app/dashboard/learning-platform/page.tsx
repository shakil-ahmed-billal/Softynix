"use client";

import { CourseCard } from "@/components/dashboard/CourseCard";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { Input } from "@/components/ui/input";
import { Search, Loader2 } from "lucide-react";
import { useState } from "react";
import { useCourses } from "@/hooks/useUserProductAccess";
import { useAuth } from "@/contexts/auth-context";

export default function LearningPlatformPage() {
  const { isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const { data: courses = [], isLoading } = useCourses();

  if (!isAuthenticated) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">লার্নিং প্ল্যাটফর্ম</h1>
          <p className="text-muted-foreground">
            Please log in to view your courses
          </p>
        </div>
      </div>
    );
  }

  const filtered = courses.filter((c) =>
    c.product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">লার্নিং প্ল্যাটফর্ম</h1>
          <p className="text-muted-foreground">
            Continue your learning journey and track your progress
          </p>
        </div>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">লার্নিং প্ল্যাটফর্ম</h1>
          <p className="text-muted-foreground">
            Continue your learning journey and track your progress
          </p>
        </div>
        <EmptyState
          title="No Courses Yet"
          description="You haven't enrolled in any courses yet. Browse our course catalog and start learning."
          ctaText="Browse Courses"
          ctaHref="/shop"
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">লার্নিং প্ল্যাটফর্ম</h1>
        <p className="text-muted-foreground">
          Continue your learning journey and track your progress
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search courses..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((course) => {
          const courseData = course.product.course;
          const progress = course.courseProgress || 0;
          
          // Parse course modules to get total lessons
          let totalLessons = 0;
          if (courseData?.modules) {
            try {
              const modules = JSON.parse(courseData.modules);
              totalLessons = modules.milestones?.reduce(
                (sum: number, milestone: any) => sum + (milestone.modules?.length || 0),
                0
              ) || 0;
            } catch (e) {
              totalLessons = 0;
            }
          }
          
          const completedLessons = Math.round((progress / 100) * totalLessons);
          
          return (
            <div key={course.id} onClick={() => window.location.href = `/dashboard/learning-platform/${course.id}`} className="cursor-pointer">
              <CourseCard
                course={{
                  id: course.id,
                  courseTitle: course.product.name,
                  completedLessons,
                  totalLessons,
                  certificateStatus: progress === 100 ? "available" : "not_available",
                  categoryId: 5,
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

