
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { ExternalLink, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export type AdBannerSize = 'small' | 'medium' | 'large' | 'sidebar' | 'header';

interface AdBannerProps {
  size?: AdBannerSize;
  className?: string;
  sticky?: boolean;
  showCloseButton?: boolean;
  id?: string;
}

// List of sample ad banners, in a real app these could come from an API
const adBanners = [
  {
    id: 'tech-01',
    title: 'Tech Conference 2025',
    description: 'Join the biggest tech event of the year',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
    url: '#tech-conference',
    backgroundColor: '#9b87f5',
    textColor: '#ffffff',
    category: 'tech'
  },
  {
    id: 'travel-01',
    title: 'Explore Paradise Islands',
    description: 'Book your dream vacation today',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    url: '#travel-deals',
    backgroundColor: '#33C3F0',
    textColor: '#ffffff',
    category: 'travel'
  },
  {
    id: 'finance-01',
    title: 'Investment Opportunities',
    description: 'Grow your wealth with smart investments',
    image: 'https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?auto=format&fit=crop&w=800&q=80',
    url: '#investment',
    backgroundColor: '#F97316',
    textColor: '#ffffff',
    category: 'finance'
  },
  {
    id: 'education-01',
    title: 'Master New Skills',
    description: 'Online courses starting at $12.99',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
    url: '#education',
    backgroundColor: '#1EAEDB',
    textColor: '#ffffff',
    category: 'education'
  }
];

export function AdBanner({ 
  size = 'medium', 
  className = '',
  sticky = false,
  showCloseButton = true,
  id 
}: AdBannerProps) {
  const [adIndex, setAdIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [hasBeenDismissed, setHasBeenDismissed] = useState(false);
  
  // Randomize ad selection on initial render or when id changes
  useEffect(() => {
    if (id) {
      // If id is provided, try to find a matching ad
      const index = adBanners.findIndex(ad => ad.id === id);
      setAdIndex(index >= 0 ? index : Math.floor(Math.random() * adBanners.length));
    } else {
      setAdIndex(Math.floor(Math.random() * adBanners.length));
    }
    
    // Reset visibility when id changes
    setIsVisible(true);
    
    // Check if this ad was previously dismissed
    const dismissedAds = JSON.parse(localStorage.getItem('dismissedAds') || '[]');
    if (id && dismissedAds.includes(id)) {
      setHasBeenDismissed(true);
      setIsVisible(false);
    }
  }, [id]);
  
  const handleDismiss = () => {
    setIsVisible(false);
    
    // Remember dismissed ads
    if (id) {
      const dismissedAds = JSON.parse(localStorage.getItem('dismissedAds') || '[]');
      if (!dismissedAds.includes(id)) {
        dismissedAds.push(id);
        localStorage.setItem('dismissedAds', JSON.stringify(dismissedAds));
      }
      setHasBeenDismissed(true);
    }
  };
  
  const currentAd = adBanners[adIndex];
  
  // If ad has been dismissed, don't render anything
  if (hasBeenDismissed || !isVisible) return null;

  // Render different layouts based on the size prop
  if (size === 'header') {
    return (
      <div 
        className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white ${sticky ? 'sticky top-0 z-50' : ''} ${className}`}
        style={{ 
          backgroundColor: currentAd.backgroundColor 
        }}
      >
        <div className="container py-1 px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <p className="text-sm font-medium truncate max-w-md">
              {currentAd.title}: {currentAd.description}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <a 
              href={currentAd.url} 
              className="text-xs underline flex items-center hover:text-white/90"
              onClick={(e) => e.stopPropagation()}
            >
              Learn More
              <ExternalLink className="h-3 w-3 ml-1" />
            </a>
            {showCloseButton && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6 rounded-full hover:bg-white/20 p-1"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDismiss();
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }
  
  if (size === 'sidebar') {
    return (
      <Card 
        className={`overflow-hidden border border-border/40 ${className}`}
        style={{ backgroundColor: currentAd.backgroundColor }}
      >
        <div className="relative">
          <img 
            src={currentAd.image} 
            alt={currentAd.title}
            className="w-full aspect-[4/3] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
            <h4 className="font-bold text-sm">{currentAd.title}</h4>
            <p className="text-xs opacity-90 mt-1">{currentAd.description}</p>
            <a 
              href={currentAd.url} 
              className="mt-2 inline-flex items-center text-xs font-medium hover:underline"
            >
              Learn More <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          </div>
          
          {showCloseButton && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute top-1 right-1 h-6 w-6 rounded-full bg-black/30 hover:bg-black/50 p-1"
              onClick={(e) => {
                e.stopPropagation();
                handleDismiss();
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </Card>
    );
  }

  return (
    <Card 
      className={`overflow-hidden ${className}`}
      onClick={() => window.open(currentAd.url, '_blank')}
    >
      <div 
        className={`flex ${size === 'small' ? 'flex-row h-16' : size === 'large' ? 'flex-col md:flex-row items-center' : 'flex-col sm:flex-row'} cursor-pointer`}
        style={{ backgroundColor: currentAd.backgroundColor }}
      >
        <div 
          className={`${size === 'small' ? 'w-16' : size === 'large' ? 'w-full md:w-1/3' : 'w-full sm:w-1/3'} relative`}
        >
          <img 
            src={currentAd.image} 
            alt={currentAd.title}
            className={`object-cover ${size === 'small' ? 'h-16' : 'h-40 w-full'}`}
          />
          {showCloseButton && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute top-1 right-1 h-6 w-6 rounded-full bg-black/30 hover:bg-black/50 p-1"
              onClick={(e) => {
                e.stopPropagation();
                handleDismiss();
              }}
            >
              <X className="h-4 w-4 text-white" />
            </Button>
          )}
        </div>
        
        <div 
          className={`${size === 'small' ? 'p-2' : 'p-4'} flex-1`}
          style={{ color: currentAd.textColor }}
        >
          <h3 className={`font-bold ${size === 'small' ? 'text-sm' : size === 'large' ? 'text-xl' : 'text-lg'}`}>
            {currentAd.title}
          </h3>
          <p className={`${size === 'small' ? 'text-xs line-clamp-1' : size === 'large' ? 'mt-2' : 'mt-1'} opacity-90`}>
            {currentAd.description}
          </p>
          {size !== 'small' && (
            <div className="mt-2 flex items-center">
              <a 
                href={currentAd.url} 
                className="inline-flex items-center text-sm font-medium hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                Learn More <ExternalLink className="h-4 w-4 ml-1" />
              </a>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

export default AdBanner;
