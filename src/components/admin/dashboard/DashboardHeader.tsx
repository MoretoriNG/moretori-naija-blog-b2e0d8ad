import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Plus, Eye, Globe, RefreshCw } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AdminHeader } from "@/components/admin/AdminHeader";

interface DashboardHeaderProps {
  selectedPeriod: string;
  setSelectedPeriod: (period: string) => void;
  refreshing: boolean;
  onRefresh: () => void;
}

export function DashboardHeader({ 
  selectedPeriod, 
  setSelectedPeriod, 
  refreshing, 
  onRefresh 
}: DashboardHeaderProps) {
  return (
    <AdminHeader
      title="Dashboard Overview"
      description="Monitor your blog's performance and manage content efficiently"
      actions={
        <div className="flex items-center gap-3">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={onRefresh}
            disabled={refreshing}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          
          <Button variant="outline" asChild>
            <Link to="/">
              <Globe className="h-4 w-4 mr-2" />
              View Site
            </Link>
          </Button>
          
          <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-md">
            <Link to="/admin/posts/new">
              <Plus className="h-4 w-4 mr-2" />
              New Post
            </Link>
          </Button>
        </div>
      }
    />
  );
}