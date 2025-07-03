
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, X } from "lucide-react";
import { toast } from "sonner";

interface MediaUploadProps {
  coverImage: string;
  setCoverImage: (image: string) => void;
  previewImage: string | null;
  setPreviewImage: (image: string | null) => void;
  video: string;
  setVideo: (video: string) => void;
  errors: any;
  setErrors: (errors: any) => void;
}

export function MediaUpload({
  coverImage, setCoverImage, previewImage, setPreviewImage,
  video, setVideo, errors, setErrors
}: MediaUploadProps) {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      setCoverImage(imageUrl);
      toast.success("Image uploaded successfully");
    }
  };
  
  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const videoUrl = URL.createObjectURL(file);
      setVideo(videoUrl);
      toast.success("Video uploaded successfully");
    }
  };
  
  const handleRemoveImage = () => {
    setCoverImage("");
    setPreviewImage(null);
    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="coverImage" className={errors.coverImage ? "text-destructive" : ""}>
          Cover Image {errors.coverImage && <span className="text-xs">({errors.coverImage})</span>}
        </Label>
        <div className="flex gap-2">
          <Input
            id="coverImageUrl"
            value={coverImage}
            onChange={(e) => {
              setCoverImage(e.target.value);
              setPreviewImage(e.target.value);
              if (errors.coverImage) setErrors({ ...errors, coverImage: undefined });
            }}
            placeholder="https://example.com/image.jpg"
            className={`flex-1 ${errors.coverImage ? "border-destructive" : ""}`}
          />
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => imageInputRef.current?.click()}
          >
            <Upload className="h-4 w-4 mr-2" />
            Browse
          </Button>
          <input
            ref={imageInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </div>
      </div>
      
      {previewImage && (
        <div className="relative">
          <img 
            src={previewImage} 
            alt="Cover preview" 
            className="w-full h-48 object-cover rounded-md" 
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 h-8 w-8"
            onClick={handleRemoveImage}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
      
      <div>
        <Label htmlFor="video">Video URL (optional)</Label>
        <div className="flex gap-2">
          <Input
            id="video"
            value={video}
            onChange={(e) => setVideo(e.target.value)}
            placeholder="https://example.com/video.mp4"
            className="flex-1"
          />
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => videoInputRef.current?.click()}
          >
            <Upload className="h-4 w-4 mr-2" />
            Browse
          </Button>
          <input
            ref={videoInputRef}
            type="file"
            accept="video/*"
            className="hidden"
            onChange={handleVideoUpload}
          />
        </div>
      </div>
      
      {video && video.startsWith("blob:") && (
        <div>
          <video controls className="w-full rounded-md">
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
}
