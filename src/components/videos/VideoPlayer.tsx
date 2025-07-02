import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Clock, Eye, ThumbsUp, Share, BookmarkPlus, Star, Heart } from "lucide-react";
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

interface VideoPlayerProps {
  video: Video;
  onFavoriteToggle: (videoId: string) => void;
  isFavorite: boolean;
}

export function VideoPlayer({ video, onFavoriteToggle, isFavorite }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Technology: 'bg-blue-100 text-blue-800 border-blue-200',
      Entertainment: 'bg-purple-100 text-purple-800 border-purple-200',
      Health: 'bg-green-100 text-green-800 border-green-200',
      Business: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      Sports: 'bg-orange-100 text-orange-800 border-orange-200',
      Lifestyle: 'bg-pink-100 text-pink-800 border-pink-200',
      News: 'bg-red-100 text-red-800 border-red-200',
      Auto: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      Culture: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      Education: 'bg-cyan-100 text-cyan-800 border-cyan-200'
    };
    return colors[category] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={cn(
          "w-3 h-3",
          i < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        )} 
      />
    ));
  };

  return (
    <Card className="overflow-hidden shadow-2xl bg-gradient-to-br from-card to-muted/20 border-0 animate-scale-in">
      <div className="relative aspect-video bg-black rounded-t-lg overflow-hidden">
        {!isPlaying ? (
          <div className="relative group cursor-pointer" onClick={() => setIsPlaying(true)}>
            <img 
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 flex items-center justify-center group-hover:bg-black/90 transition-all duration-500">
              <div className="w-20 h-20 bg-white/95 rounded-full flex items-center justify-center group-hover:scale-125 transition-all duration-500 shadow-2xl backdrop-blur-sm">
                <Play className="w-8 h-8 text-gray-800 ml-1" />
              </div>
            </div>
            <div className="absolute bottom-4 right-4">
              <Badge className="bg-black/90 text-white border-0 px-3 py-2 backdrop-blur-sm">
                <Clock className="w-3 h-3 mr-1" />
                {video.duration}
              </Badge>
            </div>
            {video.featured && (
              <div className="absolute top-4 left-4">
                <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 px-3 py-2 animate-pulse">
                  <Star className="w-3 h-3 mr-1 fill-current" />
                  Featured
                </Badge>
              </div>
            )}
          </div>
        ) : (
          <iframe
            src={video.videoUrl}
            title={video.title}
            className="w-full h-full"
            allowFullScreen
          />
        )}
      </div>
      
      <CardContent className="p-8 space-y-6">
        <div className="flex items-start justify-between">
          <Badge className={cn(getCategoryColor(video.category), "border text-sm px-3 py-1")} variant="secondary">
            {video.category}
          </Badge>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onFavoriteToggle(video.id)}
            className="text-muted-foreground hover:text-red-500 transition-colors duration-300"
          >
            <Heart className={cn("w-5 h-5 transition-all duration-300", 
              isFavorite && "fill-red-500 text-red-500 scale-110"
            )} />
          </Button>
        </div>
        
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-foreground leading-tight hover:text-primary transition-colors duration-300">
            {video.title}
          </h1>
          <p className="text-muted-foreground leading-relaxed text-lg">
            {video.synopsis}
          </p>
        </div>
        
        <div className="flex items-center justify-between py-4 border-y border-border">
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2 hover:text-primary transition-colors">
              <Eye className="w-4 h-4" />
              <span className="font-medium">{video.views} views</span>
            </div>
            <div className="flex items-center gap-2 hover:text-primary transition-colors">
              <ThumbsUp className="w-4 h-4" />
              <span className="font-medium">{video.likes}</span>
            </div>
            <div className="flex items-center gap-1">
              {renderStars(video.rating)}
              <span className="ml-2 font-medium">{video.rating}</span>
            </div>
            <span className="text-xs bg-muted px-2 py-1 rounded-full">{video.uploadDate}</span>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" className="hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-all duration-300">
              <Share className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm" className="hover:bg-green-50 hover:border-green-300 hover:text-green-600 transition-all duration-300">
              <BookmarkPlus className="w-4 h-4 mr-2" />
              Save
            </Button>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
            {video.author.charAt(0)}
          </div>
          <div className="space-y-1">
            <p className="font-bold text-lg text-foreground">{video.author}</p>
            <p className="text-sm text-muted-foreground">Content Creator • Verified ✓</p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {video.tags.map((tag, index) => (
            <Badge 
              key={index} 
              variant="outline" 
              className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors duration-300 cursor-pointer"
            >
              #{tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}