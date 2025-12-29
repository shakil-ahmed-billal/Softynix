/**
 * Script to seed premium products across all categories
 * Run with: npx tsx scripts/seed-premium-products.ts
 */

import { prisma } from '../src/lib/prisma';

const products = [
  // AI Solutions (4 products)
  {
    name: "ChatGPT Plus - Premium Subscription",
    slug: "chatgpt-plus-premium",
    description: "Access to GPT-4, faster responses, and priority access to new features. Perfect for professionals and power users.",
    price: 20.00,
    categorySlug: "ai-solutions",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800",
    stock: 50,
    featured: true,
    productType: "ai_subscription",
  },
  {
    name: "Claude AI Pro - Advanced Plan",
    slug: "claude-ai-pro",
    description: "Advanced AI assistant with extended context window, superior reasoning, and API access.",
    price: 25.00,
    categorySlug: "ai-solutions",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800",
    stock: 30,
    featured: true,
    productType: "ai_subscription",
  },
  {
    name: "Midjourney Pro - Creative AI",
    slug: "midjourney-pro",
    description: "Professional AI image generation with unlimited fast generations and commercial license.",
    price: 30.00,
    categorySlug: "ai-solutions",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800",
    stock: 40,
    featured: false,
    productType: "ai_subscription",
  },
  {
    name: "Perplexity AI Pro - Research Assistant",
    slug: "perplexity-ai-pro",
    description: "Advanced AI research tool with unlimited searches, file uploads, and API access for deep research.",
    price: 15.00,
    categorySlug: "ai-solutions",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800",
    stock: 60,
    featured: false,
    productType: "ai_subscription",
  },

  // Software Licenses (4 products)
  {
    name: "Adobe Creative Cloud - All Apps",
    slug: "adobe-creative-cloud-all-apps",
    description: "Complete Adobe Creative Suite license including Photoshop, Illustrator, Premiere Pro, and 20+ apps.",
    price: 52.99,
    categorySlug: "software-licenses",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800",
    stock: 25,
    featured: true,
    productType: "software_license",
  },
  {
    name: "Microsoft Office 365 - Business Premium",
    slug: "microsoft-office-365-business",
    description: "Full Microsoft Office suite with cloud storage, Teams, and advanced security features.",
    price: 22.00,
    categorySlug: "software-licenses",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800",
    stock: 45,
    featured: true,
    productType: "software_license",
  },
  {
    name: "Figma Professional - Team License",
    slug: "figma-professional-team",
    description: "Professional design tool with unlimited projects, team collaboration, and advanced prototyping.",
    price: 12.00,
    categorySlug: "software-licenses",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800",
    stock: 35,
    featured: false,
    productType: "software_license",
  },
  {
    name: "AutoCAD Professional - Lifetime License",
    slug: "autocad-professional-lifetime",
    description: "Professional CAD software for architects and engineers. Lifetime license with all updates included.",
    price: 199.99,
    categorySlug: "software-licenses",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800",
    stock: 15,
    featured: false,
    productType: "software_license",
  },

  // Productivity Apps (4 products)
  {
    name: "Notion Pro - Workspace",
    slug: "notion-pro-workspace",
    description: "All-in-one workspace for notes, docs, databases, and project management. Unlimited blocks and guests.",
    price: 8.00,
    categorySlug: "productivity-apps",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800",
    stock: 100,
    featured: true,
    productType: "productivity_app",
  },
  {
    name: "Monday.com - Pro Plan",
    slug: "monday-com-pro",
    description: "Work management platform with automation, integrations, and advanced reporting for teams.",
    price: 10.00,
    categorySlug: "productivity-apps",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800",
    stock: 80,
    featured: false,
    productType: "productivity_app",
  },
  {
    name: "Asana Premium - Team Workspace",
    slug: "asana-premium-team",
    description: "Project management tool with timeline view, custom fields, and advanced search for teams.",
    price: 13.99,
    categorySlug: "productivity-apps",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800",
    stock: 70,
    featured: false,
    productType: "productivity_app",
  },
  {
    name: "Trello Business Class",
    slug: "trello-business-class",
    description: "Visual collaboration tool with unlimited boards, advanced automation, and priority support.",
    price: 9.99,
    categorySlug: "productivity-apps",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800",
    stock: 90,
    featured: false,
    productType: "productivity_app",
  },

  // Utility Tools (3 products)
  {
    name: "Grammarly Premium - Writing Assistant",
    slug: "grammarly-premium",
    description: "Advanced writing assistant with tone detection, clarity suggestions, and plagiarism checker.",
    price: 12.00,
    categorySlug: "utility-tools",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800",
    stock: 200,
    featured: true,
    productType: "software_license",
  },
  {
    name: "Canva Pro - Design Tool",
    slug: "canva-pro-design",
    description: "Professional design tool with millions of templates, stock photos, and brand kit features.",
    price: 12.99,
    categorySlug: "utility-tools",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800",
    stock: 150,
    featured: false,
    productType: "software_license",
  },
  {
    name: "LastPass Premium - Password Manager",
    slug: "lastpass-premium",
    description: "Secure password manager with unlimited devices, dark web monitoring, and priority support.",
    price: 3.00,
    categorySlug: "utility-tools",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800",
    stock: 300,
    featured: false,
    productType: "software_license",
  },

  // Software & Apps (3 products)
  {
    name: "Slack Pro - Team Communication",
    slug: "slack-pro-team",
    description: "Business communication platform with unlimited message history, screen sharing, and integrations.",
    price: 7.25,
    categorySlug: "software-apps",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800",
    stock: 120,
    featured: true,
    productType: "productivity_app",
  },
  {
    name: "Zoom Business - Video Conferencing",
    slug: "zoom-business",
    description: "Professional video conferencing with cloud recording, admin controls, and reporting.",
    price: 14.99,
    categorySlug: "software-apps",
    image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800",
    stock: 65,
    featured: false,
    productType: "productivity_app",
  },
  {
    name: "Dropbox Business - Cloud Storage",
    slug: "dropbox-business",
    description: "Secure cloud storage with advanced sharing controls, file recovery, and team collaboration.",
    price: 15.00,
    categorySlug: "software-apps",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800",
    stock: 55,
    featured: false,
    productType: "productivity_app",
  },

  // Learning Courses (2 products - one is the English course we already have)
  {
    name: "Web Development Masterclass - Full Stack",
    slug: "web-development-masterclass",
    description: "Complete full-stack web development course covering HTML, CSS, JavaScript, React, Node.js, and databases.",
    price: 99.99,
    categorySlug: "learning-courses",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
    stock: 999,
    featured: true,
    productType: "course",
  },
  {
    name: "Data Science & Machine Learning Bootcamp",
    slug: "data-science-ml-bootcamp",
    description: "Comprehensive data science course with Python, pandas, scikit-learn, TensorFlow, and real-world projects.",
    price: 149.99,
    categorySlug: "learning-courses",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
    stock: 999,
    featured: true,
    productType: "course",
  },
];

async function seedProducts() {
  console.log('\n🌱 Seeding Premium Products...\n');

  try {
    // Get all categories
    const categories = await prisma.category.findMany();
    const categoryMap = new Map(categories.map(cat => [cat.slug, cat]));

    let created = 0;
    let updated = 0;
    let errors = 0;

    for (const productData of products) {
      try {
        const category = categoryMap.get(productData.categorySlug);
        
        if (!category) {
          console.error(`❌ Category not found: ${productData.categorySlug}`);
          errors++;
          continue;
        }

        // Check if product already exists
        const existing = await prisma.product.findUnique({
          where: { slug: productData.slug },
        });

        if (existing) {
          // Update existing product
          await prisma.product.update({
            where: { slug: productData.slug },
            data: {
              name: productData.name,
              description: productData.description,
              price: productData.price,
              categoryId: category.id,
              image: productData.image,
              stock: productData.stock,
              featured: productData.featured,
              status: 'active',
            },
          });
          console.log(`🔄 Updated: ${productData.name}`);
          updated++;
        } else {
          // Create new product
          await prisma.product.create({
            data: {
              name: productData.name,
              slug: productData.slug,
              description: productData.description,
              price: productData.price,
              categoryId: category.id,
              image: productData.image,
              stock: productData.stock,
              featured: productData.featured,
              status: 'active',
            },
          });
          console.log(`✅ Created: ${productData.name}`);
          created++;
        }
      } catch (error: any) {
        console.error(`❌ Error processing ${productData.name}:`, error.message);
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

seedProducts()
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

