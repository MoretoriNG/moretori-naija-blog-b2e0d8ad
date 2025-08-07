import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Phone, Globe, Star, ArrowRight } from 'lucide-react';

interface Business {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  rating: number;
  reviews: number;
  location: string;
  phone: string;
  website: string;
  featured: boolean;
}

// Sample business data - this can be replaced with data from Supabase later
const businesses: Business[] = [
  {
    id: '1',
    name: 'TechFlow Solutions',
    category: 'Technology',
    description: 'Leading provider of custom software development and IT consulting services.',
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=400&q=80',
    rating: 4.8,
    reviews: 124,
    location: 'Lagos, Nigeria',
    phone: '+234 800 123 4567',
    website: 'www.techflow.com',
    featured: true
  },
  {
    id: '2',
    name: 'AutoCare Plus',
    category: 'Automotive',
    description: 'Premium automotive repair and maintenance services with certified technicians.',
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=400&q=80',
    rating: 4.7,
    reviews: 89,
    location: 'Abuja, Nigeria',
    phone: '+234 800 234 5678',
    website: 'www.autocareplus.com',
    featured: true
  },
  {
    id: '3',
    name: 'WellnessHub Clinic',
    category: 'Healthcare',
    description: 'Comprehensive healthcare services with modern facilities and experienced doctors.',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=400&q=80',
    rating: 4.9,
    reviews: 156,
    location: 'Port Harcourt, Nigeria',
    phone: '+234 800 345 6789',
    website: 'www.wellnesshub.com',
    featured: false
  },
  {
    id: '4',
    name: 'Digital Marketing Pro',
    category: 'Marketing',
    description: 'Strategic digital marketing solutions to grow your business online presence.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80',
    rating: 4.6,
    reviews: 73,
    location: 'Kano, Nigeria',
    phone: '+234 800 456 7890',
    website: 'www.digitalmarketingpro.com',
    featured: true
  },
  {
    id: '5',
    name: 'Fresh Foods Market',
    category: 'Food & Beverage',
    description: 'Organic and fresh produce delivered daily from local farms to your table.',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80',
    rating: 4.5,
    reviews: 92,
    location: 'Ibadan, Nigeria',
    phone: '+234 800 567 8901',
    website: 'www.freshfoodsmarket.com',
    featured: false
  },
  {
    id: '6',
    name: 'EduTech Academy',
    category: 'Education',
    description: 'Professional training and certification programs in technology and business.',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=400&q=80',
    rating: 4.8,
    reviews: 198,
    location: 'Lagos, Nigeria',
    phone: '+234 800 678 9012',
    website: 'www.edutechacademy.com',
    featured: true
  }
];

const categories = ['All', 'Technology', 'Automotive', 'Healthcare', 'Marketing', 'Food & Beverage', 'Education'];

export function BusinessDirectory() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredBusinesses = selectedCategory === 'All' 
    ? businesses 
    : businesses.filter(business => business.category === selectedCategory);

  const featuredBusinesses = filteredBusinesses.filter(business => business.featured);
  const displayBusinesses = featuredBusinesses.length > 0 ? featuredBusinesses : filteredBusinesses.slice(0, 6);

  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/30">
      <div className="container px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Business Directory
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover trusted local businesses and services in your area. Connect with quality providers who can help meet your needs.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="min-w-[80px]"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Business Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {displayBusinesses.map((business) => (
            <Card key={business.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className="relative">
                <img
                  src={business.image}
                  alt={business.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {business.featured && (
                  <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
                    Featured
                  </Badge>
                )}
                <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-medium">{business.rating}</span>
                </div>
              </div>
              
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {business.name}
                    </CardTitle>
                    <Badge variant="secondary" className="mt-1 text-xs">
                      {business.category}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {business.description}
                </p>
                
                <div className="space-y-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3 w-3" />
                    <span>{business.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-3 w-3" />
                    <span>{business.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="h-3 w-3" />
                    <span>{business.website}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-4 pt-4 border-t">
                  <div className="text-xs text-muted-foreground">
                    {business.reviews} reviews
                  </div>
                  <Button size="sm" variant="outline" className="group/btn">
                    View Details
                    <ArrowRight className="h-3 w-3 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="min-w-[160px]">
              List Your Business
            </Button>
            <Button size="lg" variant="outline" className="min-w-[160px]">
              View All Businesses
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Want to showcase your business? Join our directory and reach more customers.
          </p>
        </div>
      </div>
    </section>
  );
}