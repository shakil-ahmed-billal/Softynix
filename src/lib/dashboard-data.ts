export interface Subscription {
  id: string;
  appName: string;
  planType: string;
  accountEmail: string;
  password: string;
  startDate: string;
  expiryDate: string;
  status: "active" | "expired";
  autoRenew: boolean;
  categoryId: number;
}

export interface SoftwareLicense {
  id: string;
  softwareName: string;
  licenseKey: string;
  version: string;
  deviceLimit: number;
  activationStatus: "activated" | "pending";
  expiryDate?: string;
  downloadUrl?: string;
  categoryId: number;
}

export interface CreativeTool {
  id: string;
  toolName: string;
  licenseType: string;
  downloadUrl: string;
  fileSize: string;
  lastUpdate: string;
  usageGuideUrl?: string;
  categoryId: number;
}

export interface ProductivityApp {
  id: string;
  appName: string;
  loginInfo?: {
    email: string;
    password: string;
  };
  workspaceLink?: string;
  expiryDate?: string;
  accessLink?: string;
  isLifetime: boolean;
  categoryId: number;
}

export interface Course {
  id: string;
  courseTitle: string;
  thumbnail: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  certificateStatus: "available" | "not-available" | "in-progress";
  modules: CourseModule[];
  categoryId: number;
}

export interface CourseModule {
  id: string;
  title: string;
  lessons: Lesson[];
  completed: boolean;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  videoUrl?: string;
}

// Dummy Data
export const subscriptions: Subscription[] = [
  {
    id: "1",
    appName: "ChatGPT Plus",
    planType: "Monthly",
    accountEmail: "user@example.com",
    password: "••••••••",
    startDate: "2024-01-15",
    expiryDate: "2024-02-15",
    status: "active",
    autoRenew: true,
    categoryId: 1,
  },
  {
    id: "2",
    appName: "Perplexity AI Pro",
    planType: "Annual",
    accountEmail: "user@example.com",
    password: "••••••••",
    startDate: "2024-01-01",
    expiryDate: "2025-01-01",
    status: "active",
    autoRenew: false,
    categoryId: 1,
  },
  {
    id: "3",
    appName: "Midjourney Pro",
    planType: "Monthly",
    accountEmail: "user@example.com",
    password: "••••••••",
    startDate: "2023-12-01",
    expiryDate: "2024-01-01",
    status: "expired",
    autoRenew: false,
    categoryId: 1,
  },
];

export const softwareLicenses: SoftwareLicense[] = [
  {
    id: "1",
    softwareName: "Microsoft Office 2021 Pro",
    licenseKey: "XXXXX-XXXXX-XXXXX-XXXXX-XXXXX",
    version: "2021",
    deviceLimit: 1,
    activationStatus: "activated",
    downloadUrl: "#",
    categoryId: 2,
  },
  {
    id: "2",
    softwareName: "Adobe Creative Suite",
    licenseKey: "XXXXX-XXXXX-XXXXX-XXXXX-XXXXX",
    version: "2024",
    deviceLimit: 2,
    activationStatus: "activated",
    expiryDate: "2025-12-31",
    downloadUrl: "#",
    categoryId: 2,
  },
];

export const creativeTools: CreativeTool[] = [
  {
    id: "1",
    toolName: "Photoshop Preset Pack",
    licenseType: "Lifetime",
    downloadUrl: "#",
    fileSize: "250 MB",
    lastUpdate: "2024-01-10",
    usageGuideUrl: "#",
    categoryId: 3,
  },
  {
    id: "2",
    toolName: "Premium UI Kit",
    licenseType: "Commercial",
    downloadUrl: "#",
    fileSize: "500 MB",
    lastUpdate: "2024-01-05",
    categoryId: 3,
  },
];

export const productivityApps: ProductivityApp[] = [
  {
    id: "1",
    appName: "Notion Pro",
    loginInfo: {
      email: "user@example.com",
      password: "••••••••",
    },
    workspaceLink: "https://notion.so/workspace",
    expiryDate: "2024-12-31",
    isLifetime: false,
    categoryId: 4,
  },
  {
    id: "2",
    appName: "Figma Professional",
    accessLink: "https://figma.com/workspace",
    isLifetime: true,
    categoryId: 4,
  },
];

export const courses: Course[] = [
  {
    id: "1",
    courseTitle: "Complete Web Development Course",
    thumbnail: "/api/placeholder/300/200",
    progress: 65,
    totalLessons: 50,
    completedLessons: 32,
    certificateStatus: "in-progress",
    categoryId: 5,
    modules: [
      {
        id: "m1",
        title: "Introduction to HTML",
        completed: true,
        lessons: [
          {
            id: "l1",
            title: "HTML Basics",
            duration: "15:30",
            completed: true,
            videoUrl: "#",
          },
          {
            id: "l2",
            title: "HTML Forms",
            duration: "20:00",
            completed: true,
            videoUrl: "#",
          },
        ],
      },
      {
        id: "m2",
        title: "CSS Styling",
        completed: false,
        lessons: [
          {
            id: "l3",
            title: "CSS Fundamentals",
            duration: "25:00",
            completed: true,
            videoUrl: "#",
          },
          {
            id: "l4",
            title: "Flexbox & Grid",
            duration: "30:00",
            completed: false,
            videoUrl: "#",
          },
        ],
      },
    ],
  },
  {
    id: "2",
    courseTitle: "Advanced JavaScript",
    thumbnail: "/api/placeholder/300/200",
    progress: 100,
    totalLessons: 40,
    completedLessons: 40,
    certificateStatus: "available",
    categoryId: 5,
    modules: [],
  },
];

export const utilityTools: CreativeTool[] = [
  {
    id: "1",
    toolName: "System Optimizer Pro",
    licenseType: "Lifetime",
    downloadUrl: "#",
    fileSize: "150 MB",
    lastUpdate: "2024-01-15",
    categoryId: 6,
  },
  {
    id: "2",
    toolName: "Password Manager",
    licenseType: "Annual",
    downloadUrl: "#",
    fileSize: "50 MB",
    lastUpdate: "2024-01-12",
    categoryId: 6,
  },
];

// Dashboard Stats
export interface DashboardStats {
  totalActiveSubscriptions: number;
  totalPurchases: number;
  upcomingExpiry: number;
  monthlySpend: number;
  recentActivities: Activity[];
}

export interface Activity {
  id: string;
  type: "purchase" | "renewal" | "expiry" | "download";
  title: string;
  date: string;
  amount?: string;
}

export const dashboardStats: DashboardStats = {
  totalActiveSubscriptions: 2,
  totalPurchases: 8,
  upcomingExpiry: 1,
  monthlySpend: 2500,
  recentActivities: [
    {
      id: "1",
      type: "purchase",
      title: "ChatGPT Plus - Monthly",
      date: "2024-01-15",
      amount: "৳1,100",
    },
    {
      id: "2",
      type: "renewal",
      title: "Perplexity AI Pro - Auto Renewed",
      date: "2024-01-10",
      amount: "৳1,299",
    },
    {
      id: "3",
      type: "download",
      title: "Photoshop Preset Pack Downloaded",
      date: "2024-01-08",
    },
    {
      id: "4",
      type: "expiry",
      title: "Midjourney Pro - Expired",
      date: "2024-01-01",
    },
  ],
};

