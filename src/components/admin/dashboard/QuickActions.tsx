
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Zap, Plus, FileText, BarChart3, Users, Calendar } from "lucide-react";

export function QuickActions() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-500" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button asChild className="w-full justify-start" variant="outline">
            <Link to="/admin/posts/new">
              <Plus className="h-4 w-4 mr-2" />
              Create New Post
            </Link>
          </Button>
          <Button asChild className="w-full justify-start" variant="outline">
            <Link to="/admin/media">
              <FileText className="h-4 w-4 mr-2" />
              Upload Media
            </Link>
          </Button>
          <Button asChild className="w-full justify-start" variant="outline">
            <Link to="/admin/analytics">
              <BarChart3 className="h-4 w-4 mr-2" />
              View Analytics
            </Link>
          </Button>
        </CardContent>
      </Card>

      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-500" />
            Audience Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Total Subscribers</span>
            <span className="font-semibold">1247</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Comments</span>
            <span className="font-semibold">89</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Avg. Session</span>
            <span className="font-semibold">4m 32s</span>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Calendar className="h-5 w-5 text-green-500" />
            Publishing Schedule
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">3</p>
            <p className="text-sm text-muted-foreground">Posts this week</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold">5</p>
            <p className="text-sm text-muted-foreground">Drafts ready</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
