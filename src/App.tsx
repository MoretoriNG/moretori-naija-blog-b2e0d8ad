
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";
import CategoryPage from "./pages/CategoryPage";
import AboutPage from "./pages/AboutPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import NewPostPage from "./pages/admin/NewPostPage";
import EditPostPage from "./pages/admin/EditPostPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/post/:slug" element={<PostPage />} />
            <Route path="/category/:slug" element={<CategoryPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Route>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/posts/new" element={<NewPostPage />} />
          <Route path="/admin/posts/edit/:id" element={<EditPostPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
