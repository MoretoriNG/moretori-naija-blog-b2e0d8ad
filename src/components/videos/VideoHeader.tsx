import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Play, Eye, Star, Search, Grid, List } from "lucide-react";
import { cn } from "@/lib/utils";

interface VideoHeaderProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  videoCount: number;
}

export function VideoHeader({ 
  searchTerm, 
  onSearchChange, 
  viewMode, 
  onViewModeChange, 
  videoCount 
}: VideoHeaderProps) {
  return (
    <div className="relative bg-gradient-to-br from-primary via-accent to-primary text-primary-foreground overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 w-60 h-60 bg-white/5 rounded-full blur-2xl animate-ping"></div>
      </div>
      
      <div className="relative container py-20">
        <div className="max-w-4xl">
          <div className="animate-fade-in">
            <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tight">
              Video{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 animate-pulse">
                Hub
              </span>
            </h1>
            <p className="text-xl text-primary-foreground/90 mb-8 leading-relaxed max-w-3xl">
              Discover engaging video content that inspires, informs, and entertains. 
              From cutting-edge technology to vibrant culture, explore Nigeria and beyond.
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-4 mb-8 animate-scale-in">
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30 px-4 py-2 text-sm hover:bg-white/30 transition-colors">
              <Play className="w-4 h-4 mr-2" />
              {videoCount} Videos Available
            </Badge>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30 px-4 py-2 text-sm hover:bg-white/30 transition-colors">
              <Eye className="w-4 h-4 mr-2" />
              HD Quality
            </Badge>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30 px-4 py-2 text-sm hover:bg-white/30 transition-colors">
              <Star className="w-4 h-4 mr-2" />
              Premium Content
            </Badge>
          </div>
          
          {/* Enhanced Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center animate-fade-in">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted w-5 h-5" />
              <Input
                placeholder="Search videos, topics, or tags..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-12 bg-white/90 backdrop-blur-sm border-white/20 h-14 text-foreground placeholder:text-muted-foreground focus:bg-white focus:border-primary transition-all duration-300"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'grid' ? 'secondary' : 'outline'}
                size="lg"
                onClick={() => onViewModeChange('grid')}
                className={cn(
                  "transition-all duration-300",
                  viewMode === 'grid' 
                    ? "bg-white text-primary hover:bg-white/90" 
                    : "bg-white/20 border-white/30 text-white hover:bg-white/30"
                )}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'secondary' : 'outline'}
                size="lg"
                onClick={() => onViewModeChange('list')}
                className={cn(
                  "transition-all duration-300",
                  viewMode === 'list' 
                    ? "bg-white text-primary hover:bg-white/90" 
                    : "bg-white/20 border-white/30 text-white hover:bg-white/30"
                )}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}