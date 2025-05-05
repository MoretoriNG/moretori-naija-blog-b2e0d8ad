
import { useState } from "react";
import { MediaItem } from "@/types/media";
import { toast } from "sonner";

// Sample media items for demonstration
const sampleImages: MediaItem[] = [
  {
    id: "img1",
    url: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=500&q=80",
    name: "laptop-coding.jpg",
    type: "image",
    uploadedAt: new Date("2025-04-30").toISOString(),
  },
  {
    id: "img2",
    url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=500&q=80",
    name: "developer-desk.jpg",
    type: "image",
    uploadedAt: new Date("2025-05-01").toISOString(),
  },
  {
    id: "img3",
    url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=500&q=80",
    name: "code-screen.jpg",
    type: "image",
    uploadedAt: new Date("2025-05-02").toISOString(),
  },
  {
    id: "img4",
    url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=500&q=80",
    name: "landscape.jpg",
    type: "image",
    uploadedAt: new Date("2025-05-03").toISOString(),
  },
];

const sampleVideos: MediaItem[] = [
  {
    id: "vid1",
    url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    name: "sample-video-1.mp4",
    type: "video",
    uploadedAt: new Date("2025-05-01").toISOString(),
  },
  {
    id: "vid2",
    url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_2mb.mp4",
    name: "sample-video-2.mp4",
    type: "video",
    uploadedAt: new Date("2025-05-03").toISOString(),
  },
];

export function useMediaLibrary() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([...sampleImages, ...sampleVideos]);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  
  const filteredItems = mediaItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchesTab = activeTab === "all" || item.type === activeTab;
    return matchesSearch && matchesTab;
  });

  const handleUpload = (files: FileList | null) => {
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
          type: isVideo ? "video" : "image",
          uploadedAt: new Date().toISOString(),
        };
        
        setMediaItems((prev) => [newItem, ...prev]);
      }
    });
    
    toast.success(`${files.length} file(s) uploaded successfully`);
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

  return {
    mediaItems,
    filteredItems,
    search,
    setSearch,
    activeTab,
    setActiveTab,
    handleUpload,
    handleDelete,
    formatDate,
  };
}
