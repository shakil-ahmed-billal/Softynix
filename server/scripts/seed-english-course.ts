/**
 * Script to seed English Speaking & Communication Mastery course
 * Run with: npx tsx scripts/seed-english-course.ts
 */

import { prisma } from '../src/lib/prisma';

const courseData = {
  course: {
    course_id: 1,
    course_name: "English Speaking & Communication Mastery",
    description: "A complete English learning program designed to improve speaking, listening, reading, writing, grammar, and vocabulary step by step.",
    milestones: [
      {
        milestone_id: 1,
        milestone_name: "Free Class + Demo",
        description: "Introductory demo classes and admission guidance.",
        modules: [
          {
            module_id: 1,
            module_name: "Free English Masterclass + Free PDF",
            duration: "1 hour",
            content: "Free masterclass on English with a downloadable PDF.",
            viewed: false,
            completed: false,
            video_link: "https://drive.google.com/file/d/10ZzlS3QnbK9jl7BcD30feP9GN-87aU_s/preview"
          },
          {
            module_id: 2,
            module_name: "How to Take Admission",
            duration: "30 minutes",
            content: "Guidelines on how to enroll in the course.",
            viewed: false,
            completed: false,
            video_link: "https://drive.google.com/file/d/1I7DFnKC0Fh10EVWjPViIdfAdZJKR8Jy7/preview"
          }
        ]
      },
      {
        milestone_id: 2,
        milestone_name: "Introduction & Essentials",
        description: "Course overview, structure, and essential information.",
        modules: [
          {
            module_id: 3,
            module_name: "Important Info",
            duration: "30 minutes",
            content: "Overview of the course structure and objectives.",
            viewed: false,
            completed: false,
            video_link: "https://drive.google.com/file/d/1C6DwHF0U9GN0YyTEDFr4rZgo_xhJCBC-/preview"
          },
          {
            module_id: 4,
            module_name: "Introduction to the Course",
            duration: "45 minutes",
            content: "Detailed introduction and learning roadmap.",
            viewed: false,
            completed: false,
            video_link: "https://drive.google.com/file/d/1JDmM6Coz5A6UmuKPzvD4dzZ0mhk3y4sK/preview"
          },
          {
            module_id: 5,
            module_name: "Course Syllabus",
            duration: "20 minutes",
            content: "Topics, structure, and learning schedule.",
            viewed: false,
            completed: false,
            video_link: "https://drive.google.com/file/d/1xi70_6w43V6KGnE-0kd7U5XPQANZ-v66/preview"
          }
        ]
      },
      {
        milestone_id: 3,
        milestone_name: "Foundation of English",
        description: "Core English structures, grammar, and practice.",
        modules: [
          {
            module_id: 6,
            module_name: "Basic English Structures Exposure",
            duration: "2 hours",
            content: "Overview of all basic English structures.",
            viewed: false,
            completed: false,
            video_link: "https://drive.google.com/file/d/1GJbeR5cbktQOb20cmO3DK6f5IoAkRjrF/preview"
          },
          {
            module_id: 7,
            module_name: "Basic English Structures Stories",
            duration: "1.5 hours",
            content: "Stories based on basic English structures.",
            viewed: false,
            completed: false,
            video_link: "https://drive.google.com/file/d/12CPSIXMr0Zeoi9O4vcMFAb7aecGWtY_E/preview"
          },
          {
            module_id: 8,
            module_name: "Basic English Questions (Part 1)",
            duration: "1 hour",
            content: "Introduction to basic English questions.",
            viewed: false,
            completed: false,
            video_link: "https://drive.google.com/file/d/18m7KMZUqfdoqisNiTvJG1e7nBf14KdN9/preview"
          },
          {
            module_id: 9,
            module_name: "Basic English Questions (Part 2)",
            duration: "1 hour",
            content: "Advanced practice of basic English questions.",
            viewed: false,
            completed: false,
            video_link: "https://drive.google.com/file/d/1JD6rAuMQNK6_pSe3WPLh4c4PuRB-5FJR/preview"
          },
          {
            module_id: 10,
            module_name: "Grammar Fundamentals",
            duration: "2 hours",
            content: "Core English grammar concepts.",
            viewed: false,
            completed: false,
            video_link: "https://drive.google.com/file/d/1BngaombPHUXa40mA72cS56iNw0HcAZ7A/preview"
          }
        ]
      },
      {
        milestone_id: 4,
        milestone_name: "Grammar You Must Know",
        description: "Essential grammar topics for fluent English.",
        modules: [
          {
            module_id: 11,
            module_name: "Should, Could, Would",
            duration: "1.5 hours",
            content: "Usage and examples of modal verbs.",
            viewed: false,
            completed: false,
            video_link: "https://drive.google.com/file/d/1qwc9WZBAn1tstYdwkt72jzKTj7u9JmdD/preview"
          },
          {
            module_id: 12,
            module_name: "Tenses Complete Lecture",
            duration: "3 hours",
            content: "Complete guide to English tenses.",
            viewed: false,
            completed: false,
            video_link: "https://drive.google.com/file/d/1BZowOW6D4lJn8zVjFjG5M-TTCcDG9VrP/preview"
          }
        ]
      },
      {
        milestone_id: 5,
        milestone_name: "Speaking, Reading & Writing Mastery",
        description: "Fluency, comprehension, and writing excellence.",
        modules: [
          {
            module_id: 13,
            module_name: "Spoken English Practice",
            duration: "3 hours",
            content: "Daily conversations and speaking exercises.",
            viewed: false,
            completed: false,
            video_link: "https://drive.google.com/file/d/1rJw5yAnGmC9KYtifMwyUu8j2bX27ycmp/preview"
          },
          {
            module_id: 14,
            module_name: "English Reading Sessions",
            duration: "2 hours",
            content: "Reading comprehension and analysis.",
            viewed: false,
            completed: false,
            video_link: "https://drive.google.com/file/d/11lX37bcZbiJJlHkzGOjBuntVSiBVJnY0/preview"
          },
          {
            module_id: 15,
            module_name: "Advanced English Writing",
            duration: "3 hours",
            content: "Advanced writing techniques and sentence structures.",
            viewed: false,
            completed: false,
            video_link: "https://drive.google.com/file/d/19UlLV6fFd9rw8MQrPbPZ42xZBnXSVyDf/preview"
          }
        ]
      },
      {
        milestone_id: 6,
        milestone_name: "Course Ending & Community",
        description: "Wrap-up, resources, and community access.",
        modules: [
          {
            module_id: 16,
            module_name: "Recommended Books & Apps",
            duration: "30 minutes",
            content: "Best resources for continued learning.",
            viewed: false,
            completed: false,
            video_link: "https://drive.google.com/file/d/1-F4Ku22ju5Jwztwo7iIe81zpi19q-ZLK/preview"
          },
          {
            module_id: 17,
            module_name: "Thank You & Goodbye",
            duration: "15 minutes",
            content: "Course conclusion and next steps.",
            viewed: false,
            completed: false,
            video_link: "https://drive.google.com/file/d/1mxNps6MLjPEpTNXxu8ppT_NYMT_2gBbo/preview"
          },
          {
            module_id: 18,
            module_name: "Discord Group Guidelines",
            duration: "20 minutes",
            content: "How to join and use the English learning Discord group.",
            viewed: false,
            completed: false,
            video_link: "https://drive.google.com/file/d/17sageie8atzlFCijh94a_sbEBfaruKHM/preview"
          }
        ]
      }
    ]
  }
};

async function seedEnglishCourse() {
  console.log('\n🌱 Seeding English Course...\n');

  try {
    // Find or create "Course" category
    let courseCategory = await prisma.category.findFirst({
      where: {
        OR: [
          { name: { contains: 'Course', mode: 'insensitive' } },
          { name: { contains: 'Learning', mode: 'insensitive' } },
          { slug: { contains: 'course', mode: 'insensitive' } },
        ],
      },
    });

    if (!courseCategory) {
      courseCategory = await prisma.category.create({
        data: {
          name: 'Learning Courses',
          slug: 'learning-courses',
          description: 'Educational courses and learning materials',
          status: 'active',
        },
      });
      console.log('✅ Created course category');
    } else {
      console.log('✅ Found existing course category');
    }

    // Find or create the English course product
    let product = await prisma.product.findFirst({
      where: {
        OR: [
          { name: { contains: 'English', mode: 'insensitive' } },
          { slug: { contains: 'english', mode: 'insensitive' } },
        ],
      },
    });

    if (!product) {
      product = await prisma.product.create({
        data: {
          name: 'English Speaking & Communication Mastery',
          slug: 'english-speaking-communication-mastery',
          description: courseData.course.description,
          price: 0, // Free or set a price
          categoryId: courseCategory.id,
          status: 'active',
          stock: 999,
          featured: true,
        },
      });
      console.log('✅ Created English course product');
    } else {
      console.log('✅ Found existing English course product');
    }

    // Create or update the course
    const modulesJson = JSON.stringify(courseData.course);
    const totalLessons = courseData.course.milestones.reduce(
      (sum, milestone) => sum + milestone.modules.length,
      0
    );

    const course = await prisma.course.upsert({
      where: { productId: product.id },
      update: {
        title: courseData.course.course_name,
        description: courseData.course.description,
        modules: modulesJson,
        duration: `${totalLessons} lessons`,
        level: 'beginner',
        language: 'en',
        status: 'active',
      },
      create: {
        productId: product.id,
        title: courseData.course.course_name,
        description: courseData.course.description,
        modules: modulesJson,
        duration: `${totalLessons} lessons`,
        level: 'beginner',
        language: 'en',
        status: 'active',
      },
    });

    console.log(`✅ Course created/updated: ${course.title}`);
    console.log(`   Total milestones: ${courseData.course.milestones.length}`);
    console.log(`   Total lessons: ${totalLessons}`);
    console.log('\n✨ Seeding completed!\n');
  } catch (error: any) {
    console.error('❌ Error seeding course:', error);
    throw error;
  }
}

seedEnglishCourse()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

