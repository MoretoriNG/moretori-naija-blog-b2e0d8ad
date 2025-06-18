
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Post, PostCategory } from '@/types/blog';
import { Play, Clock, TrendingUp, Shuffle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

interface CategoryPlaylistProps {
  playlists: {[key: string]: Post[]};
}

export function CategoryPlaylist({ playlists }: CategoryPlaylistProps) {
  const [activeCategory, setActiveCategory] = useState<string>('tech');
  const categories = Object.keys(playlists);
  
  const getCategoryColor = (category: string) => {
    const colors: {[key: string]: string} = {
      tech: 'from-blue-500 to-cyan-500',
      health: 'from-green-500 to-emerald-500',
      entertainment: 'from-purple-500 to-pink-500',
      business: 'from-indigo-500 to-blue-500',
      sports: 'from-orange-500 to-red-500',
      lifestyle: 'from-pink-500 to-rose-500'
    };
    return colors[category] || 'from-gray-500 to-gray-600';
  };

  return (
    <div className="h-full flex flex-col p-4">
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-5 h-5 text-orange-500" />
          <h3 className="text-white font-bold text-lg">Trending Playlists</h3>
        </div>
        
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-1">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveCategory(category)}
              className={`text-xs capitalize ${
                activeCategory === category 
                  ? `bg-gradient-to-r ${getCategoryColor(category)} text-white border-0` 
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Playlist Content */}
      <ScrollArea className="flex-1">
        <div className="space-y-3">
          {playlists[activeCategory]?.map((post, index) => (
            <Link 
              key={post.id} 
              to={`/post/${post.slug}`}
              className="block group hover:bg-white/5 rounded-lg p-2 transition-all duration-200"
            >
              <div className="flex items-start gap-3">
                <div className="relative flex-shrink-0">
                  <img 
                    src={post.coverImage} 
                    alt={post.title}
                    className="w-12 h-12 rounded object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 rounded flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="w-4 h-4 text-white" />
                  </div>
                  <div className="absolute -top-1 -left-1 w-5 h-5 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{index + 1}</span>
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="text-white text-sm font-medium line-clamp-2 group-hover:text-orange-300 transition-colors">
                    {post.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="text-xs bg-white/10 text-gray-300 border-0">
                      {post.category}
                    </Badge>
                    <div className="flex items-center text-gray-400 text-xs">
                      <Clock className="w-3 h-3 mr-1" />
                      <span>5 min</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </ScrollArea>

      {/* Footer Actions */}
      <div className="mt-4 pt-4 border-t border-gray-800">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full bg-white/5 border-white/10 text-white hover:bg-white/10"
        >
          <Shuffle className="w-4 h-4 mr-2" />
          Shuffle Play
        </Button>
      </div>
    </div>
  );
}
