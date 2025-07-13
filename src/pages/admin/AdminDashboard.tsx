import { useState } from "react";
import { useDashboardData } from "@/hooks/useDashboardData";
import { DashboardHeader } from "@/components/admin/dashboard/DashboardHeader";
import { DashboardTabs } from "@/components/admin/dashboard/DashboardTabs";

export default function AdminDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("30");
  
  const {
    posts,
    loading,
    refreshing,
    dashboardStats,
    handleRefresh,
    handleDeletePost,
    handleBulkDelete,
    loadDashboardData
  } = useDashboardData();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
          <p className="text-muted-foreground font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <DashboardHeader
        selectedPeriod={selectedPeriod}
        setSelectedPeriod={setSelectedPeriod}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />

      <DashboardTabs
        posts={posts}
        dashboardStats={dashboardStats}
        onDelete={handleDeletePost}
        onBulkDelete={handleBulkDelete}
        onRefresh={loadDashboardData}
      />
    </div>
  );
}