
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

interface VideoPlayerProps {
  src: string;
  poster?: string;
  title?: string;
  className?: string;
  autoPlay?: boolean;
}

// Helper function to detect video type
const getVideoType = (url: string): 'youtube' | 'vimeo' | 'direct' => {
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    return 'youtube';
  } else if (url.includes('vimeo.com')) {
    return 'vimeo';
  } else {
    return 'direct';
  }
};

// Helper function to get proper embed URLs
const getEmbedUrl = (url: string, type: 'youtube' | 'vimeo' | 'direct'): string => {
  if (type === 'direct') return url;
  
  if (type === 'youtube') {
    const videoId = url.includes('youtu.be') 
      ? url.split('/').pop() 
      : url.split('v=')[1]?.split('&')[0];
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&enablejsapi=1`;
  }
  
  if (type === 'vimeo') {
    const videoId = url.split('/').pop();
    return `https://player.vimeo.com/video/${videoId}?autoplay=1`;
  }
  
  return url;
};

export function VideoPlayer({ src, poster, title, className, autoPlay = false }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(autoPlay);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  
  const videoType = getVideoType(src);
  const embedUrl = getEmbedUrl(src, videoType);
  
  // Show controls when hovering over the video
  const controlsTimeout = useRef<NodeJS.Timeout | null>(null);
  
  const handleControlsShow = () => {
    setShowControls(true);
    
    if (controlsTimeout.current) {
      clearTimeout(controlsTimeout.current);
    }
    
    controlsTimeout.current = setTimeout(() => {
      if (playing) {
        setShowControls(false);
      }
    }, 3000);
  };

  useEffect(() => {
    return () => {
      if (controlsTimeout.current) {
        clearTimeout(controlsTimeout.current);
      }
    };
  }, []);
  
  // Handle direct video controls
  const togglePlay = () => {
    if (!videoRef.current) return;
    
    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    
    setPlaying(!playing);
  };
  
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
  };
  
  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
  };
  
  const handleSeek = (value: number[]) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = value[0];
    setCurrentTime(value[0]);
  };
  
  const handleVolumeChange = (value: number[]) => {
    if (!videoRef.current) return;
    const newVolume = value[0];
    videoRef.current.volume = newVolume;
    setVolume(newVolume);
    setMuted(newVolume === 0);
  };
  
  const toggleMute = () => {
    if (!videoRef.current) return;
    
    if (muted) {
      videoRef.current.muted = false;
      videoRef.current.volume = volume || 1;
      setMuted(false);
    } else {
      videoRef.current.muted = true;
      setMuted(true);
    }
  };
  
  const toggleFullscreen = async () => {
    if (!containerRef.current) return;
    
    if (!document.fullscreenElement) {
      await containerRef.current.requestFullscreen();
      setFullscreen(true);
    } else {
      await document.exitFullscreen();
      setFullscreen(false);
    }
  };
  
  // Format time (seconds -> MM:SS)
  const formatTime = (timeInSeconds: number) => {
    const mins = Math.floor(timeInSeconds / 60);
    const secs = Math.floor(timeInSeconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  // Skip forward/backward 10 seconds
  const skipForward = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = Math.min(videoRef.current.duration, videoRef.current.currentTime + 10);
  };
  
  const skipBackward = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 10);
  };
  
  // Render embedded or direct video based on type
  if (videoType === 'youtube' || videoType === 'vimeo') {
    return (
      <div className={cn("relative overflow-hidden rounded-lg aspect-video", className)}>
        <iframe 
          src={embedUrl}
          title={title || "Video player"}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    );
  }
  
  return (
    <div 
      ref={containerRef}
      className={cn(
        "relative overflow-hidden rounded-lg aspect-video bg-black",
        className
      )}
      onMouseMove={handleControlsShow}
      onMouseLeave={() => playing && setShowControls(false)}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full h-full object-contain"
        onClick={togglePlay}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
      />
      
      {/* Video Controls */}
      <div 
        className={cn(
          "absolute inset-0 flex flex-col justify-between bg-gradient-to-t from-black/70 to-transparent p-4",
          "transition-opacity duration-300",
          showControls ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        {/* Top controls */}
        <div className="flex justify-between items-center">
          <div className="text-white font-medium text-sm md:text-base">
            {title}
          </div>
        </div>
        
        {/* Center controls */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-8">
          <Button 
            variant="ghost" 
            size="icon" 
            className="bg-black/30 backdrop-blur-sm text-white rounded-full h-10 w-10 md:h-12 md:w-12" 
            onClick={skipBackward}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="bg-black/30 backdrop-blur-sm text-white rounded-full h-12 w-12 md:h-16 md:w-16" 
            onClick={togglePlay}
          >
            {playing ? (
              <Pause className="h-6 w-6 md:h-8 md:w-8" />
            ) : (
              <Play className="h-6 w-6 md:h-8 md:w-8 ml-1" />
            )}
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="bg-black/30 backdrop-blur-sm text-white rounded-full h-10 w-10 md:h-12 md:w-12" 
            onClick={skipForward}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
        
        {/* Bottom controls */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Slider
              defaultValue={[0]}
              value={[currentTime]}
              max={duration || 100}
              step={0.1}
              onValueChange={handleSeek}
              className="cursor-pointer"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="text-white" onClick={togglePlay}>
                {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="text-white" onClick={toggleMute}>
                  {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
                <Slider
                  defaultValue={[1]}
                  value={[muted ? 0 : volume]}
                  max={1}
                  step={0.01}
                  onValueChange={handleVolumeChange}
                  className="w-20 cursor-pointer"
                />
              </div>
              
              <span className="text-white text-xs">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>
            
            <Button variant="ghost" size="icon" className="text-white" onClick={toggleFullscreen}>
              <Maximize className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
