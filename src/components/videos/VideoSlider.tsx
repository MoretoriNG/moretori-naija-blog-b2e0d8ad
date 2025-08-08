
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Play, Clock, Eye, ChevronLeft, ChevronRight, PlayCircle, 
  Star, TrendingUp 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Video {
  id: string;
  title: string;
  synopsis: string;
  duration: string;
  views: string;
  thumbnail: string;
  category: string;
  featured: boolean;
}

const featuredVideos: Video[] = [
  {
    id: '1',
    title: 'The Future of Technology in Nigeria',
    synopsis: 'Exploring emerging technologies and their impact on Nigerian society.',
    duration: '12:45',
    views: '2.3M',
    thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=800&q=80',
    category: 'Technology',
    featured: true
  },
  {
    id: '2',
    title: 'Nigerian Entertainment Industry Growth',
    synopsis: 'A deep dive into Nollywood\'s evolution and the rise of Nigerian music.',
    duration: '15:30',
    views: '1.8M',
    thumbnail: 'https://images.unsplash.com/photo-1489849292274-068b6bd688b0?auto=format&fit=crop&w=800&q=80',
    category: 'Entertainment',
    featured: true
  },
  {
    id: '3',
    title: 'Health and Wellness in Modern Nigeria',
    synopsis: 'Healthcare innovations and wellness trends in Nigeria.',
    duration: '18:20',
    views: '980K',
    thumbnail: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=800&q=80',
    category: 'Health',
    featured: false
  },
  {
    id: '4',
    title: 'Nigerian Business Success Stories',
    synopsis: 'Inspiring stories of Nigerian entrepreneurs and business leaders.',
    duration: '22:15',
    views: '1.2M',
    thumbnail: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    category: 'Business',
    featured: true
  },
  {
    id: '5',
    title: 'Sports Culture in Nigeria',
    synopsis: 'The passion and culture of sports across Nigerian communities.',
    duration: '16:40',
    views: '850K',
    thumbnail: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80',
    category: 'Sports',
    featured: false
  }
];

export default function VideoSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredVideos.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredVideos.length) % featuredVideos.length);
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Technology: 'bg-blue-100 text-blue-800 border-blue-200',
      Entertainment: 'bg-purple-100 text-purple-800 border-purple-200',
      Health: 'bg-green-100 text-green-800 border-green-200',
      Business: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      Sports: 'bg-orange-100 text-orange-800 border-orange-200',
    };
    return colors[category] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white py-16">
      <div className="container px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-purple-600 rounded-full flex items-center justify-center">
              <PlayCircle className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-4xl font-bold">Video Hub</h2>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover engaging video content that inspires, informs, and entertains
          </p>
          <div className="flex items-center justify-center gap-4 mt-6">
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30 px-4 py-2">
              <TrendingUp className="w-4 h-4 mr-2" />
              Trending Content
            </Badge>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30 px-4 py-2">
              <Star className="w-4 h-4 mr-2" />
              HD Quality
            </Badge>
          </div>
        </div>

        {/* Video Slider */}
        <div className="relative max-w-6xl mx-auto">
          <div className="overflow-hidden rounded-2xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {featuredVideos.map((video, index) => (
                <div key={video.id} className="w-full flex-shrink-0 px-2">
                  <Card className="bg-white/10 backdrop-blur-md border-white/20 overflow-hidden hover:bg-white/15 transition-all duration-300">
                    <div className="relative">
                      <img 
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-64 md:h-80 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      
                      {/* Play Button */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 cursor-pointer group">
                          <Play className="w-8 h-8 text-white ml-1 group-hover:scale-110 transition-transform" />
                        </div>
                      </div>

                      {/* Duration & Featured Badge */}
                      <div className="absolute bottom-4 right-4">
                        <Badge className="bg-black/80 text-white border-0">
                          <Clock className="w-3 h-3 mr-1" />
                          {video.duration}
                        </Badge>
                      </div>
                      
                      {video.featured && (
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0">
                            <Star className="w-3 h-3 mr-1" />
                            Featured
                          </Badge>
                        </div>
                      )}
                    </div>
                    
                    <CardContent className="p-6">
                      <Badge className={cn(getCategoryColor(video.category), "border mb-3")} variant="secondary">
                        {video.category}
                      </Badge>
                      <h3 className="text-xl font-bold mb-2 text-white line-clamp-2">
                        {video.title}
                      </h3>
                      <p className="text-gray-300 mb-4 line-clamp-2">
                        {video.synopsis}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          <span>{video.views} views</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
            onClick={prevSlide}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
            onClick={nextSlide}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>

          {/* Slide Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {featuredVideos.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "w-3 h-3 rounded-full transition-all duration-300",
                  index === currentSlide 
                    ? "bg-white scale-125" 
                    : "bg-white/40 hover:bg-white/60"
                )}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Button 
            asChild
            size="lg"
            className="bg-gradient-to-r from-red-500 to-purple-600 hover:from-red-600 hover:to-purple-700 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Link to="/videos">
              <PlayCircle className="w-5 h-5 mr-2" />
              Watch All Videos
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
