-- CreateTable
CREATE TABLE "course_lesson_completions" (
    "id" TEXT NOT NULL,
    "userProductAccessId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "milestoneId" INTEGER NOT NULL,
    "moduleId" INTEGER NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "viewed" BOOLEAN NOT NULL DEFAULT false,
    "completedAt" TIMESTAMP(3),
    "viewedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "course_lesson_completions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "course_lesson_completions_userProductAccessId_idx" ON "course_lesson_completions"("userProductAccessId");

-- CreateIndex
CREATE INDEX "course_lesson_completions_courseId_idx" ON "course_lesson_completions"("courseId");

-- CreateIndex
CREATE UNIQUE INDEX "course_lesson_completions_userProductAccessId_courseId_mile_key" ON "course_lesson_completions"("userProductAccessId", "courseId", "milestoneId", "moduleId");

-- AddForeignKey
ALTER TABLE "course_lesson_completions" ADD CONSTRAINT "course_lesson_completions_userProductAccessId_fkey" FOREIGN KEY ("userProductAccessId") REFERENCES "user_product_access"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_lesson_completions" ADD CONSTRAINT "course_lesson_completions_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;
