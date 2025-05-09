
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { LoginForm } from "@/components/auth/LoginForm";
import { RegisterForm } from "@/components/auth/RegisterForm";

export default function AuthPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { signIn, signUp, user } = useAuth();
  const initialTab = searchParams.get('tab') === 'register' ? 'register' : 'login';
  const [activeTab, setActiveTab] = useState<"login" | "register">(initialTab as "login" | "register");
  
  // Login state
  const [loginEmail, setLoginEmail] = useState("");
  
  // Update URL when tab changes
  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('tab', activeTab);
    window.history.replaceState({}, '', `${window.location.pathname}?${newParams}`);
  }, [activeTab, searchParams]);

  // If user is already logged in, redirect to admin
  useEffect(() => {
    if (user) {
      navigate("/admin");
    }
  }, [user, navigate]);

  const handleSuccessfulRegistration = (email: string) => {
    setActiveTab("login");
    setLoginEmail(email); // Pre-fill the email for convenience
  };

  if (user) {
    return null; // Handled by useEffect redirect
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-600/10 to-green-600/5 p-4">
      <div className="w-full max-w-md">
        <Card className="border shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-green-500 to-orange-500 bg-clip-text text-transparent">
              Moretori Account
            </CardTitle>
            <CardDescription>
              Sign in or create an account to manage content
            </CardDescription>
          </CardHeader>
          
          <Tabs value={activeTab} onValueChange={(val) => setActiveTab(val as "login" | "register")}>
            <TabsList className="grid grid-cols-2 mx-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <LoginForm onLogin={signIn} />
            </TabsContent>
            
            <TabsContent value="register">
              <RegisterForm 
                onRegister={signUp}
                onSuccess={handleSuccessfulRegistration} 
              />
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
