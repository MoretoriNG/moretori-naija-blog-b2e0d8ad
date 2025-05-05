
export type MediaItem = {
  id: string;
  url: string;
  name: string;
  type: "image" | "video";
  uploadedAt: string;
  description?: string;
  fileSize?: number;
  dimensions?: {
    width: number;
    height: number;
  };
  duration?: number; // For videos, in seconds
  thumbnail?: string; // For videos
};
