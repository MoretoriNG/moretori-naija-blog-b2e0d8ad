
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Menu, 
  Bell, 
  Settings, 
  Search, 
  LogOut, 
  FilePlus, 
  LayoutDashboard, 
  FileText, 
  Upload,
  Users,
  MessageSquare,
  TrendingUp,
  Calendar,
  Filter,
  Command,
  Zap,
  Globe,
  BarChart3,
  Sparkles,
  Shield,
  HelpCircle,
  Sun,
  Moon,
  Monitor
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command as CommandPrimitive,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export function AdminNav() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showQuickSearch, setShowQuickSearch] = useState(false);
  const { signOut, user, profile } = useAuth();

  const handleLogout = async () => {
    await signOut();
  };

  const userInitials = user?.email ? user.email.substring(0, 2).toUpperCase() : "AD";

  // Mock notifications for demo
  const notifications = [
    { 
      id: 1, 
      title: "New comment on your post", 
      description: "User commented on 'AI Technology Guide'",
      time: "2 min ago", 
      unread: true,
      type: "comment"
    },
    { 
      id: 2, 
      title: "Post published successfully", 
      description: "Your draft has been published",
      time: "1 hour ago", 
      unread: true,
      type: "success"
    },
    { 
      id: 3, 
      title: "Weekly analytics report", 
      description: "Your blog stats for this week",
      time: "1 day ago", 
      unread: false,
      type: "report"
    },
    { 
      id: 4, 
      title: "System maintenance scheduled", 
      description: "Scheduled for tomorrow at 2 AM",
      time: "2 days ago", 
      unread: false,
      type: "system"
    },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  // Quick search items
  const quickSearchItems = [
    { title: "Dashboard", url: "/admin", icon: LayoutDashboard, category: "Navigation" },
    { title: "All Posts", url: "/admin", icon: FileText, category: "Content" },
    { title: "Create Post", url: "/admin/posts/new", icon: FilePlus, category: "Content" },
    { title: "Analytics", url: "/admin/analytics", icon: BarChart3, category: "Insights" },
    { title: "Users", url: "/admin/users", icon: Users, category: "Management" },
    { title: "Settings", url: "/admin/settings", icon: Settings, category: "System" },
    { title: "Media Library", url: "/admin/media", icon: Upload, category: "Content" },
  ];

  const filteredItems = quickSearchItems.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <header className="sticky top-0 z-30 w-full border-b bg-white/95 backdrop-blur-md supports-[backdrop-filter]:bg-white/80 shadow-sm">
      <div className="flex h-16 items-center px-4 lg:px-6">
        <div className="md:hidden mr-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="hover:bg-gray-100"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {/* Enhanced Search Bar with Command Menu */}
        <div className="flex-1 md:ml-0 max-w-md">
          <Popover open={showQuickSearch} onOpenChange={setShowQuickSearch}>
            <PopoverTrigger asChild>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Quick search... (⌘K)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setShowQuickSearch(true)}
                  className="pl-10 pr-16 h-10 bg-gray-50 border-gray-200 focus:bg-white transition-colors rounded-full"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                  <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                    <span className="text-xs">⌘</span>K
                  </kbd>
                </div>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="start">
              <CommandPrimitive className="rounded-lg border shadow-md">
                <CommandInput 
                  placeholder="Search admin panel..." 
                  value={searchQuery}
                  onValueChange={setSearchQuery}
                />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  {["Navigation", "Content", "Insights", "Management", "System"].map((category) => {
                    const categoryItems = filteredItems.filter(item => item.category === category);
                    if (categoryItems.length === 0) return null;
                    
                    return (
                      <CommandGroup key={category} heading={category}>
                        {categoryItems.map((item) => (
                          <CommandItem
                            key={item.url}
                            onSelect={() => {
                              window.location.href = item.url;
                              setShowQuickSearch(false);
                            }}
                          >
                            <item.icon className="mr-2 h-4 w-4" />
                            <span>{item.title}</span>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    );
                  })}
                </CommandList>
              </CommandPrimitive>
            </PopoverContent>
          </Popover>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 ml-4">
          {/* Quick Stats */}
          <div className="hidden lg:flex items-center gap-4 mr-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground bg-green-50 px-3 py-1 rounded-full">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="font-medium text-green-600">+12%</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground bg-blue-50 px-3 py-1 rounded-full">
              <Calendar className="h-4 w-4 text-blue-600" />
              <span className="font-medium text-blue-600">Today</span>
            </div>
          </div>

          {/* Quick Actions */}
          <Link to="/admin/posts/new">
            <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-md">
              <FilePlus className="h-4 w-4 mr-2" />
              New Post
            </Button>
          </Link>

          {/* Site Preview */}
          <Button variant="outline" size="icon" asChild className="hidden lg:flex">
            <Link to="/" target="_blank">
              <Globe className="h-4 w-4" />
            </Link>
          </Button>
          
          {/* Enhanced Notifications */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="relative hover:bg-gray-100">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <Badge 
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs animate-pulse"
                  >
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">Notifications</CardTitle>
                    <Button variant="ghost" size="sm" className="text-xs">
                      Mark all read
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div 
                        key={notification.id}
                        className={`p-4 border-b last:border-b-0 hover:bg-gray-50 cursor-pointer transition-colors ${
                          notification.unread ? 'bg-blue-50/30 border-l-4 border-l-blue-500' : ''
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                            notification.type === 'comment' ? 'bg-blue-500' :
                            notification.type === 'success' ? 'bg-green-500' :
                            notification.type === 'report' ? 'bg-purple-500' :
                            'bg-orange-500'
                          }`} />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 mb-1">
                              {notification.title}
                            </p>
                            <p className="text-xs text-muted-foreground mb-2">
                              {notification.description}
                            </p>
                            <p className="text-xs text-gray-400">{notification.time}</p>
                          </div>
                          {notification.unread && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 border-t bg-gray-50">
                    <Button variant="ghost" size="sm" className="w-full justify-center text-xs">
                      View all notifications
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </PopoverContent>
          </Popover>
          
          {/* Enhanced User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-gray-100">
                <Avatar className="h-10 w-10 ring-2 ring-offset-2 ring-blue-100">
                  <AvatarImage src={profile?.avatar_url} alt={user?.email || "User"} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white font-semibold">
                    {userInitials}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={profile?.avatar_url} alt={user?.email || "User"} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-xs font-semibold">
                        {userInitials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none">
                        {profile?.username || "Admin User"}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground mt-1">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-green-600 font-medium">Online</span>
                    <Badge variant="secondary" className="text-xs ml-auto">
                      {profile?.role || 'Admin'}
                    </Badge>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              
              <DropdownMenuItem asChild>
                <Link to="/profile" className="flex items-center">
                  <Users className="mr-2 h-4 w-4" />
                  <span>Profile Settings</span>
                </Link>
              </DropdownMenuItem>
              
              <DropdownMenuItem asChild>
                <Link to="/admin/analytics" className="flex items-center">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  <span>Analytics</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <Monitor className="mr-2 h-4 w-4" />
                  <span>Theme</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem onClick={() => toast.info("Theme switching coming soon!")}>
                    <Sun className="mr-2 h-4 w-4" />
                    <span>Light</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => toast.info("Theme switching coming soon!")}>
                    <Moon className="mr-2 h-4 w-4" />
                    <span>Dark</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => toast.info("Theme switching coming soon!")}>
                    <Monitor className="mr-2 h-4 w-4" />
                    <span>System</span>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>

              <DropdownMenuItem asChild>
                <Link to="/admin/settings" className="flex items-center">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Admin Settings</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />
              
              <DropdownMenuItem>
                <HelpCircle className="mr-2 h-4 w-4" />
                <span>Help & Support</span>
              </DropdownMenuItem>
              
              <DropdownMenuItem>
                <Shield className="mr-2 h-4 w-4" />
                <span>Security</span>
              </DropdownMenuItem>

              <DropdownMenuSeparator />
              
              <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600 focus:bg-red-50">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sign Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {/* Enhanced Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden border-t bg-white p-4 shadow-lg">
          <div className="space-y-2">
            <Button variant="ghost" asChild className="w-full justify-start">
              <Link to="/admin">
                <LayoutDashboard className="h-5 w-5 mr-3" />
                Dashboard
              </Link>
            </Button>
            <Button variant="ghost" asChild className="w-full justify-start">
              <Link to="/admin">
                <FileText className="h-5 w-5 mr-3" />
                All Posts
              </Link>
            </Button>
            <Button variant="ghost" asChild className="w-full justify-start">
              <Link to="/admin/posts/new">
                <FilePlus className="h-5 w-5 mr-3" />
                Create Post
              </Link>
            </Button>
            <Button variant="ghost" asChild className="w-full justify-start">
              <Link to="/admin/analytics">
                <BarChart3 className="h-5 w-5 mr-3" />
                Analytics
              </Link>
            </Button>
            <Button variant="ghost" asChild className="w-full justify-start">
              <Link to="/admin/media">
                <Upload className="h-5 w-5 mr-3" />
                Media Library
              </Link>
            </Button>
            <Button variant="ghost" asChild className="w-full justify-start">
              <Link to="/admin/settings">
                <Settings className="h-5 w-5 mr-3" />
                Settings
              </Link>
            </Button>
            <div className="pt-2 border-t">
              <Button variant="ghost" asChild className="w-full justify-start">
                <Link to="/">
                  <Globe className="h-5 w-5 mr-3" />
                  View Site
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
