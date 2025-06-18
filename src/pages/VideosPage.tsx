
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Clock, Eye, ThumbsUp, Share, BookmarkPlus } from "lucide-react";
import AdBanner from "@/components/blog/advertising/AdBanner";

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
}

const videos: Video[] = [
  {
    id: '1',
    title: 'The Future of Technology in Nigeria',
    synopsis: 'Exploring emerging technologies and their impact on Nigerian society, from AI to blockchain innovations.',
    duration: '12:45',
    views: '2.3M',
    likes: '45K',
    thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    category: 'Technology',
    uploadDate: '2 days ago',
    author: 'Tech Nigeria'
  },
  {
    id: '2',
    title: 'Nigerian Entertainment Industry Growth',
    synopsis: 'A deep dive into Nollywood\'s evolution and the rise of Nigerian music on the global stage.',
    duration: '15:30',
    views: '1.8M',
    likes: '32K',
    thumbnail: 'https://images.unsplash.com/photo-1489849292274-068b6bd688b0?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    category: 'Entertainment',
    uploadDate: '4 days ago',
    author: 'Nollywood Today'
  },
  {
    id: '3',
    title: 'Health and Wellness in Modern Nigeria',
    synopsis: 'Discussing healthcare innovations and wellness trends shaping the future of Nigerian health systems.',
    duration: '18:20',
    views: '980K',
    likes: '28K',
    thumbnail: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    category: 'Health',
    uploadDate: '1 week ago',
    author: 'Health Nigeria'
  },
  {
    id: '4',
    title: 'Business Opportunities in Lagos',
    synopsis: 'Exploring the booming business scene in Lagos and opportunities for entrepreneurs across Nigeria.',
    duration: '14:15',
    views: '1.2M',
    likes: '35K',
    thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    category: 'Business',
    uploadDate: '3 days ago',
    author: 'Business Lagos'
  },
  {
    id: '5',
    title: 'Nigerian Sports: Rising Stars',
    synopsis: 'Celebrating Nigerian athletes making waves internationally and the future of sports in the country.',
    duration: '11:45',
    views: '750K',
    likes: '22K',
    thumbnail: 'https://images.unsplash.com/photo-1544275020-85dd6c3dcb8a?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    category: 'Sports',
    uploadDate: '5 days ago',
    author: 'Sports Nigeria'
  },
  {
    id: '6',
    title: 'Nigerian Fashion & Lifestyle Trends',
    synopsis: 'The latest in Nigerian fashion, lifestyle trends, and cultural expressions making global impact.',
    duration: '16:30',
    views: '1.5M',
    likes: '41K',
    thumbnail: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    category: 'Lifestyle',
    uploadDate: '1 day ago',
    author: 'Style Nigeria'
  },
  {
    id: '7',
    title: 'Breaking News: Economic Updates',
    synopsis: 'Latest economic developments and their impact on Nigerian citizens and businesses.',
    duration: '13:20',
    views: '2.1M',
    likes: '38K',
    thumbnail: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    category: 'News',
    uploadDate: '6 hours ago',
    author: 'Nigeria News'
  },
  {
    id: '8',
    title: 'Auto Industry in Nigeria',
    synopsis: 'The growing automotive sector in Nigeria, from local manufacturing to electric vehicle adoption.',
    duration: '19:45',
    views: '890K',
    likes: '26K',
    thumbnail: 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    category: 'Auto',
    uploadDate: '1 week ago',
    author: 'Auto Nigeria'
  },
  {
    id: '9',
    title: 'Cultural Heritage and Traditions',
    synopsis: 'Preserving Nigerian cultural heritage while embracing modernity in the 21st century.',
    duration: '22:10',
    views: '1.3M',
    likes: '44K',
    thumbnail: 'https://images.unsplash.com/photo-1529258283598-8d6fe60b27f4?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    category: 'Culture',
    uploadDate: '3 days ago',
    author: 'Culture Nigeria'
  },
  {
    id: '10',
    title: 'Education Revolution in Nigeria',
    synopsis: 'How technology and innovation are transforming education across Nigeria.',
    duration: '17:55',
    views: '1.1M',
    likes: '33K',
    thumbnail: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    category: 'Education',
    uploadDate: '2 days ago',
    author: 'Edu Nigeria'
  }
];

export default function VideosPage() {
  const [currentVideo, setCurrentVideo] = useState(videos[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Technology: 'bg-blue-100 text-blue-800',
      Entertainment: 'bg-purple-100 text-purple-800',
      Health: 'bg-green-100 text-green-800',
      Business: 'bg-indigo-100 text-indigo-800',
      Sports: 'bg-orange-100 text-orange-800',
      Lifestyle: 'bg-pink-100 text-pink-800',
      News: 'bg-red-100 text-red-800',
      Auto: 'bg-yellow-100 text-yellow-800',
      Culture: 'bg-emerald-100 text-emerald-800',
      Education: 'bg-cyan-100 text-cyan-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 text-white">
        <div className="container py-12">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-black mb-4">
              Video <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Hub</span>
            </h1>
            <p className="text-xl text-white/90 mb-6">
              Discover engaging video content covering technology, entertainment, news, and more from Nigeria and beyond.
            </p>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="bg-white/20 text-white">
                {videos.length} Videos Available
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white">
                HD Quality
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Ad Banner */}
      <div className="container py-4">
        <AdBanner size="large" />
      </div>

      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Video Player */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden shadow-2xl">
              <div className="relative aspect-video bg-black">
                {!isPlaying ? (
                  <div className="relative group cursor-pointer" onClick={() => setIsPlaying(true)}>
                    <img 
                      src={currentVideo.thumbnail}
                      alt={currentVideo.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                      <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="w-8 h-8 text-gray-800 ml-1" />
                      </div>
                    </div>
                    <div className="absolute bottom-4 right-4">
                      <Badge className="bg-black/70 text-white">
                        <Clock className="w-3 h-3 mr-1" />
                        {currentVideo.duration}
                      </Badge>
                    </div>
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
              
              <CardContent className="p-6">
                <Badge className={getCategoryColor(currentVideo.category)} variant="secondary">
                  {currentVideo.category}
                </Badge>
                <h1 className="text-2xl font-bold mt-3 mb-2">{currentVideo.title}</h1>
                <p className="text-gray-600 mb-4">{currentVideo.synopsis}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {currentVideo.views} views
                    </div>
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="w-4 h-4" />
                      {currentVideo.likes}
                    </div>
                    <span>{currentVideo.uploadDate}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Share className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                    <Button variant="outline" size="sm">
                      <BookmarkPlus className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 pt-4 border-t">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    {currentVideo.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold">{currentVideo.author}</p>
                    <p className="text-sm text-gray-500">Content Creator</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Video Playlist */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg">
              <CardContent className="p-4">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Play className="w-5 h-5 text-blue-600" />
                  Video Playlist
                </h2>
                <div className="space-y-3 max-h-[600px] overflow-y-auto">
                  {videos.map((video) => (
                    <div
                      key={video.id}
                      className={`p-3 rounded-lg cursor-pointer transition-all hover:shadow-md ${
                        currentVideo.id === video.id 
                          ? 'bg-blue-50 border-2 border-blue-200' 
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                      onClick={() => {
                        setCurrentVideo(video);
                        setIsPlaying(false);
                      }}
                    >
                      <div className="flex gap-3">
                        <div className="relative flex-shrink-0">
                          <img 
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-24 h-16 object-cover rounded"
                          />
                          <div className="absolute bottom-1 right-1">
                            <Badge className="bg-black/70 text-white text-xs px-1">
                              {video.duration}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm line-clamp-2 mb-1">
                            {video.title}
                          </h3>
                          <p className="text-xs text-gray-500 line-clamp-2 mb-2">
                            {video.synopsis}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-gray-400">
                            <span>{video.views} views</span>
                            <span>•</span>
                            <span>{video.uploadDate}</span>
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
