import {
  Brain,
  Sprout,
  Settings,
  Zap,
  GraduationCap,
  Search,
  Zap as Lightning,
} from "lucide-react";

export const categories = [
  {
    id: 1,
    name: "AI Solutions",
    nameBn: "AI সাবস্ক্রিপশন",
    icon: Brain,
    count: 150,
  },
  {
    id: 2,
    name: "Business Solutions",
    nameBn: "সফটওয়্যার লাইসেন্স",
    icon: Sprout,
    count: 200,
  },
  {
    id: 3,
    name: "Utility Tools",
    nameBn: "ক্রিয়েটিভ টুলস",
    icon: Settings,
    count: 120,
  },
  {
    id: 4,
    name: "Software & Apps",
    nameBn: "প্রোডাক্টিভিটি অ্যাপ",
    icon: Lightning,
    count: 180,
  },
  {
    id: 5,
    name: "Learning Courses",
    nameBn: "লার্নিং প্ল্যাটফর্ম",
    icon: GraduationCap,
    count: 90,
  },
  {
    id: 6,
    name: "Research Tools",
    nameBn: "ইউটিলিটি টুলস",
    icon: Search,
    count: 75,
  },
];

export const bestSellingProducts = [
  {
    id: 1,
    title: "ChatGPT Plus (22 Voi)",
    price: "৳1,100",
    originalPrice: "৳1,375",
    rating: 4.9,
    discount: 20,
  },
  {
    id: 2,
    title: "Canva Pro (Solo 2Y)",
    price: "৳200",
    originalPrice: "৳250",
    rating: 4.8,
    discount: 20,
  },
  {
    id: 3,
    title: "LinkedIn Premium Career",
    price: "৳1,500 - ৳2,500",
    rating: 4.7,
  },
  {
    id: 4,
    title: "Microsoft Office 2021 Pro",
    price: "৳1,000",
    originalPrice: "৳1,200",
    rating: 4.9,
    discount: 17,
  },
];

export const trendingProducts = [
  {
    id: 5,
    title: "Perplexity AI Pro",
    price: "৳1,299",
    rating: 4.9,
    isNew: true,
  },
  {
    id: 6,
    title: "Google AI Pro",
    price: "৳399",
    rating: 4.8,
    isNew: true,
  },
  {
    id: 7,
    title: "CapCut Pro",
    price: "৳499",
    rating: 4.7,
    isNew: true,
  },
  {
    id: 8,
    title: "Dall-E Premium",
    price: "৳399",
    rating: 4.6,
    isNew: true,
  },
];

export const recentOrders = [
  {
    id: 1,
    customer: "সামাজিক সেবাম",
    time: "2:14:15 AM",
    status: "সম্পূর্ণ",
    amount: "৳500",
  },
  {
    id: 2,
    customer: "আরিফ হাসান",
    time: "1:45:30 AM",
    status: "সম্পূর্ণ",
    amount: "৳1,200",
  },
  {
    id: 3,
    customer: "ফাতেমা খাতুন",
    time: "12:30:20 AM",
    status: "সম্পূর্ণ",
    amount: "৳800",
  },
  {
    id: 4,
    customer: "করিম উদ্দিন",
    time: "11:15:10 PM",
    status: "সম্পূর্ণ",
    amount: "৳1,500",
  },
];

export const reviews = [
  {
    id: 1,
    name: "আরিফ হাসান",
    profession: "Web Developer",
    rating: 5,
    comment:
      "খুব দ্রুত ডেলিভারি পেয়েছি। প্রোডাক্টও অরিজিনাল। সাপোর্ট টিম খুবই সহায়ক।",
  },
  {
    id: 2,
    name: "সালমা আক্তার",
    profession: "Graphic Designer",
    rating: 5,
    comment: "সাপোর্ট টিম খুবই সহায়ক। সুপারিশ করবো। প্রোডাক্ট মানসম্মত।",
  },
  {
    id: 3,
    name: "ইমরান হোসেন",
    profession: "Content Creator",
    rating: 5,
    comment: "মূল্য যুক্তিসঙ্গত এবং সার্ভিস ভালো। দ্রুত ডেলিভারি পেয়েছি।",
  },
];
