
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CardContent, CardFooter } from "@/components/ui/card";
import { AlertCircle, UserPlus, Mail, Lock, User } from "lucide-react";

interface RegisterFormProps {
  onRegister: (email: string, password: string, userData: any) => Promise<void>;
  onSuccess: (email: string) => void;
}

export function RegisterForm({ onRegister, onSuccess }: RegisterFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }
    
    setIsLoading(true);

    try {
      await onRegister(email, password, {
        username: username || email.split('@')[0],
        full_name: username || email.split('@')[0]
      });
      
      // Show success message and switch to login tab
      setRegistrationSuccess(true);
      setTimeout(() => {
        onSuccess(email);
        setRegistrationSuccess(false);
      }, 3000);
    } catch (error) {
      setError("Registration failed. The email may already be in use.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardContent className="space-y-4">
        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded-md flex items-center text-sm">
            <AlertCircle className="h-4 w-4 mr-2" />
            {error}
          </div>
        )}
        
        {registrationSuccess && (
          <div className="bg-green-50 text-green-700 p-3 rounded-md flex items-center text-sm">
            <AlertCircle className="h-4 w-4 mr-2" />
            Registration successful! You can now login with your credentials.
          </div>
        )}
        
        <div className="space-y-2">
          <Label htmlFor="username">Username (optional)</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="username"
              type="text"
              className="pl-10"
              placeholder="yourname"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="register-email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="register-email"
              type="email"
              className="pl-10"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="register-password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="register-password"
              type="password"
              className="pl-10"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>
          <p className="text-xs text-gray-500">Must be at least 6 characters long</p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="confirm-password">Confirm Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="confirm-password"
              type="password"
              className="pl-10"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="animate-pulse mr-2">•••</span>
              Creating Account
            </>
          ) : (
            <>
              <UserPlus className="h-4 w-4 mr-2" />
              Create Account
            </>
          )}
        </Button>
      </CardFooter>
    </form>
  );
}
