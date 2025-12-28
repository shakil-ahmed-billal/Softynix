"use client";

import { CourseCard } from "@/components/dashboard/CourseCard";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { courses } from "@/lib/dashboard-data";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

export default function LearningPlatformPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const userCourses = courses.filter((c) => c.categoryId === 5);
  const filtered = userCourses.filter((c) =>
    c.courseTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (userCourses.length === 0) {
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
        {filtered.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}

