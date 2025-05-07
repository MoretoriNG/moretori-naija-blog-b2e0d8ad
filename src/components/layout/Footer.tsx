
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Send, MapPin, Mail, Phone, ArrowRight, Heart } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail("");
    }
  };
  
  return (
    <footer className="bg-gradient-to-br from-[#0A1F33] to-[#1a2a3d] text-white relative">
      {/* Wave SVG */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] transform -translate-y-[95%]">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block h-[40px] w-[120%]">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-[#0A1F33]"></path>
        </svg>
      </div>
      
      <div className="container py-16">
        {/* Newsletter Section */}
        <div className="grid gap-8 md:grid-cols-2 items-center mb-12 pb-10 border-b border-white/10">
          <div className="space-y-3">
            <h2 className="text-2xl font-bold tracking-tighter md:text-3xl">
              Stay Updated with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-green-400 to-orange-400">Moretori Naija</span>
            </h2>
            <p className="max-w-[600px] text-white/70 md:text-base/relaxed">
              Get the latest news and updates delivered to your inbox
            </p>
          </div>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
            <Input 
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 flex-1 focus-visible:ring-blue-500" 
              placeholder="Enter your email" 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button 
              type="submit" 
              className="inline-flex h-10 items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
              disabled={subscribed}
            >
              {subscribed ? 'Subscribed ✓' : (
                <>
                  Subscribe <Send className="h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        </div>
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-green-400 to-orange-400 bg-clip-text text-transparent">
                Moretori Naija
              </span>
            </Link>
            <p className="text-white/70 text-sm">
              Your daily source for the latest trends, news, and entertainment from Nigeria and beyond.
            </p>
            
            <div className="flex space-x-3 pt-2">
              <SocialButton href="https://facebook.com" icon={<Facebook />} label="Facebook" color="bg-[#1877f2]" />
              <SocialButton href="https://twitter.com" icon={<Twitter />} label="Twitter" color="bg-[#1da1f2]" />
              <SocialButton href="https://instagram.com" icon={<Instagram />} label="Instagram" color="bg-gradient-to-r from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]" />
              <SocialButton href="https://youtube.com" icon={<Youtube />} label="YouTube" color="bg-[#ff0000]" />
            </div>
          </div>
          
          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Categories</h3>
            <div className="grid grid-cols-1 gap-2">
              {["Tech", "Auto", "Health", "Entertainment", "News"].map((category) => (
                <FooterLink key={category} to={`/category/${category.toLowerCase()}`}>
                  {category}
                </FooterLink>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="space-y-2">
              <FooterLink to="/about">About Us</FooterLink>
              <FooterLink to="/contact">Contact</FooterLink>
              <FooterLink to="/privacy">Privacy Policy</FooterLink>
              <FooterLink to="/terms">Terms of Service</FooterLink>
              <FooterLink to="/advertise">Advertise</FooterLink>
            </div>
          </div>
          
          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-white/70">
                <Mail className="h-4 w-4 text-green-400 shrink-0" />
                <a href="mailto:info@moretorinaija.com" className="hover:text-white transition-colors">info@moretorinaija.com</a>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/70">
                <Phone className="h-4 w-4 text-green-400 shrink-0" />
                <a href="tel:+2341234567890" className="hover:text-white transition-colors">+234 123 456 7890</a>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/70">
                <MapPin className="h-4 w-4 text-green-400 shrink-0" />
                <span>Lagos, Nigeria</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Featured Posts Cards */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Featured Posts</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((item) => (
              <Card key={item} className="bg-white/5 backdrop-blur border-white/10 hover:bg-white/10 transition-colors duration-300">
                <CardContent className="p-4">
                  <h4 className="font-medium text-sm mb-1 line-clamp-2 text-white">
                    Featured Article Title {item}
                  </h4>
                  <p className="text-xs text-white/60">2 days ago</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        <Separator className="my-6 opacity-30 bg-white/20" />
        
        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-4">
          <p className="text-sm text-white/70 mb-4 md:mb-0">
            &copy; {currentYear} Moretori Naija. All rights reserved. Made with <Heart className="inline h-3 w-3 text-red-500 mx-1" fill="currentColor" /> in Nigeria
          </p>
          <div className="flex gap-6 text-sm text-white/70">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link to="/sitemap" className="hover:text-white transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Helper component for social media buttons
const SocialButton = ({ href, icon, label, color }: { href: string, icon: React.ReactNode, label: string, color: string }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noreferrer"
    className={`${color} flex items-center justify-center w-8 h-8 rounded-full text-white hover:opacity-90 transition-opacity`}
    aria-label={label}
  >
    <span className="sr-only">{label}</span>
    {React.cloneElement(icon as React.ReactElement, { className: "h-4 w-4" })}
  </a>
);

// Helper component for footer links
const FooterLink = ({ to, children }: { to: string, children: React.ReactNode }) => (
  <Link
    to={to}
    className="text-sm text-white/70 hover:text-white flex items-center gap-1 group transition-colors"
  >
    <ArrowRight className="h-3 w-3 text-blue-400 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
    {children}
  </Link>
);
