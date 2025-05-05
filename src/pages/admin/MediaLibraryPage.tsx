
import { useRef } from "react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Image, Video } from "lucide-react";
import { MediaToolbar } from "@/components/admin/media/MediaToolbar";
import { MediaGrid } from "@/components/admin/media/MediaGrid";
import { useMediaLibrary } from "@/hooks/use-media-library";

export default function MediaLibraryPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { 
    filteredItems, 
    search, 
    setSearch, 
    activeTab, 
    setActiveTab, 
    handleUpload, 
    handleDelete, 
    formatDate
  } = useMediaLibrary();
  
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };
  
  return (
    <div className="container py-8">
      <AdminHeader
        title="Media Library"
        description="Manage your images and videos"
      />
      
      <div className="bg-card shadow rounded-lg border p-6">
        <MediaToolbar 
          search={search} 
          onSearchChange={setSearch} 
          onUploadClick={handleUploadClick} 
        />
        
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,video/*"
          className="hidden"
          onChange={(e) => handleUpload(e.target.files)}
        />
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Media</TabsTrigger>
            <TabsTrigger value="image">
              <Image className="h-4 w-4 mr-2" />
              Images
            </TabsTrigger>
            <TabsTrigger value="video">
              <Video className="h-4 w-4 mr-2" />
              Videos
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-0">
            <MediaGrid 
              items={filteredItems} 
              onDelete={handleDelete} 
              formatDate={formatDate} 
            />
          </TabsContent>
          
          <TabsContent value="image" className="mt-0">
            <MediaGrid 
              items={filteredItems} 
              onDelete={handleDelete} 
              formatDate={formatDate} 
            />
          </TabsContent>
          
          <TabsContent value="video" className="mt-0">
            <MediaGrid 
              items={filteredItems} 
              onDelete={handleDelete} 
              formatDate={formatDate} 
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
