// ==========================================
// MOCK DATABASE INSTANCE
// ==========================================

export const mockDb = {
  user: {
    id: "usr_90210",
    name: "Alex Morgan",
    email: "alex.morgan@example.com",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    role: "Admin",
    company: "Apex Innovations",
  },

  dashboard: {
    metrics: [
      {
        id: "m1",
        title: "Total Revenue",
        value: "$45,231.89",
        change: "+20.1%",
        isPositive: true,
        timeframe: "from last month",
      },
      {
        id: "m2",
        title: "Active Subscriptions",
        value: "2,350",
        change: "+180.1%",
        isPositive: true,
        timeframe: "from last month",
      },
      {
        id: "m3",
        title: "API Calls (This Month)",
        value: "1.2M",
        change: "-4.5%",
        isPositive: false,
        timeframe: "from last month",
      },
      {
        id: "m4",
        title: "Active Sessions",
        value: "3",
        change: "Active now",
        isPositive: true,
        timeframe: "across 3 devices",
      },
    ],
    recentActivity: [
      {
        id: "act_1",
        action: "Upgraded plan to Pro",
        timestamp: "2 hours ago",
        user: "Alex Morgan",
      },
      {
        id: "act_2",
        action: "New login from Chrome on macOS",
        timestamp: "5 hours ago",
        user: "Alex Morgan",
      },
      {
        id: "act_3",
        action: "Generated new API Key",
        timestamp: "1 day ago",
        user: "Alex Morgan",
      },
      {
        id: "act_4",
        action: "Updated security settings",
        timestamp: "3 days ago",
        user: "Alex Morgan",
      },
    ],
    usageOverview: {
      apiCalls: [
        { month: "Jan", calls: 450000 },
        { month: "Feb", calls: 620000 },
        { month: "Mar", calls: 800000 },
        { month: "Apr", calls: 950000 },
        { month: "May", calls: 1200000 },
      ],
    },
  },

  plansAndPricing: {
    billingCycle: "monthly",
    plans: [
      {
        id: "plan_starter",
        name: "Starter",
        priceMonthly: 0,
        priceYearly: 0,
        description:
          "Ideal for small side projects and exploratory development.",
        features: [
          "Up to 10,000 API requests/mo",
          "1 Active Session",
          "Community Support",
          "Basic Analytics",
        ],
        isCurrent: false,
      },
      {
        id: "plan_pro",
        name: "Pro",
        priceMonthly: 29,
        priceYearly: 290,
        description:
          "Designed for growing applications and scaling infrastructure.",
        features: [
          "Up to 500,000 API requests/mo",
          "Up to 5 Concurrent Sessions",
          "Priority Email Support",
          "Advanced Analytics & Logs",
          "Custom Webhooks",
        ],
        isPopular: true,
        isCurrent: true,
      },
      {
        id: "plan_enterprise",
        name: "Enterprise",
        priceMonthly: 99,
        priceYearly: 990,
        description: "Dedicated resources and custom limits for large teams.",
        features: [
          "Unlimited API requests",
          "Unlimited Concurrent Sessions",
          "24/7 Dedicated Support",
          "Custom SLA & Security Compliance",
          "Dedicated Account Manager",
        ],
        isCurrent: false,
      },
    ],
  },

  usage: {
    currentPeriod: "May 1, 2026 - May 31, 2026",
    metrics: [
      {
        category: "API Calls",
        used: 342150,
        limit: 500000,
        unit: "requests",
        percentage: 68.4,
      },
      {
        category: "Database Storage",
        used: 4.2,
        limit: 10,
        unit: "GB",
        percentage: 42.0,
      },
      {
        category: "Bandwidth",
        used: 82.5,
        limit: 100,
        unit: "GB",
        percentage: 82.5,
      },
      {
        category: "Concurrent Sessions",
        used: 3,
        limit: 5,
        unit: "sessions",
        percentage: 60.0,
      },
    ],
  },

  sessions: [
    {
      id: "sess_1",
      device: 'MacBook Pro 16"',
      browser: "Chrome 124.0 (macOS)",
      ipAddress: "192.168.1.102",
      location: "San Francisco, CA, USA",
      lastActive: "Active now",
      isCurrentDevice: true,
    },
    {
      id: "sess_2",
      device: "iPhone 15 Pro",
      browser: "Safari Mobile 17.4 (iOS)",
      ipAddress: "172.56.21.89",
      location: "San Francisco, CA, USA",
      lastActive: "12 minutes ago",
      isCurrentDevice: false,
    },
    {
      id: "sess_3",
      device: "Work Workstation",
      browser: "Firefox 125.0 (Windows)",
      ipAddress: "203.0.113.195",
      location: "Austin, TX, USA",
      lastActive: "2 hours ago",
      isCurrentDevice: false,
    },
  ],

  settings: {
    profile: {
      fullName: "Alex Morgan",
      email: "alex.morgan@example.com",
      timezone: "UTC-7 (Pacific Time)",
      twoFactorEnabled: true,
    },
    notifications: {
      emailAlerts: true,
      productUpdates: false,
      securityAlerts: true,
      weeklySummary: true,
    },
    appearance: {
      theme: "dark",
      compactMode: false,
    },
  },
};


export const getDashboardData = async () => mockDb.dashboard;
export const getPlansAndPricing = async () => mockDb.plansAndPricing;
export const getUsageData = async () => mockDb.usage;
export const getActiveSessions = async () => mockDb.sessions;
export const getUserSettings = async () => mockDb.settings;
