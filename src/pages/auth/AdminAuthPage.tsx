
import { useState } from 'react';
import { motion } from 'framer-motion';
import { LoginForm } from '@/components/auth/LoginForm';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Shield, Settings, Users, ArrowLeft, FileText, BarChart } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';

export default function AdminAuthPage() {
  const [activeTab, setActiveTab] = useState('login');
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    await signIn(email, password);
    navigate('/admin');
  };

  const handleRegister = async (email: string, password: string, userData: any) => {
    // Add admin role to metadata
    const adminDataWithRole = {
      ...userData,
      role: 'admin'
    };
    await signUp(email, password, adminDataWithRole);
  };

  const handleRegistrationSuccess = (email: string) => {
    setActiveTab('login');
    toast.success('Admin account created! You can now login.');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1974&auto=format&fit=crop')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Animated background overlay */}
      <motion.div
        className="absolute inset-0 opacity-90"
        animate={{
          background: [
            'linear-gradient(45deg, #1e3a8a 0%, #3730a3 100%)',
            'linear-gradient(45deg, #7c3aed 0%, #2563eb 100%)',
            'linear-gradient(45deg, #059669 0%, #0891b2 100%)',
            'linear-gradient(45deg, #1e3a8a 0%, #3730a3 100%)'
          ]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Back to Home Button */}
      <motion.div
        className="absolute top-6 left-6 z-20"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Button 
          variant="outline" 
          size="sm" 
          className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
          asChild
        >
          <Link to="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </Button>
      </motion.div>

      {/* User Login Link */}
      <motion.div
        className="absolute top-6 right-6 z-20"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Button 
          variant="outline" 
          size="sm" 
          className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
          asChild
        >
          <Link to="/auth/user">
            User Login
          </Link>
        </Button>
      </motion.div>

      <motion.div
        className="w-full max-w-md relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Admin Portal</h1>
          <p className="text-white/80">Manage content, users, and platform settings</p>
        </div>

        <Card className="backdrop-blur-md bg-white/90 border-white/20 shadow-2xl">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold text-gray-800">
              {activeTab === 'login' ? 'Admin Login' : 'Create Admin Account'}
            </CardTitle>
            <CardDescription className="text-gray-600">
              {activeTab === 'login'
                ? 'Access the admin dashboard'
                : 'Set up your administrator account'
              }
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger 
                  value="login" 
                  className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger 
                  value="register"
                  className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
                >
                  Register
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="login" className="space-y-4">
                <LoginForm onLogin={handleLogin} />
              </TabsContent>
              
              <TabsContent value="register" className="space-y-4">
                <RegisterForm 
                  onRegister={handleRegister} 
                  onSuccess={handleRegistrationSuccess}
                />
              </TabsContent>
            </Tabs>
            
            {/* Admin Features section */}
            <div className="border-t pt-6">
              <h4 className="text-sm font-semibold text-gray-800 mb-3 text-center">Admin Capabilities</h4>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="flex flex-col items-center space-y-2">
                  <FileText className="w-5 h-5 text-orange-500" />
                  <span className="text-xs text-gray-600">Content Management</span>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <Users className="w-5 h-5 text-orange-500" />
                  <span className="text-xs text-gray-600">User Management</span>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <BarChart className="w-5 h-5 text-orange-500" />
                  <span className="text-xs text-gray-600">Analytics</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
