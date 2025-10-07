
import { createContext, useContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type AuthContextType = {
  session: Session | null;
  user: User | null;
  profile: any | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, userData?: any) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;

    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        if (!mounted) return;
        
        // Only update state with synchronous operations
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        // If session changes, fetch user profile data using setTimeout
        if (currentSession?.user) {
          setTimeout(() => {
            if (mounted) {
              fetchProfile(currentSession.user.id);
            }
          }, 0);
        } else {
          setProfile(null);
        }
      }
    );

    // THEN check for existing session
    async function getInitialSession() {
      try {
        const { data } = await supabase.auth.getSession();
        if (!mounted) return;
        
        setSession(data.session);
        setUser(data.session?.user ?? null);
        
        if (data.session?.user) {
          fetchProfile(data.session.user.id);
        }
      } catch (error) {
        // Only log errors, not user data
        console.error("Error getting session");
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    getInitialSession();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  async function fetchProfile(userId: string) {
    try {
      // Use the RPC function to fetch the profile by user ID
      const { data, error } = await supabase
        .rpc('get_profile_by_id', { user_id: userId });

      if (error) {
        return;
      }

      setProfile(data);
    } catch (error) {
      // Silent fail - profile fetch errors are not critical
    }
  }

  async function signIn(email: string, password: string) {
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error(error.message);
        throw error;
      }

      toast.success("Logged in successfully");
      
      // Handle successful login
      if (data.user) {
        await fetchProfile(data.user.id);
        navigate("/admin");
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  async function signUp(email: string, password: string, userData?: any) {
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData,
        },
      });

      if (error) {
        toast.error(error.message);
        throw error;
      }
      
      // Handle the case where email confirmation is required
      if (data.session === null) {
        toast.success("Account created! Please check your email to confirm your registration.");
      } else {
        // If confirmation is disabled in Supabase settings, user is already confirmed
        await fetchProfile(data.user.id);
        toast.success("Account created successfully!");
        navigate("/admin");
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  async function signOut() {
    try {
      setIsLoading(true);
      
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast.error(error.message);
        throw error;
      }
      
      toast.success("Logged out successfully");
      
      // Clear user data and redirect
      setUser(null);
      setSession(null);
      setProfile(null);
      navigate("/");
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  const value = {
    session,
    user,
    profile,
    isLoading,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
