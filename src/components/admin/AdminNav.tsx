
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, Bell, Settings, Search, LogOut, FilePlus, LayoutDashboard, FileText, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";

export function AdminNav() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { signOut, user } = useAuth();

  const handleLogout = async () => {
    await signOut();
  };

  const userInitials = user?.email ? user.email.substring(0, 2).toUpperCase() : "AD";

  return (
    <header className="sticky top-0 z-30 w-full border-b bg-card">
      <div className="flex h-16 items-center px-4">
        <div className="md:hidden mr-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex-1 md:ml-0">
          <form className="relative max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search posts..."
              className="rounded-full pl-8 bg-background/80"
            />
          </form>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/admin/posts/new">
            <Button className="bg-green-600 hover:bg-green-700">
              <FilePlus className="h-4 w-4 mr-2" />
              New Post
            </Button>
          </Link>
          
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Bell className="h-5 w-5" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.user_metadata?.avatar_url} alt={user?.email || "User"} />
                  <AvatarFallback>{userInitials}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/admin/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {showMobileMenu && (
        <div className="md:hidden border-t p-2">
          <div className="space-y-1">
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
          </div>
        </div>
      )}
    </header>
  );
}
