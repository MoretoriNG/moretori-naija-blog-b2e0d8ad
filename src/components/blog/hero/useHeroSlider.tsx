
import { useState, useEffect, useCallback } from "react";
import { Post } from "@/types/blog";

export function useHeroSlider(posts: Post[]) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplayEnabled, setAutoplayEnabled] = useState(true);
  const [autoplayInterval, setAutoplayInterval] = useState<NodeJS.Timeout | null>(null);
  
  // Add some randomization to ensure we have different categories represented
  const shufflePosts = useCallback((posts: Post[]): Post[] => {
    if (posts.length <= 4) return posts;
    
    // Extract one post from each category if available
    const categories = new Set(posts.map(p => p.category));
    const selectedPosts: Post[] = [];
    
    // Try to get one post from each category
    categories.forEach(category => {
      const post = posts.find(p => p.category === category && !selectedPosts.includes(p));
      if (post) selectedPosts.push(post);
    });
    
    // Fill remaining slots with random posts
    while (selectedPosts.length < 4 && posts.length > selectedPosts.length) {
      const remainingPosts = posts.filter(p => !selectedPosts.includes(p));
      const randomPost = remainingPosts[Math.floor(Math.random() * remainingPosts.length)];
      if (randomPost) selectedPosts.push(randomPost);
    }
    
    return selectedPosts;
  }, []);
  
  useEffect(() => {
    // Start autoplay
    if (autoplayEnabled) {
      const interval = setInterval(() => {
        setActiveIndex(prev => (prev + 1) % posts.length);
      }, 5000);
      setAutoplayInterval(interval);
      
      return () => {
        if (autoplayInterval) clearInterval(autoplayInterval);
      };
    }
    return () => {
      if (autoplayInterval) clearInterval(autoplayInterval);
    };
  }, [autoplayEnabled, posts.length, autoplayInterval]);
  
  // Pause autoplay when user interacts
  const pauseAutoplay = useCallback(() => {
    if (autoplayInterval) {
      clearInterval(autoplayInterval);
      setAutoplayInterval(null);
    }
    // Restart after 10 seconds of inactivity
    setTimeout(() => {
      if (autoplayEnabled) {
        const interval = setInterval(() => {
          setActiveIndex(prev => (prev + 1) % posts.length);
        }, 5000);
        setAutoplayInterval(interval);
      }
    }, 10000);
  }, [autoplayEnabled, autoplayInterval, posts.length]);
  
  const handleDotClick = useCallback((index: number) => {
    setActiveIndex(index);
    pauseAutoplay();
  }, [pauseAutoplay]);
  
  return {
    activeIndex,
    setActiveIndex,
    autoplayEnabled,
    setAutoplayEnabled,
    shufflePosts,
    pauseAutoplay,
    handleDotClick
  };
}
