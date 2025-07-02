import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface Video {
  id: string;
  title: string;
  synopsis: string;
  duration: string;
  views: string;
  likes: string;
  thumbnail: string;
  videoUrl: string;
  category: string;
  uploadDate: string;
  author: string;
  rating: number;
  featured: boolean;
  tags: string[];
}

interface VideoPlaylistProps {
  videos: Video[];
  currentVideo: Video;
  onVideoSelect: (video: Video) => void;
}

export function VideoPlaylist({ videos, currentVideo, onVideoSelect }: VideoPlaylistProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={cn(
          "w-3 h-3",
          i < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-muted"
        )} 
      />
    ));
  };

  return (
    <Card className="shadow-xl bg-gradient-to-br from-card to-muted/10 border-0 h-fit">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center shadow-lg">
            <Play className="w-5 h-5 text-primary-foreground" />
          </div>
          Video Playlist
          <Badge variant="secondary" className="ml-auto">
            {videos.length} videos
          </Badge>
        </h2>
        
        <div className="space-y-3 max-h-[800px] overflow-y-auto scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
          {videos.map((video, index) => (
            <div
              key={video.id}
              className={cn(
                "p-4 rounded-xl cursor-pointer transition-all duration-300 hover:shadow-lg group border",
                currentVideo.id === video.id 
                  ? 'bg-gradient-to-r from-primary/10 to-accent/10 border-primary/30 shadow-md scale-[1.02]' 
                  : 'bg-card hover:bg-muted/50 border-border hover:border-primary/20 hover:scale-[1.01]'
              )}
              onClick={() => onVideoSelect(video)}
            >
              <div className="flex gap-4">
                <div className="relative flex-shrink-0">
                  <img 
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-32 h-20 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 rounded-lg flex items-center justify-center">
                    <Play className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="absolute bottom-1 right-1">
                    <Badge className="bg-black/80 text-white text-xs px-2 py-1 backdrop-blur-sm">
                      {video.duration}
                    </Badge>
                  </div>
                  {video.featured && (
                    <div className="absolute top-1 left-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    </div>
                  )}
                  <div className="absolute top-1 right-1 bg-black/80 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                    #{index + 1}
                  </div>
                </div>
                
                <div className="flex-1 min-w-0 space-y-2">
                  <h3 className={cn(
                    "font-semibold text-sm line-clamp-2 transition-colors duration-300",
                    currentVideo.id === video.id ? "text-primary" : "text-foreground group-hover:text-primary"
                  )}>
                    {video.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {video.synopsis}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{video.views} views</span>
                      <span>•</span>
                      <span>{video.uploadDate}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {renderStars(video.rating)}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {video.author.charAt(0)}
                    </div>
                    <span className="text-xs text-muted-foreground">{video.author}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}