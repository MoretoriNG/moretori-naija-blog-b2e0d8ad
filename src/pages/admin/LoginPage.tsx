
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, LogIn, Shield, Users, Settings, BarChart } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const { signIn, user, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginInProgress, setLoginInProgress] = useState(false);
  const [error, setError] = useState("");

  // Redirect if already authenticated and is admin
  useEffect(() => {
    if (user && !isLoading) {
      const isAdmin = user?.user_metadata?.role === 'admin';
      if (isAdmin) {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }
  }, [user, isLoading, navigate]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoginInProgress(true);
    setError("");

    try {
      await signIn(email, password);
      // Check if user is admin after login
      // Redirect is handled by the useEffect above
    } catch (error: any) {
      setError(error.message || "Invalid email or password");
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setLoginInProgress(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-4">
        <div className="animate-pulse text-blue-600 flex items-center">
          <Shield className="w-6 h-6 mr-2" />
          Loading admin portal...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Portal</h1>
          <p className="text-gray-600">Secure access to content management</p>
        </div>

        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Administrator Login
            </CardTitle>
            <CardDescription>
              Enter your credentials to access the admin dashboard
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && (
                <div className="bg-red-50 text-red-700 p-3 rounded-md flex items-center text-sm border border-red-200">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  {error}
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">Admin Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@moretoranaija.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-gray-300 focus:border-blue-500"
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <a href="#" className="text-sm text-blue-600 hover:underline">
                    Forgot password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-gray-300 focus:border-blue-500"
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                disabled={loginInProgress}
              >
                {loginInProgress ? (
                  <>
                    <span className="animate-pulse mr-2">•••</span>
                    Authenticating
                  </>
                ) : (
                  <>
                    <LogIn className="h-4 w-4 mr-2" />
                    Access Admin Panel
                  </>
                )}
              </Button>
              
              <div className="w-full border-t pt-4">
                <h4 className="text-sm font-semibold text-gray-800 mb-3 text-center">Admin Capabilities</h4>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="flex flex-col items-center space-y-2">
                    <Users className="w-5 h-5 text-blue-500" />
                    <span className="text-xs text-gray-600">User Management</span>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <Settings className="w-5 h-5 text-purple-500" />
                    <span className="text-xs text-gray-600">Content Control</span>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <BarChart className="w-5 h-5 text-green-500" />
                    <span className="text-xs text-gray-600">Analytics</span>
                  </div>
                </div>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
