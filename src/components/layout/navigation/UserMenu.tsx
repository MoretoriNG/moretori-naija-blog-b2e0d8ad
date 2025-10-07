
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { LogIn, LogOut, User, UserPlus, Shield, BookOpen } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useUserRole } from '@/hooks/useUserRole';

interface UserMenuProps {
  onMenuItemClick?: () => void;
}

export function UserMenu({ onMenuItemClick }: UserMenuProps) {
  const { user, signOut } = useAuth();
  const { isAdmin } = useUserRole();
  
  const handleSignOut = () => {
    signOut();
    if (onMenuItemClick) onMenuItemClick();
  };
  
  return (
    <div className="flex items-center gap-2">
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="text-blue-600 border-blue-600/30 hover:bg-blue-600 hover:text-white">
              <User className="h-4 w-4 mr-2" />
              {user.email?.split('@')[0]}
              {isAdmin && <Shield className="h-3 w-3 ml-1 text-orange-500" />}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem asChild>
              <Link to="/profile" onClick={onMenuItemClick}>
                <BookOpen className="h-4 w-4 mr-2" />
                My Profile
              </Link>
            </DropdownMenuItem>
            {isAdmin && (
              <DropdownMenuItem asChild>
                <Link to="/admin" onClick={onMenuItemClick}>
                  <Shield className="h-4 w-4 mr-2" />
                  Admin Dashboard
                </Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Log Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <>
          <Button variant="outline" size="sm" className="text-blue-600 border-blue-600/30 hover:bg-blue-600 hover:text-white" asChild>
            <Link to="/auth/user" onClick={onMenuItemClick}>
              <LogIn className="h-4 w-4 mr-2" />
              Log In
            </Link>
          </Button>
          <Button size="sm" className="bg-green-600 hover:bg-green-700" asChild>
            <Link to="/auth/user" onClick={onMenuItemClick}>
              <UserPlus className="h-4 w-4 mr-2" />
              Sign Up
            </Link>
          </Button>
        </>
      )}
    </div>
  );
}

export function MobileUserMenu({ onMenuItemClick }: UserMenuProps) {
  const { user, signOut } = useAuth();
  const { isAdmin } = useUserRole();
  
  const handleSignOut = () => {
    signOut();
    if (onMenuItemClick) onMenuItemClick();
  };
  
  return (
    <div className="pt-2 flex gap-2">
      {user ? (
        <>
          <Button variant="outline" size="sm" className="flex-1 text-blue-600" onClick={handleSignOut}>
            <LogOut className="h-4 w-4 mr-2" />
            Log Out
          </Button>
          {isAdmin && (
            <Button asChild size="sm" className="flex-1 bg-orange-500 hover:bg-orange-600">
              <Link to="/admin" onClick={onMenuItemClick}>
                <Shield className="h-4 w-4 mr-2" />
                Admin
              </Link>
            </Button>
          )}
        </>
      ) : (
        <>
          <Button asChild variant="outline" size="sm" className="flex-1 text-blue-600">
            <Link to="/auth/user" onClick={onMenuItemClick}>
              <LogIn className="h-4 w-4 mr-2" />
              Log In
            </Link>
          </Button>
          <Button asChild size="sm" className="flex-1 bg-green-600 hover:bg-green-700">
            <Link to="/auth/user" onClick={onMenuItemClick}>
              <UserPlus className="h-4 w-4 mr-2" />
              Sign Up
            </Link>
          </Button>
        </>
      )}
    </div>
  );
}
