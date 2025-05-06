
import { Link, useLocation } from "react-router-dom";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, FileText, FilePlus, Upload, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

export function AdminSidebar() {
  const location = useLocation();
  const { signOut } = useAuth();
  
  // Menu items for the sidebar
  const menuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      href: "/admin",
    },
    {
      title: "All Posts",
      icon: FileText,
      href: "/admin",
    },
    {
      title: "Create Post",
      icon: FilePlus,
      href: "/admin/posts/new",
    },
    {
      title: "Media Library",
      icon: Upload,
      href: "/admin/media",
    },
    {
      title: "Settings",
      icon: Settings,
      href: "/admin/settings",
    },
  ];

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <Sidebar className="border-r border-border hidden md:flex bg-sidebar-background text-sidebar-foreground">
      <SidebarHeader className="p-4 border-b border-sidebar-border">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 via-green-500 to-orange-500 bg-clip-text text-transparent">
            Moretori Admin
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <div className="space-y-1">
          {menuItems.map((item) => (
            <Button
              key={item.title}
              variant="ghost"
              asChild
              className={cn(
                "w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                location.pathname === item.href && "bg-sidebar-accent text-sidebar-accent-foreground"
              )}
            >
              <Link to={item.href}>
                <item.icon className="h-5 w-5 mr-3" />
                {item.title}
              </Link>
            </Button>
          ))}
        </div>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t border-sidebar-border">
        <Button
          variant="ghost"
          className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5 mr-3" />
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
