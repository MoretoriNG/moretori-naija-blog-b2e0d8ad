
import { Link, useLocation } from "react-router-dom";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  LayoutDashboard, 
  FileText, 
  FilePlus, 
  Upload, 
  Settings, 
  LogOut,
  BarChart3,
  Users,
  MessageSquare,
  Globe,
  Sparkles,
  Bell,
  Search,
  Bookmark,
  TrendingUp,
  Calendar,
  Zap,
  Shield,
  Archive
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";

export function AdminSidebar() {
  const location = useLocation();
  const { signOut, user, profile } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState(3);
  const [storageUsed, setStorageUsed] = useState(65);
  
  const menuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      href: "/admin",
      badge: null,
      description: "Overview & Analytics"
    },
    {
      title: "All Posts",
      icon: FileText,
      href: "/admin",
      badge: "12",
      description: "Manage Content"
    },
    {
      title: "Create Post",
      icon: FilePlus,
      href: "/admin/posts/new",
      badge: "New",
      description: "Write & Publish"
    },
    {
      title: "Analytics",
      icon: BarChart3,
      href: "/admin/analytics",
      badge: null,
      description: "Performance Metrics"
    },
    {
      title: "Media Library",
      icon: Upload,
      href: "/admin/media",
      badge: null,
      description: "Files & Images"
    },
    {
      title: "Comments",
      icon: MessageSquare,
      href: "/admin/comments",
      badge: "3",
      description: "User Feedback"
    },
    {
      title: "Users",
      icon: Users,
      href: "/admin/users",
      badge: null,
      description: "Subscribers & Authors"
    },
  ];

  const quickActions = [
    {
      title: "Trending Posts",
      icon: TrendingUp,
      href: "/admin/trending",
      color: "text-green-600"
    },
    {
      title: "Scheduled",
      icon: Calendar,
      href: "/admin/scheduled",
      color: "text-blue-600"
    },
    {
      title: "Bookmarks",
      icon: Bookmark,
      href: "/admin/bookmarks",
      color: "text-purple-600"
    },
    {
      title: "Archives",
      icon: Archive,
      href: "/admin/archives",
      color: "text-gray-600"
    }
  ];

  const systemItems = [
    {
      title: "Settings",
      icon: Settings,
      href: "/admin/settings",
      description: "System Configuration"
    },
    {
      title: "Security",
      icon: Shield,
      href: "/admin/security",
      description: "Access Control"
    }
  ];

  const handleLogout = async () => {
    await signOut();
  };

  const userInitials = user?.email ? user.email.substring(0, 2).toUpperCase() : "AD";

  const filteredMenuItems = menuItems.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Sidebar className="border-r border-border/40 bg-gradient-to-b from-white to-gray-50/50 backdrop-blur-sm shadow-xl">
      <SidebarHeader className="p-6 border-b border-border/40 bg-white/80">
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-orange-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 bg-clip-text text-transparent">
              Admin Panel
            </span>
            <span className="text-xs text-muted-foreground">Content Management System</span>
          </div>
        </Link>

        {/* Enhanced Search Bar */}
        <div className="relative mt-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search menu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-gray-50/50 border-gray-200 focus:bg-white transition-colors"
          />
        </div>

        {/* Storage Usage Indicator */}
        <div className="mt-4 p-3 bg-gray-50/80 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Storage</span>
            <span className="text-xs text-muted-foreground">{storageUsed}%</span>
          </div>
          <Progress value={storageUsed} className="h-2" />
          <p className="text-xs text-muted-foreground mt-1">
            {storageUsed < 80 ? "Good usage" : "Consider cleanup"}
          </p>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-3">
        {/* Main Navigation */}
        <div className="space-y-1 mb-6">
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-2">
            Main Navigation
          </h4>
          {filteredMenuItems.map((item) => (
            <Button
              key={item.title}
              variant="ghost"
              asChild
              className={cn(
                "w-full justify-start h-12 px-4 text-sm font-medium transition-all duration-200 hover:bg-blue-50 hover:text-blue-700 group relative",
                location.pathname === item.href && "bg-blue-100 text-blue-700 shadow-sm border-r-2 border-blue-500"
              )}
            >
              <Link to={item.href} className="flex items-center">
                <item.icon className="h-5 w-5 mr-3 transition-transform group-hover:scale-110" />
                <div className="flex-1 text-left">
                  <span className="block">{item.title}</span>
                  <span className="text-xs text-muted-foreground block">
                    {item.description}
                  </span>
                </div>
                {item.badge && (
                  <Badge 
                    variant={item.badge === "New" ? "default" : "secondary"} 
                    className="ml-2 text-xs"
                  >
                    {item.badge}
                  </Badge>
                )}
              </Link>
            </Button>
          ))}
        </div>

        <Separator className="my-4" />

        {/* Quick Actions */}
        <div className="space-y-1 mb-6">
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-2">
            Quick Actions
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {quickActions.map((action) => (
              <Button
                key={action.title}
                variant="outline"
                asChild
                className="h-16 flex-col gap-1 hover:bg-gray-50 border-dashed"
              >
                <Link to={action.href}>
                  <action.icon className={`h-4 w-4 ${action.color}`} />
                  <span className="text-xs font-medium">{action.title}</span>
                </Link>
              </Button>
            ))}
          </div>
        </div>

        <Separator className="my-4" />

        {/* System Settings */}
        <div className="space-y-1">
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-2">
            System
          </h4>
          {systemItems.map((item) => (
            <Button
              key={item.title}
              variant="ghost"
              asChild
              className={cn(
                "w-full justify-start h-11 px-4 text-sm font-medium transition-all duration-200 hover:bg-gray-50 hover:text-gray-700 group",
                location.pathname === item.href && "bg-gray-100 text-gray-700 shadow-sm"
              )}
            >
              <Link to={item.href} className="flex items-center">
                <item.icon className="h-4 w-4 mr-3 transition-transform group-hover:scale-110" />
                <div className="flex-1 text-left">
                  <span className="block">{item.title}</span>
                  <span className="text-xs text-muted-foreground block">
                    {item.description}
                  </span>
                </div>
              </Link>
            </Button>
          ))}
        </div>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-border/40 bg-white/80">
        {/* Enhanced User Profile Section */}
        <div className="flex items-center space-x-3 mb-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
          <div className="relative">
            <Avatar className="h-12 w-12 ring-2 ring-blue-200 shadow-md">
              <AvatarImage src={profile?.avatar_url} alt={user?.email || "Admin"} />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white font-semibold text-sm">
                {userInitials}
              </AvatarFallback>
            </Avatar>
            {notifications > 0 && (
              <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                {notifications}
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">
              {profile?.username || "Admin User"}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {user?.email}
            </p>
            <div className="flex items-center mt-1">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span className="text-xs text-green-600 font-medium">Online</span>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="space-y-2">
          <Button
            variant="ghost"
            className="w-full justify-start text-muted-foreground hover:bg-gray-100 hover:text-gray-900 group"
            asChild
          >
            <Link to="/">
              <Globe className="h-4 w-4 mr-3 group-hover:text-blue-500 transition-colors" />
              <span>Visit Website</span>
            </Link>
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start text-muted-foreground hover:bg-gray-100 hover:text-gray-900 group"
          >
            <Bell className="h-4 w-4 mr-3 group-hover:text-yellow-500 transition-colors" />
            <span>Notifications</span>
            {notifications > 0 && (
              <Badge variant="destructive" className="ml-auto text-xs">
                {notifications}
              </Badge>
            )}
          </Button>
          
          <Button
            variant="ghost"
            className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700 group"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-3 group-hover:scale-110 transition-transform" />
            <span>Sign Out</span>
          </Button>
        </div>

        {/* System Status */}
        <div className="mt-3 p-2 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center">
            <Zap className="h-3 w-3 text-green-500 mr-2" />
            <span className="text-xs text-green-700 font-medium">System Healthy</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
