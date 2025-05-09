
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
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log("Auth state changed:", event, currentSession?.user?.email);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        // If session changes, fetch user profile data
        if (currentSession?.user) {
          console.log("Fetching profile for user:", currentSession.user.id);
          fetchProfile(currentSession.user.id);
        } else {
          setProfile(null);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      console.log("Got existing session:", currentSession?.user?.email);
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      if (currentSession?.user) {
        fetchProfile(currentSession.user.id);
      }
      
      setIsLoading(false);
    });

    return () => {
      console.log("Unsubscribing from auth state changes");
      subscription.unsubscribe();
    };
  }, []);

  async function fetchProfile(userId: string) {
    try {
      console.log("Fetching profile for user ID:", userId);
      // Use the RPC function to fetch the profile by user ID
      const { data, error } = await supabase
        .rpc('get_profile_by_id', { user_id: userId });

      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }

      console.log("Profile data:", data);
      setProfile(data);
    } catch (error) {
      console.error('Profile fetch error:', error);
    }
  }

  async function signIn(email: string, password: string) {
    try {
      console.log("Attempting to sign in:", email);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Sign in error:", error.message);
        toast.error(error.message);
        throw error;
      }

      console.log("Sign in successful:", data.user?.email);
      toast.success("Logged in successfully");
      navigate("/admin");
    } catch (error) {
      console.error("Sign in error:", error);
      throw error;
    }
  }

  async function signUp(email: string, password: string, userData?: any) {
    try {
      console.log("Attempting to sign up:", email);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData,
        },
      });

      if (error) {
        console.error("Sign up error:", error.message);
        toast.error(error.message);
        throw error;
      }

      console.log("Sign up successful or confirmation email sent:", data);
      
      // Handle the case where email confirmation is required
      if (data.session === null) {
        toast.success("Account created! Please check your email to confirm your registration.");
      } else {
        // If confirmation is disabled in Supabase settings, user is already confirmed
        toast.success("Account created successfully!");
        navigate("/admin");
      }
    } catch (error) {
      console.error("Sign up error:", error);
      throw error;
    }
  }

  async function signOut() {
    try {
      console.log("Attempting to sign out");
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Sign out error:", error.message);
        toast.error(error.message);
        throw error;
      }
      
      console.log("Sign out successful");
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      console.error("Sign out error:", error);
      throw error;
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
