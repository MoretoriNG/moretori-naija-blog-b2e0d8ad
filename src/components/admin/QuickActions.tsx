import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit, Image, Settings, Users, BarChart3, FileText, Video } from "lucide-react";

export function QuickActions() {
  const actions = [
    {
      title: "Create Post",
      description: "Write a new blog post",
      icon: Plus,
      href: "/admin/posts/new",
      color: "bg-gradient-to-r from-blue-500 to-blue-600",
      hoverColor: "hover:from-blue-600 hover:to-blue-700"
    },
    {
      title: "Media Library",
      description: "Manage your images",
      icon: Image,
      href: "/admin/media",
      color: "bg-gradient-to-r from-green-500 to-green-600",
      hoverColor: "hover:from-green-600 hover:to-green-700"
    },
    {
      title: "Analytics",
      description: "View site statistics",
      icon: BarChart3,
      href: "/admin/analytics",
      color: "bg-gradient-to-r from-purple-500 to-purple-600",
      hoverColor: "hover:from-purple-600 hover:to-purple-700"
    },
    {
      title: "Settings",
      description: "Configure your site",
      icon: Settings,
      href: "/admin/settings",
      color: "bg-gradient-to-r from-orange-500 to-orange-600",
      hoverColor: "hover:from-orange-600 hover:to-orange-700"
    }
  ];

  return (
    <Card className="shadow-xl border-0 bg-gradient-to-br from-card to-muted/20">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
            <FileText className="w-4 h-4 text-primary-foreground" />
          </div>
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {actions.map((action, index) => (
            <Button
              key={action.title}
              asChild
              variant="outline"
              className={`h-auto p-6 flex flex-col items-center gap-3 ${action.color} ${action.hoverColor} text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fade-in`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Link to={action.href}>
                <action.icon className="w-8 h-8" />
                <div className="text-center">
                  <p className="font-semibold text-lg">{action.title}</p>
                  <p className="text-sm opacity-90">{action.description}</p>
                </div>
              </Link>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}