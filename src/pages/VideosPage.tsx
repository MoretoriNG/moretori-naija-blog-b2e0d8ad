import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Play, Clock, Eye, ThumbsUp, Share, BookmarkPlus, Search, Filter, Grid, List, Heart, Star } from "lucide-react";
import AdBanner from "@/components/blog/advertising/AdBanner";
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

  const toggleFavorite = (videoId: string) => {
    setFavorites(prev => 
      prev.includes(videoId) 
        ? prev.filter(id => id !== videoId)
        : [...prev, videoId]
    );
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Enhanced Header Section */}
      <div className="relative bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        </div>
        <div className="relative container py-16">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-black mb-6">
              Video <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Hub</span>
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Discover engaging video content that inspires, informs, and entertains. 
              From cutting-edge technology to vibrant culture, explore Nigeria and beyond.
            </p>
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30 px-4 py-2">
                <Play className="w-4 h-4 mr-2" />
                {videos.length} Videos Available
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30 px-4 py-2">
                <Eye className="w-4 h-4 mr-2" />
                HD Quality
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30 px-4 py-2">
                <Star className="w-4 h-4 mr-2" />
                Premium Content
              </Badge>
            </div>
            
            {/* Enhanced Search and Filters */}
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search videos, topics, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/90 backdrop-blur-sm border-white/20 h-12"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                <Button
                  variant={viewMode === 'grid' ? 'secondary' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="bg-white/20 border-white/30 text-white hover:bg-white/30"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'secondary' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="bg-white/20 border-white/30 text-white hover:bg-white/30"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

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

      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Enhanced Main Video Player */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden shadow-2xl bg-gradient-to-br from-white to-gray-50 border-0">
              <div className="relative aspect-video bg-black rounded-t-lg overflow-hidden">
                {!isPlaying ? (
                  <div className="relative group cursor-pointer" onClick={() => setIsPlaying(true)}>
                    <img 
                      src={currentVideo.thumbnail}
                      alt={currentVideo.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 flex items-center justify-center group-hover:bg-black/70 transition-all duration-300">
                      <div className="w-20 h-20 bg-white/95 rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-2xl">
                        <Play className="w-8 h-8 text-gray-800 ml-1" />
                      </div>
                    </div>
                    <div className="absolute bottom-4 right-4">
                      <Badge className="bg-black/80 text-white border-0 px-3 py-1">
                        <Clock className="w-3 h-3 mr-1" />
                        {currentVideo.duration}
                      </Badge>
                    </div>
                    {currentVideo.featured && (
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 px-3 py-1">
                          <Star className="w-3 h-3 mr-1" />
                          Featured
                        </Badge>
                      </div>
                    )}
                  </div>
                ) : (
                  <iframe
                    src={currentVideo.videoUrl}
                    title={currentVideo.title}
                    className="w-full h-full"
                    allowFullScreen
                  />
                )}
              </div>
              
              <CardContent className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <Badge className={cn(getCategoryColor(currentVideo.category), "border")} variant="secondary">
                    {currentVideo.category}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleFavorite(currentVideo.id)}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <Heart className={cn("w-4 h-4", favorites.includes(currentVideo.id) && "fill-red-500 text-red-500")} />
                  </Button>
                </div>
                
                <h1 className="text-3xl font-bold mb-3 text-gray-900 leading-tight">{currentVideo.title}</h1>
                <p className="text-gray-600 mb-6 leading-relaxed text-lg">{currentVideo.synopsis}</p>
                
                <div className="flex items-center justify-between mb-6 pb-6 border-b">
                  <div className="flex items-center gap-6 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      <span className="font-medium">{currentVideo.views} views</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ThumbsUp className="w-4 h-4" />
                      <span className="font-medium">{currentVideo.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {renderStars(currentVideo.rating)}
                      <span className="ml-1 font-medium">{currentVideo.rating}</span>
                    </div>
                    <span>{currentVideo.uploadDate}</span>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" size="sm" className="hover:bg-blue-50 hover:border-blue-300">
                      <Share className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                    <Button variant="outline" size="sm" className="hover:bg-green-50 hover:border-green-300">
                      <BookmarkPlus className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 pt-2">
                  <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {currentVideo.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-lg text-gray-900">{currentVideo.author}</p>
                    <p className="text-sm text-gray-500">Content Creator • Verified</p>
                  </div>
                </div>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-6">
                  {currentVideo.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Video Playlist */}
          <div className="lg:col-span-1">
            <Card className="shadow-xl bg-gradient-to-br from-white to-gray-50 border-0">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Play className="w-4 h-4 text-white" />
                  </div>
                  Video Playlist
                </h2>
                <div className="space-y-4 max-h-[700px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                  {filteredVideos.map((video) => (
                    <div
                      key={video.id}
                      className={cn(
                        "p-4 rounded-xl cursor-pointer transition-all duration-300 hover:shadow-lg group",
                        currentVideo.id === video.id 
                          ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 shadow-md' 
                          : 'bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300'
                      )}
                      onClick={() => {
                        setCurrentVideo(video);
                        setIsPlaying(false);
                      }}
                    >
                      <div className="flex gap-4">
                        <div className="relative flex-shrink-0">
                          <img 
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-28 h-20 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute bottom-1 right-1">
                            <Badge className="bg-black/80 text-white text-xs px-2 py-0.5">
                              {video.duration}
                            </Badge>
                          </div>
                          {video.featured && (
                            <div className="absolute top-1 left-1">
                              <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-sm line-clamp-2 mb-2 text-gray-900 group-hover:text-blue-600 transition-colors">
                            {video.title}
                          </h3>
                          <p className="text-xs text-gray-600 line-clamp-2 mb-3 leading-relaxed">
                            {video.synopsis}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 text-xs text-gray-400">
                              <span>{video.views} views</span>
                              <span>•</span>
                              <span>{video.uploadDate}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              {renderStars(video.rating)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
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
