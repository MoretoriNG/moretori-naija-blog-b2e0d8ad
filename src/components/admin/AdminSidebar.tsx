
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
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

export function AdminSidebar() {
  const location = useLocation();
  const { signOut, user, profile } = useAuth();
  
  const menuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      href: "/admin",
      badge: null,
    },
    {
      title: "All Posts",
      icon: FileText,
      href: "/admin",
      badge: null,
    },
    {
      title: "Create Post",
      icon: FilePlus,
      href: "/admin/posts/new",
      badge: "New",
    },
    {
      title: "Analytics",
      icon: BarChart3,
      href: "/admin/analytics",
      badge: null,
    },
    {
      title: "Media Library",
      icon: Upload,
      href: "/admin/media",
      badge: null,
    },
    {
      title: "Comments",
      icon: MessageSquare,
      href: "/admin/comments",
      badge: "3",
    },
    {
      title: "Users",
      icon: Users,
      href: "/admin/users",
      badge: null,
    },
    {
      title: "Settings",
      icon: Settings,
      href: "/admin/settings",
      badge: null,
    },
  ];

  const handleLogout = async () => {
    await signOut();
  };

  const userInitials = user?.email ? user.email.substring(0, 2).toUpperCase() : "AD";

  return (
    <Sidebar className="border-r border-border/40 bg-white/80 backdrop-blur-sm shadow-lg">
      <SidebarHeader className="p-6 border-b border-border/40">
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-orange-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-200">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 bg-clip-text text-transparent">
              Admin Panel
            </span>
            <span className="text-xs text-muted-foreground">Content Management</span>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className="p-3">
        <div className="space-y-1">
          {menuItems.map((item) => (
            <Button
              key={item.title}
              variant="ghost"
              asChild
              className={cn(
                "w-full justify-start h-11 px-4 text-sm font-medium transition-all duration-200 hover:bg-blue-50 hover:text-blue-700 group",
                location.pathname === item.href && "bg-blue-100 text-blue-700 shadow-sm"
              )}
            >
              <Link to={item.href} className="flex items-center">
                <item.icon className="h-5 w-5 mr-3 transition-transform group-hover:scale-110" />
                <span className="flex-1">{item.title}</span>
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
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-border/40">
        <div className="flex items-center space-x-3 mb-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
          <Avatar className="h-10 w-10 ring-2 ring-blue-200">
            <AvatarImage src={profile?.avatar_url} alt={user?.email || "Admin"} />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white font-semibold">
              {userInitials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {profile?.username || "Admin User"}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {user?.email}
            </p>
          </div>
        </div>
        
        <div className="space-y-2">
          <Button
            variant="ghost"
            className="w-full justify-start text-muted-foreground hover:bg-gray-100 hover:text-gray-900"
            asChild
          >
            <Link to="/">
              <Globe className="h-4 w-4 mr-3" />
              Visit Site
            </Link>
          </Button>
          
          <Button
            variant="ghost"
            className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-3" />
            Logout
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
