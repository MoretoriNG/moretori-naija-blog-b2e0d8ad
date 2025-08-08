
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/contexts/AuthContext";
import MainLayout from "@/layouts/MainLayout";
import AdminLayout from "@/layouts/AdminLayout";
import HomePage from "@/pages/HomePage";
import CategoryPage from "@/pages/CategoryPage";
import PostPage from "@/pages/PostPage";
import VideosPage from "@/pages/VideosPage";
import AboutPage from "@/pages/AboutPage";
import PrivacyPage from "@/pages/PrivacyPage";
import TermsPage from "@/pages/TermsPage";
import ContactPage from "@/pages/ContactPage";
import NotFound from "@/pages/NotFound";
import UserAuthPage from "@/pages/auth/UserAuthPage";
import AdminAuthPage from "@/pages/auth/AdminAuthPage";
import UserProfilePage from "@/pages/UserProfilePage";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import NewPostPage from "@/pages/admin/NewPostPage";
import EditPostPage from "@/pages/admin/EditPostPage";
import MediaLibraryPage from "@/pages/admin/MediaLibraryPage";
import SettingsPage from "@/pages/admin/SettingsPage";
import TechPage from "@/pages/category/TechPage";
import AutoPage from "@/pages/category/AutoPage";
import HealthPage from "@/pages/category/HealthPage";
import EntertainmentPage from "@/pages/category/EntertainmentPage";
import NewsPage from "@/pages/category/NewsPage";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import "./App.css";
import BusinessDirectoryPage from "@/pages/BusinessDirectoryPage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <Routes>
            {/* Auth Routes */}
            <Route path="/auth/user" element={<UserAuthPage />} />
            <Route path="/auth/admin" element={<AdminAuthPage />} />
            {/* Legacy auth route redirect */}
            <Route path="/auth" element={<UserAuthPage />} />
            
            {/* Main Layout Routes */}
            <Route path="/" element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path="category/:category" element={<CategoryPage />} />
              <Route path="category/tech" element={<TechPage />} />
              <Route path="category/auto" element={<AutoPage />} />
              <Route path="category/health" element={<HealthPage />} />
              <Route path="category/entertainment" element={<EntertainmentPage />} />
              <Route path="category/news" element={<NewsPage />} />
              <Route path="post/:slug" element={<PostPage />} />
              <Route path="videos" element={<VideosPage />} />
              <Route path="business-directory" element={<BusinessDirectoryPage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="privacy" element={<PrivacyPage />} />
              <Route path="terms" element={<TermsPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="profile" element={<UserProfilePage />} />
            </Route>
            
            {/* Admin Layout Routes */}
            <Route 
              path="/admin" 
              element={<ProtectedRoute redirectTo="/auth/admin" />}
            >
              <Route path="" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="posts/new" element={<NewPostPage />} />
                <Route path="posts/:id/edit" element={<EditPostPage />} />
                <Route path="media" element={<MediaLibraryPage />} />
                <Route path="settings" element={<SettingsPage />} />
              </Route>
            </Route>
            
            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
