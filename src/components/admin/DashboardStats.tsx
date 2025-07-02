import { TrendingUp, Users, FileText, Eye, Calendar, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatsProps {
  stats: {
    totalPosts: number;
    featuredPosts: number;
    publishedPosts: number;
    draftPosts: number;
  };
}

export function DashboardStats({ stats }: StatsProps) {
  const statItems = [
    {
      title: "Total Posts",
      value: stats.totalPosts,
      icon: FileText,
      color: "blue",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      textColor: "text-blue-600",
      iconBg: "bg-blue-100",
      description: "All content created"
    },
    {
      title: "Featured Posts",
      value: stats.featuredPosts,
      icon: Star,
      color: "yellow",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200", 
      textColor: "text-yellow-600",
      iconBg: "bg-yellow-100",
      description: "Highlighted content"
    },
    {
      title: "Published",
      value: stats.publishedPosts,
      icon: TrendingUp,
      color: "green",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      textColor: "text-green-600",
      iconBg: "bg-green-100",
      description: "Live on site"
    },
    {
      title: "Drafts",
      value: stats.draftPosts,
      icon: Calendar,
      color: "orange",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      textColor: "text-orange-600",
      iconBg: "bg-orange-100",
      description: "Work in progress"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statItems.map((item, index) => (
        <Card key={item.title} className={`${item.bgColor} ${item.borderColor} border-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fade-in`} style={{ animationDelay: `${index * 100}ms` }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className={`p-3 rounded-xl ${item.iconBg} shadow-sm`}>
                <item.icon className={`h-6 w-6 ${item.textColor}`} />
              </div>
              <div className="text-right">
                <p className={`text-3xl font-bold ${item.textColor} mb-1`}>
                  {item.value.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <h3 className={`font-semibold ${item.textColor} text-lg`}>
                {item.title}
              </h3>
              <div className={`w-full bg-white rounded-full h-2 mt-2`}>
                <div 
                  className={`bg-gradient-to-r from-${item.color}-400 to-${item.color}-600 h-2 rounded-full transition-all duration-1000`}
                  style={{ width: `${Math.min((item.value / Math.max(...statItems.map(s => s.value))) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}