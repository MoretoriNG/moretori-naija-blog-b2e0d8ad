
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "@/components/ui/motion";
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
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
    <motion.div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{ 
        backgroundImage: 'linear-gradient(135deg, #1a365d 0%, #2a4365 50%, #1a365d 100%)' 
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="w-full max-w-md"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Card className="border-0 shadow-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 to-blue-600/20 z-0"></div>
          
          <CardHeader className="text-center relative z-10">
            <CardTitle className="text-3xl font-extrabold">
              <span className="bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent">
                Welcome Back
              </span>
            </CardTitle>
            <CardDescription>
              Sign in or create an account to manage your content
            </CardDescription>
          </CardHeader>
          
          <CardContent className="relative z-10 pb-8">
            <Tabs value={activeTab} onValueChange={(val) => setActiveTab(val as "login" | "register")} className="w-full">
              <TabsList className="grid grid-cols-2 mb-8">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <LoginForm 
                    onLogin={signIn} 
                  />
                </motion.div>
              </TabsContent>
              
              <TabsContent value="register">
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <RegisterForm 
                    onRegister={signUp}
                    onSuccess={handleSuccessfulRegistration}
                  />
                </motion.div>
              </TabsContent>
            </Tabs>
          </CardContent>
          
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-orange-500 via-blue-500 to-orange-500"></div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
