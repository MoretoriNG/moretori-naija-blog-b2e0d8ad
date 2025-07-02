import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import AdBanner from "@/components/blog/advertising/AdBanner";
import { cn } from "@/lib/utils";
import { VideoPlayer } from "@/components/videos/VideoPlayer";
import { VideoPlaylist } from "@/components/videos/VideoPlaylist";
import { VideoHeader } from "@/components/videos/VideoHeader";

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

const videos: Video[] = [
  {
    id: '1',
    title: 'The Future of Technology in Nigeria',
    synopsis: 'Exploring emerging technologies and their impact on Nigerian society, from AI to blockchain innovations that are reshaping our digital landscape.',
    duration: '12:45',
    views: '2.3M',
    likes: '45K',
    thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    category: 'Technology',
    uploadDate: '2 days ago',
    author: 'Tech Nigeria',
    rating: 4.8,
    featured: true,
    tags: ['AI', 'Blockchain', 'Innovation']
  },
  {
    id: '2',
    title: 'Nigerian Entertainment Industry Growth',
    synopsis: 'A deep dive into Nollywood\'s evolution and the rise of Nigerian music on the global stage, showcasing our cultural impact worldwide.',
    duration: '15:30',
    views: '1.8M',
    likes: '32K',
    thumbnail: 'https://images.unsplash.com/photo-1489849292274-068b6bd688b0?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    category: 'Entertainment',
    uploadDate: '4 days ago',
    author: 'Nollywood Today',
    rating: 4.6,
    featured: true,
    tags: ['Nollywood', 'Music', 'Culture']
  },
  {
    id: '3',
    title: 'Health and Wellness in Modern Nigeria',
    synopsis: 'Discussing healthcare innovations and wellness trends shaping the future of Nigerian health systems and personal well-being.',
    duration: '18:20',
    views: '980K',
    likes: '28K',
    thumbnail: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    category: 'Health',
    uploadDate: '1 week ago',
    author: 'Health Nigeria',
    rating: 4.7,
    featured: false,
    tags: ['Healthcare', 'Wellness', 'Innovation']
  }
];

export default function VideosPage() {
  const [currentVideo, setCurrentVideo] = useState(videos[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filteredVideos, setFilteredVideos] = useState(videos);
  const [favorites, setFavorites] = useState<string[]>([]);

  const categories = ['All', 'Technology', 'Entertainment', 'Health', 'Business', 'Sports', 'Lifestyle', 'News', 'Auto', 'Culture', 'Education'];

  useEffect(() => {
    let filtered = videos;
    
    if (searchTerm) {
      filtered = filtered.filter(video => 
        video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.synopsis.toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(video => video.category === selectedCategory);
    }
    
    setFilteredVideos(filtered);
  }, [searchTerm, selectedCategory]);

  const toggleFavorite = (videoId: string) => {
    setFavorites(prev => 
      prev.includes(videoId) 
        ? prev.filter(id => id !== videoId)
        : [...prev, videoId]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Enhanced Header Section */}
      <VideoHeader 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        videoCount={videos.length}
      />

      {/* Category Filter */}
      <div className="bg-white/70 backdrop-blur-sm border-b sticky top-0 z-20">
        <div className="container py-4">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "whitespace-nowrap transition-all duration-200",
                  selectedCategory === category
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                    : "hover:bg-gray-100"
                )}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Ad Banner */}
      <div className="container py-6">
        <AdBanner size="large" />
      </div>

      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Enhanced Main Video Player */}
          <div className="lg:col-span-2">
            <VideoPlayer 
              video={currentVideo}
              onFavoriteToggle={toggleFavorite}
              isFavorite={favorites.includes(currentVideo.id)}
            />
          </div>

          {/* Enhanced Video Playlist */}
          <div className="lg:col-span-1">
            <VideoPlaylist 
              videos={filteredVideos}
              currentVideo={currentVideo}
              onVideoSelect={(video) => {
                setCurrentVideo(video);
              }}
            />
          </div>
        </div>
      </div>

      {/* Bottom Ad Banner */}
      <div className="container pb-8">
        <AdBanner size="large" />
      </div>
    </div>
  );
}
