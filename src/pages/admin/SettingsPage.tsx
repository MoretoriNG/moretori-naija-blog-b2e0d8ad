
import { useState } from "react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Save } from "lucide-react";

export default function SettingsPage() {
  // Blog settings
  const [blogName, setBlogName] = useState("Moretori Naija");
  const [blogDescription, setBlogDescription] = useState("Providing the latest news and updates from Nigeria and beyond");
  const [postsPerPage, setPostsPerPage] = useState("6");
  const [featuredPostCount, setFeaturedPostCount] = useState("4");
  
  // User settings
  const [name, setName] = useState("Admin User");
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [commentNotifications, setCommentNotifications] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);
  
  const handleSaveSettings = (tab: string) => {
    // Password validation
    if (tab === "user" && password) {
      if (password !== confirmPassword) {
        toast.error("Passwords don't match");
        return;
      }
      
      if (password.length < 8) {
        toast.error("Password must be at least 8 characters");
        return;
      }
    }
    
    // In a real app, this would save to a database
    toast.success(`${tab.charAt(0).toUpperCase() + tab.slice(1)} settings saved successfully`);
  };
  
  return (
    <div className="container py-8">
      <AdminHeader
        title="Settings"
        description="Configure your blog settings"
      />
      
      <Tabs defaultValue="blog" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="blog">Blog Settings</TabsTrigger>
          <TabsTrigger value="user">User Settings</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        
        <TabsContent value="blog">
          <Card>
            <CardHeader>
              <CardTitle>Blog Configuration</CardTitle>
              <CardDescription>
                Update your blog information and display settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="blog-name">Blog Name</Label>
                  <Input
                    id="blog-name"
                    value={blogName}
                    onChange={(e) => setBlogName(e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="blog-description">Blog Description</Label>
                  <Textarea
                    id="blog-description"
                    value={blogDescription}
                    onChange={(e) => setBlogDescription(e.target.value)}
                    rows={3}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="posts-per-page">Posts Per Page</Label>
                    <Input
                      id="posts-per-page"
                      type="number"
                      value={postsPerPage}
                      onChange={(e) => setPostsPerPage(e.target.value)}
                      min="1"
                      max="20"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="featured-count">Featured Posts Count</Label>
                    <Input
                      id="featured-count"
                      type="number"
                      value={featuredPostCount}
                      onChange={(e) => setFeaturedPostCount(e.target.value)}
                      min="1"
                      max="10"
                    />
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button 
                    onClick={() => handleSaveSettings("blog")}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Blog Settings
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="user">
          <Card>
            <CardHeader>
              <CardTitle>User Profile</CardTitle>
              <CardDescription>
                Manage your account information and password
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                
                <div className="pt-4 border-t">
                  <h3 className="text-lg font-medium mb-4">Change Password</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="password">New Password</Label>
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button 
                    onClick={() => handleSaveSettings("user")}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save User Settings
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Configure how and when you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive emails about new comments and messages
                    </p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="comment-notifications">Comment Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified when someone comments on your posts
                    </p>
                  </div>
                  <Switch
                    id="comment-notifications"
                    checked={commentNotifications}
                    onCheckedChange={setCommentNotifications}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="weekly-digest">Weekly Digest</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive a weekly summary of blog performance
                    </p>
                  </div>
                  <Switch
                    id="weekly-digest"
                    checked={weeklyDigest}
                    onCheckedChange={setWeeklyDigest}
                  />
                </div>
                
                <div className="pt-4">
                  <Button 
                    onClick={() => handleSaveSettings("notifications")}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Notification Settings
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
