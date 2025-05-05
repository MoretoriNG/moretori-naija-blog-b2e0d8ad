
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";
import CategoryPage from "./pages/CategoryPage";
import AboutPage from "./pages/AboutPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import LoginPage from "./pages/admin/LoginPage";
import NewPostPage from "./pages/admin/NewPostPage";
import EditPostPage from "./pages/admin/EditPostPage";
import MediaLibraryPage from "./pages/admin/MediaLibraryPage";
import SettingsPage from "./pages/admin/SettingsPage";
import NotFound from "./pages/NotFound";
import { SidebarProvider } from "@/components/ui/sidebar";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <SidebarProvider>
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/post/:slug" element={<PostPage />} />
              <Route path="/category/:slug" element={<CategoryPage />} />
              <Route path="/about" element={<AboutPage />} />
            </Route>
            
            {/* Admin login route */}
            <Route path="/admin/login" element={<LoginPage />} />
            
            {/* Protected admin routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="posts/new" element={<NewPostPage />} />
              <Route path="posts/edit/:id" element={<EditPostPage />} />
              <Route path="media" element={<MediaLibraryPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
            
            {/* 404 route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </SidebarProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
