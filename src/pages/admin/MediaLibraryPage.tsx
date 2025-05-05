import { useState } from "react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Image, Video, Trash2, Upload, Search } from "lucide-react";
import { toast } from "sonner";

// Define MediaItem type
type MediaItem = {
  id: string;
  url: string;
  name: string;
  type: "image" | "video";  // This enforces that type must be either "image" or "video"
  uploadedAt: string;
};

// Sample media items for demonstration
const sampleImages: MediaItem[] = [
  {
    id: "img1",
    url: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=500&q=80",
    name: "laptop-coding.jpg",
    type: "image", // Now explicitly typed as "image"
    uploadedAt: new Date("2025-04-30").toISOString(),
  },
  {
    id: "img2",
    url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=500&q=80",
    name: "developer-desk.jpg",
    type: "image", // Now explicitly typed as "image"
    uploadedAt: new Date("2025-05-01").toISOString(),
  },
  {
    id: "img3",
    url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=500&q=80",
    name: "code-screen.jpg",
    type: "image", // Now explicitly typed as "image"
    uploadedAt: new Date("2025-05-02").toISOString(),
  },
  {
    id: "img4",
    url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=500&q=80",
    name: "landscape.jpg",
    type: "image", // Now explicitly typed as "image"
    uploadedAt: new Date("2025-05-03").toISOString(),
  },
];

const sampleVideos: MediaItem[] = [
  {
    id: "vid1",
    url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    name: "sample-video-1.mp4",
    type: "video", // Now explicitly typed as "video"
    uploadedAt: new Date("2025-05-01").toISOString(),
  },
  {
    id: "vid2",
    url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_2mb.mp4",
    name: "sample-video-2.mp4",
    type: "video", // Now explicitly typed as "video"
    uploadedAt: new Date("2025-05-03").toISOString(),
  },
];

export default function MediaLibraryPage() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([...sampleImages, ...sampleVideos]);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  
  const filteredItems = mediaItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchesTab = activeTab === "all" || item.type === activeTab;
    return matchesSearch && matchesTab;
  });
  
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    // In a real app, this would upload to a server
    // Here we'll create local object URLs for preview
    Array.from(files).forEach((file) => {
      const isVideo = file.type.startsWith("video/");
      const isImage = file.type.startsWith("image/");
      
      if (isImage || isVideo) {
        const url = URL.createObjectURL(file);
        const newItem: MediaItem = {
          id: `new-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
          url,
          name: file.name,
          type: isVideo ? "video" : "image", // Now correctly typed as either "video" or "image"
          uploadedAt: new Date().toISOString(),
        };
        
        setMediaItems((prev) => [newItem, ...prev]);
      }
    });
    
    toast.success(`${files.length} file(s) uploaded successfully`);
    e.target.value = ""; // Reset the input
  };
  
  const handleDelete = (id: string) => {
    setMediaItems((prev) => prev.filter((item) => item.id !== id));
    toast.success("Media deleted successfully");
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };
  
  return (
    <div className="container py-8">
      <AdminHeader
        title="Media Library"
        description="Manage your images and videos"
      />
      
      <div className="bg-card shadow rounded-lg border p-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
          <div className="relative w-full sm:w-64 md:w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search media..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8"
            />
          </div>
          
          <div className="flex gap-2">
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => document.getElementById('file-upload')?.click()}>
              <Upload className="h-4 w-4 mr-2" />
              Upload
            </Button>
            <input
              id="file-upload"
              type="file"
              multiple
              accept="image/*,video/*"
              className="hidden"
              onChange={handleUpload}
            />
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Media</TabsTrigger>
            <TabsTrigger value="image">Images</TabsTrigger>
            <TabsTrigger value="video">Videos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-0">
            {renderMediaGrid(filteredItems, handleDelete, formatDate)}
          </TabsContent>
          
          <TabsContent value="image" className="mt-0">
            {renderMediaGrid(filteredItems, handleDelete, formatDate)}
          </TabsContent>
          
          <TabsContent value="video" className="mt-0">
            {renderMediaGrid(filteredItems, handleDelete, formatDate)}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function renderMediaGrid(items: MediaItem[], onDelete: (id: string) => void, formatDate: (date: string) => string) {
  if (items.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No media found. Upload some files to get started.
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {items.map((item) => (
        <div key={item.id} className="group relative bg-muted rounded-md overflow-hidden border">
          {item.type === "image" ? (
            <img
              src={item.url}
              alt={item.name}
              className="w-full h-32 object-cover"
            />
          ) : (
            <div className="w-full h-32 bg-black flex items-center justify-center">
              <Video className="h-8 w-8 text-gray-500" />
            </div>
          )}
          
          <div className="p-2">
            <p className="text-xs truncate font-medium">{item.name}</p>
            <p className="text-xs text-muted-foreground">{formatDate(item.uploadedAt)}</p>
          </div>
          
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-7 w-7"
            onClick={() => onDelete(item.id)}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      ))}
    </div>
  );
}
