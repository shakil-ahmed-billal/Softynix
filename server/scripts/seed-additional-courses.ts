/**
 * Script to seed course data for additional learning courses
 * Run with: npx tsx scripts/seed-additional-courses.ts
 */

import { prisma } from '../src/lib/prisma';

const coursesData = [
  {
    productSlug: "web-development-masterclass",
    title: "Web Development Masterclass - Full Stack",
    description: "Complete full-stack web development course covering HTML, CSS, JavaScript, React, Node.js, and databases. Build real-world projects and become a professional developer.",
    instructor: "Expert Development Team",
    duration: "120 hours",
    level: "beginner",
    modules: {
      course_id: 2,
      course_name: "Web Development Masterclass - Full Stack",
      description: "Complete full-stack web development course covering HTML, CSS, JavaScript, React, Node.js, and databases.",
      milestones: [
        {
          milestone_id: 1,
          milestone_name: "HTML & CSS Fundamentals",
          description: "Learn the building blocks of web development",
          modules: [
            {
              module_id: 1,
              module_name: "Introduction to HTML",
              duration: "2 hours",
              content: "Learn HTML structure, tags, and semantic elements",
              viewed: false,
              completed: false,
              video_link: "https://drive.google.com/file/d/example1/preview"
            },
            {
              module_id: 2,
              module_name: "CSS Styling Basics",
              duration: "3 hours",
              content: "Master CSS selectors, properties, and layouts",
              viewed: false,
              completed: false,
              video_link: "https://drive.google.com/file/d/example2/preview"
            }
          ]
        },
        {
          milestone_id: 2,
          milestone_name: "JavaScript Essentials",
          description: "Master JavaScript programming fundamentals",
          modules: [
            {
              module_id: 3,
              module_name: "JavaScript Basics",
              duration: "4 hours",
              content: "Variables, functions, and control structures",
              viewed: false,
              completed: false,
              video_link: "https://drive.google.com/file/d/example3/preview"
            },
            {
              module_id: 4,
              module_name: "DOM Manipulation",
              duration: "3 hours",
              content: "Interact with HTML elements using JavaScript",
              viewed: false,
              completed: false,
              video_link: "https://drive.google.com/file/d/example4/preview"
            }
          ]
        }
      ]
    }
  },
  {
    productSlug: "data-science-ml-bootcamp",
    title: "Data Science & Machine Learning Bootcamp",
    description: "Comprehensive data science course with Python, pandas, scikit-learn, TensorFlow, and real-world projects. From data analysis to machine learning models.",
    instructor: "Data Science Experts",
    duration: "150 hours",
    level: "intermediate",
    modules: {
      course_id: 3,
      course_name: "Data Science & Machine Learning Bootcamp",
      description: "Comprehensive data science course with Python, pandas, scikit-learn, TensorFlow, and real-world projects.",
      milestones: [
        {
          milestone_id: 1,
          milestone_name: "Python for Data Science",
          description: "Learn Python programming for data analysis",
          modules: [
            {
              module_id: 1,
              module_name: "Python Basics",
              duration: "5 hours",
              content: "Python syntax, data types, and control flow",
              viewed: false,
              completed: false,
              video_link: "https://drive.google.com/file/d/example5/preview"
            },
            {
              module_id: 2,
              module_name: "NumPy and Pandas",
              duration: "6 hours",
              content: "Data manipulation with NumPy and Pandas",
              viewed: false,
              completed: false,
              video_link: "https://drive.google.com/file/d/example6/preview"
            }
          ]
        },
        {
          milestone_id: 2,
          milestone_name: "Machine Learning Fundamentals",
          description: "Introduction to machine learning algorithms",
          modules: [
            {
              module_id: 3,
              module_name: "Introduction to ML",
              duration: "4 hours",
              content: "Supervised and unsupervised learning concepts",
              viewed: false,
              completed: false,
              video_link: "https://drive.google.com/file/d/example7/preview"
            },
            {
              module_id: 4,
              module_name: "Scikit-learn Basics",
              duration: "5 hours",
              content: "Building ML models with scikit-learn",
              viewed: false,
              completed: false,
              video_link: "https://drive.google.com/file/d/example8/preview"
            }
          ]
        }
      ]
    }
  }
];

async function seedCourses() {
  console.log('\n🌱 Seeding Course Data...\n');

  try {
    let created = 0;
    let updated = 0;
    let errors = 0;

    for (const courseData of coursesData) {
      try {
        // Find product by slug
        const product = await prisma.product.findUnique({
          where: { slug: courseData.productSlug },
        });

        if (!product) {
          console.error(`❌ Product not found: ${courseData.productSlug}`);
          errors++;
          continue;
        }

        // Check if course already exists
        const existingCourse = await prisma.course.findUnique({
          where: { productId: product.id },
        });

        const modulesJson = JSON.stringify(courseData.modules);
        const totalLessons = courseData.modules.milestones.reduce(
          (sum: number, milestone: any) => sum + milestone.modules.length,
          0
        );

        if (existingCourse) {
          // Update existing course
          await prisma.course.update({
            where: { productId: product.id },
            data: {
              title: courseData.title,
              description: courseData.description,
              instructor: courseData.instructor,
              duration: `${totalLessons} lessons`,
              level: courseData.level,
              modules: modulesJson,
              status: 'active',
            },
          });
          console.log(`🔄 Updated course: ${courseData.title}`);
          updated++;
        } else {
          // Create new course
          await prisma.course.create({
            data: {
              productId: product.id,
              title: courseData.title,
              description: courseData.description,
              instructor: courseData.instructor,
              duration: `${totalLessons} lessons`,
              level: courseData.level,
              modules: modulesJson,
              status: 'active',
            },
          });
          console.log(`✅ Created course: ${courseData.title}`);
          created++;
        }
      } catch (error: any) {
        console.error(`❌ Error processing ${courseData.title}:`, error.message);
        errors++;
      }
    }

    console.log(`\n📊 Summary:`);
    console.log(`   ✅ Created: ${created}`);
    console.log(`   🔄 Updated: ${updated}`);
    console.log(`   ❌ Errors: ${errors}`);
    console.log(`\n✨ Seeding completed!\n`);
  } catch (error: any) {
    console.error('❌ Fatal error:', error);
    throw error;
  }
}

seedCourses()
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

