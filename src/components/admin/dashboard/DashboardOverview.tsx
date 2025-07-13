import { FileText, Eye } from "lucide-react";
import { StatsCard } from "@/components/admin/dashboard/StatsCard";
import { PerformanceMetrics } from "@/components/admin/dashboard/PerformanceMetrics";

interface DashboardStats {
  totalPosts: number;
  publishedPosts: number;
  draftPosts: number;
  featuredPosts: number;
  totalCategories: number;
  recentPosts: number;
  monthlyPosts: number;
  growthRate: number;
}

interface DashboardOverviewProps {
  dashboardStats: DashboardStats;
}

export function DashboardOverview({ dashboardStats }: DashboardOverviewProps) {
  const performanceMetrics = [
    { 
      label: "Growth Rate", 
      value: `+${dashboardStats.growthRate.toFixed(1)}%`, 
      change: "+12.5%", 
      trend: "up" as const,
      description: "Weekly post growth"
    },
    { 
      label: "Engagement", 
      value: "8.4%", 
      change: "+2.1%", 
      trend: "up" as const,
      description: "Average engagement rate"
    },
    { 
      label: "Categories", 
      value: dashboardStats.totalCategories.toString(), 
      change: "+3", 
      trend: "up" as const,
      description: "Active categories"
    },
    { 
      label: "This Month", 
      value: dashboardStats.monthlyPosts.toString(), 
      change: `+${dashboardStats.recentPosts}`, 
      trend: "up" as const,
      description: "Posts this month"
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Posts"
          value={dashboardStats.totalPosts}
          icon={FileText}
          change={`+${dashboardStats.recentPosts}`}
          description="this week"
          progress={(dashboardStats.totalPosts / 100) * 100}
          borderColor="border-l-4 border-l-blue-500"
          iconColor="text-blue-500"
          valueColor="text-blue-600"
        />
        
        <StatsCard
          title="Published"
          value={dashboardStats.publishedPosts}
          icon={Eye}
          progress={dashboardStats.totalPosts > 0 ? (dashboardStats.publishedPosts / dashboardStats.totalPosts) * 100 : 0}
          description={`${dashboardStats.totalPosts > 0 ? Math.round((dashboardStats.publishedPosts / dashboardStats.totalPosts) * 100) : 0}% of total posts`}
          borderColor="border-l-4 border-l-green-500"
          iconColor="text-green-500"
          valueColor="text-green-600"
        />
        
        <StatsCard
          title="Featured"
          value={dashboardStats.featuredPosts}
          icon={FileText}
          change="High engagement"
          progress={dashboardStats.totalPosts > 0 ? (dashboardStats.featuredPosts / dashboardStats.totalPosts) * 100 : 0}
          borderColor="border-l-4 border-l-yellow-500"
          iconColor="text-yellow-500"
          valueColor="text-yellow-600"
        />
        
        <StatsCard
          title="Drafts"
          value={dashboardStats.draftPosts}
          icon={FileText}
          change="Pending review"
          progress={dashboardStats.totalPosts > 0 ? (dashboardStats.draftPosts / dashboardStats.totalPosts) * 100 : 0}
          borderColor="border-l-4 border-l-orange-500"
          iconColor="text-orange-500"
          valueColor="text-orange-600"
        />
      </div>

      <PerformanceMetrics metrics={performanceMetrics} />
    </div>
  );
}