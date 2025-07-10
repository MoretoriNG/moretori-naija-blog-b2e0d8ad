
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, ArrowUpRight } from "lucide-react";

interface ActivityItem {
  action: string;
  item: string;
  time: string;
  type: "publish" | "comment" | "update" | "user" | "view";
  trend: "up" | "neutral";
}

const activities: ActivityItem[] = [
  { action: "New post published", item: "Understanding AI in 2024", time: "2 hours ago", type: "publish", trend: "up" },
  { action: "Comment received", item: "Tech Trends Post", time: "4 hours ago", type: "comment", trend: "up" },
  { action: "Post updated", item: "Best Practices Guide", time: "1 day ago", type: "update", trend: "neutral" },
  { action: "New subscriber", item: "john@example.com", time: "2 days ago", type: "user", trend: "up" },
  { action: "Post viewed 50+ times", item: "JavaScript Guide", time: "3 days ago", type: "view", trend: "up" },
];

export function RecentActivity() {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <Activity className="h-5 w-5 text-blue-500" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                activity.type === 'publish' ? 'bg-green-500' :
                activity.type === 'comment' ? 'bg-blue-500' :
                activity.type === 'update' ? 'bg-orange-500' :
                activity.type === 'view' ? 'bg-purple-500' :
                'bg-indigo-500'
              }`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{activity.action}</p>
                <p className="text-xs text-muted-foreground truncate">{activity.item}</p>
                <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
              </div>
              {activity.trend === 'up' && (
                <ArrowUpRight className="h-4 w-4 text-green-500 flex-shrink-0" />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
