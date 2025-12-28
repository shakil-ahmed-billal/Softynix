import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Course } from "@/lib/dashboard-data";
import { Progress } from "@/components/ui/progress";
import { Play, Award, BookOpen } from "lucide-react";
import Link from "next/link";

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const progressPercentage = Math.round(
    (course.completedLessons / course.totalLessons) * 100
  );

  return (
    <Card>
      <div className="relative">
        <div className="aspect-video bg-muted flex items-center justify-center">
          <BookOpen className="h-12 w-12 text-muted-foreground/50" />
        </div>
        {course.certificateStatus === "available" && (
          <Badge className="absolute top-2 right-2 bg-green-600">
            <Award className="h-3 w-3 mr-1" />
            Certificate Ready
          </Badge>
        )}
      </div>
      <CardContent className="p-6 space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">{course.courseTitle}</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{progressPercentage}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {course.completedLessons} of {course.totalLessons} lessons completed
            </p>
          </div>
        </div>
        <Button className="w-full" asChild>
          <Link href={`/dashboard/learning-platform/${course.id}`}>
            <Play className="h-4 w-4 mr-2" />
            {progressPercentage === 100 ? "Review Course" : "Continue Learning"}
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

