
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, MapPin, Phone, ArrowRight, Send } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-[#0A1F33] text-white">
      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="container py-12">
          <div className="grid gap-8 md:grid-cols-[1fr_400px] items-center">
            <div className="space-y-3">
              <div className="inline-block rounded-lg bg-blue-500/20 px-3 py-1 text-sm">
                <span className="flex items-center gap-1">
                  <Mail className="h-3.5 w-3.5" />
                  <span>Subscribe to our Newsletter</span>
                </span>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Stay Updated with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">Moretori Naija</span>
              </h2>
              <p className="max-w-[600px] text-white/70 md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed">
                Get the latest news, trends, and updates from Nigeria delivered directly to your inbox. No spam, unsubscribe anytime.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 min-[400px]:flex-row lg:justify-end">
              <div className="grid gap-3 min-[400px]:flex sm:flex-col lg:flex-row">
                <Input 
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50" 
                  placeholder="Enter your email" 
                  type="email"
                />
                <Button className="inline-flex h-10 items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 rounded-md px-4 py-2 text-sm font-medium text-white transition-colors">
                  Subscribe 
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container py-10">
        {/* Top Section */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                Moretori Naija
              </span>
            </Link>
            <p className="text-white/70 max-w-xs">
              Your daily source for the latest trends, news, and entertainment from Nigeria and beyond. Stay informed, stay engaged.
            </p>
            
            <div className="flex space-x-3">
              <Button variant="outline" size="icon" className="rounded-full border-white/20 hover:bg-blue-500 hover:border-blue-500 text-white transition-all duration-300" asChild>
                <a href="https://facebook.com" target="_blank" rel="noreferrer">
                  <Facebook className="h-4 w-4" />
                  <span className="sr-only">Facebook</span>
                </a>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full border-white/20 hover:bg-blue-500 hover:border-blue-500 text-white transition-all duration-300" asChild>
                <a href="https://twitter.com" target="_blank" rel="noreferrer">
                  <Twitter className="h-4 w-4" />
                  <span className="sr-only">Twitter</span>
                </a>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full border-white/20 hover:bg-blue-500 hover:border-blue-500 text-white transition-all duration-300" asChild>
                <a href="https://instagram.com" target="_blank" rel="noreferrer">
                  <Instagram className="h-4 w-4" />
                  <span className="sr-only">Instagram</span>
                </a>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full border-white/20 hover:bg-blue-500 hover:border-blue-500 text-white transition-all duration-300" asChild>
                <a href="https://youtube.com" target="_blank" rel="noreferrer">
                  <Youtube className="h-4 w-4" />
                  <span className="sr-only">YouTube</span>
                </a>
              </Button>
            </div>
          </div>
          
          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Categories</h3>
            <div className="grid grid-cols-2 gap-2">
              {["Tech", "Auto", "Health", "Entertainment", "News", "Music"].map((category) => (
                <Link
                  key={category}
                  to={`/category/${category.toLowerCase()}`}
                  className="text-sm text-white/70 hover:text-white flex items-center gap-1 group"
                >
                  <ArrowRight className="h-3 w-3 text-blue-400 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                  {category}
                </Link>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="space-y-2">
              <Link
                to="/about"
                className="text-sm text-white/70 hover:text-white flex items-center gap-1 group"
              >
                <ArrowRight className="h-3 w-3 text-blue-400 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                About Us
              </Link>
              <Link
                to="/contact"
                className="text-sm text-white/70 hover:text-white flex items-center gap-1 group"
              >
                <ArrowRight className="h-3 w-3 text-blue-400 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                Contact
              </Link>
              <Link
                to="/privacy"
                className="text-sm text-white/70 hover:text-white flex items-center gap-1 group"
              >
                <ArrowRight className="h-3 w-3 text-blue-400 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                Privacy Policy
              </Link>
            </div>
          </div>
          
          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-sm text-white/70">
                <MapPin className="h-4 w-4 text-green-400 shrink-0 mt-0.5" />
                <span>123 Innovation Hub, Victoria Island, Lagos, Nigeria</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/70">
                <Mail className="h-4 w-4 text-green-400 shrink-0" />
                <a href="mailto:info@moretorinaija.com" className="hover:text-white">info@moretorinaija.com</a>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/70">
                <Phone className="h-4 w-4 text-green-400 shrink-0" />
                <a href="tel:+2341234567890" className="hover:text-white">+234 123 456 7890</a>
              </div>
            </div>
          </div>
        </div>
        
        <Separator className="my-8 opacity-30 bg-white/20" />
        
        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-6">
          <p className="text-sm text-white/70 mb-4 md:mb-0">
            &copy; {currentYear} Moretori Naija. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-white/70">
            <Link to="/privacy" className="hover:text-white">Privacy</Link>
            <Link to="/terms" className="hover:text-white">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
