
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Twitter, Instagram, Send, MapPin, Mail, Phone, ArrowRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-[#0A1F33] text-white">
      <div className="container py-10">
        {/* Newsletter Section */}
        <div className="grid gap-8 md:grid-cols-2 items-center mb-8 pb-8 border-b border-white/10">
          <div className="space-y-3">
            <h2 className="text-2xl font-bold tracking-tighter md:text-3xl">
              Stay Updated with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-green-400 to-orange-400">Moretori Naija</span>
            </h2>
            <p className="max-w-[600px] text-white/70 md:text-base/relaxed">
              Get the latest news and updates delivered to your inbox
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Input 
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 flex-1" 
              placeholder="Enter your email" 
              type="email"
            />
            <Button className="inline-flex h-10 items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600">
              Subscribe <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
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
            
            <div className="flex space-x-3">
              <Button variant="outline" size="icon" className="rounded-full border-white/20 hover:bg-blue-500 hover:border-blue-500 text-white" asChild>
                <a href="https://facebook.com" target="_blank" rel="noreferrer">
                  <Facebook className="h-4 w-4" />
                  <span className="sr-only">Facebook</span>
                </a>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full border-white/20 hover:bg-blue-500 hover:border-blue-500 text-white" asChild>
                <a href="https://twitter.com" target="_blank" rel="noreferrer">
                  <Twitter className="h-4 w-4" />
                  <span className="sr-only">Twitter</span>
                </a>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full border-white/20 hover:bg-blue-500 hover:border-blue-500 text-white" asChild>
                <a href="https://instagram.com" target="_blank" rel="noreferrer">
                  <Instagram className="h-4 w-4" />
                  <span className="sr-only">Instagram</span>
                </a>
              </Button>
            </div>
          </div>
          
          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Categories</h3>
            <div className="grid grid-cols-1 gap-2">
              {["Tech", "Auto", "Health", "Entertainment", "News"].map((category) => (
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
        
        <Separator className="my-6 opacity-30 bg-white/20" />
        
        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-4">
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
