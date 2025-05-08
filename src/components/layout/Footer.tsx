
import React from 'react';
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Twitter, Instagram, Linkedin, Send, Mail, MapPin, Phone, ArrowRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { toast } from "sonner";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      toast.success("Thanks for subscribing! You'll receive our latest updates soon.");
      setTimeout(() => setSubscribed(false), 3000);
      setEmail("");
    }
  };
  
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12 relative">
      {/* CTA Banner */}
      <div className="container mb-12">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 md:p-8 relative overflow-hidden shadow-xl">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIgMkgyMFYyMEgyVjIiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIwLjUiIGZpbGw9Im5vbmUiLz4KPC9zdmc+')]"></div>
          
          <div className="grid md:grid-cols-3 gap-6 items-center relative z-10">
            <div className="md:col-span-2 space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold">Stay Ahead with Our Newsletter</h2>
              <p className="text-white/80">Get the latest news, trends, and updates delivered straight to your inbox</p>
            </div>
            <div>
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <Input 
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 flex-1" 
                  placeholder="Your email" 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button 
                  type="submit" 
                  size="sm"
                  className="bg-white text-blue-600 hover:bg-white/90"
                  disabled={subscribed}
                >
                  {subscribed ? 'Done ✓' : (
                    <>
                      <Send className="h-4 w-4 mr-1" /> Subscribe
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-4 col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 via-green-400 to-orange-400 bg-clip-text text-transparent">
                Moretori Naija
              </span>
            </Link>
            <p className="text-white/70 text-sm">
              Your source for the latest Nigerian news and trends
            </p>
            
            <div className="flex space-x-3">
              <SocialButton href="https://facebook.com" icon={<Facebook />} label="Facebook" />
              <SocialButton href="https://twitter.com" icon={<Twitter />} label="Twitter" />
              <SocialButton href="https://instagram.com" icon={<Instagram />} label="Instagram" />
              <SocialButton href="https://linkedin.com" icon={<Linkedin />} label="LinkedIn" />
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-base font-medium">Categories</h3>
            <div className="grid grid-cols-1 gap-1">
              {["Tech", "Auto", "Health", "Entertainment", "News"].map((category) => (
                <FooterLink key={category} to={`/category/${category.toLowerCase()}`}>
                  {category}
                </FooterLink>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-base font-medium">Quick Links</h3>
            <div className="space-y-1">
              <FooterLink to="/about">About Us</FooterLink>
              <FooterLink to="/contact">Contact</FooterLink>
              <FooterLink to="/privacy">Privacy Policy</FooterLink>
              <FooterLink to="/terms">Terms of Service</FooterLink>
            </div>
          </div>
          
          {/* Contact */}
          <div className="space-y-3">
            <h3 className="text-base font-medium">Contact</h3>
            <div className="text-sm text-white/70 space-y-2">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a href="mailto:info@moretorinaija.com" className="hover:text-white">info@moretorinaija.com</a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <a href="tel:+2341234567890" className="hover:text-white">+234 123 456 7890</a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Lagos, Nigeria</span>
              </div>
            </div>
          </div>
        </div>
        
        <Separator className="my-6 opacity-25 bg-white/20" />
        
        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-2 text-sm">
          <p className="text-white/70 mb-2 md:mb-0">
            &copy; {currentYear} Moretori Naija. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-white/70">
            <Link to="/privacy" className="hover:text-white">Privacy</Link>
            <Link to="/terms" className="hover:text-white">Terms</Link>
            <Link to="/sitemap" className="hover:text-white">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Helper component for social media buttons
const SocialButton = ({ href, icon, label }: { href: string, icon: React.ReactNode, label: string }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noreferrer"
    className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
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
    className="text-sm text-white/70 hover:text-white flex items-center gap-1 group"
  >
    <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
    {children}
  </Link>
);
