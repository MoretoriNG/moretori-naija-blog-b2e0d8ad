
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, MapPin, Phone, ArrowRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-b from-muted/50 to-background border-t">
      <div className="container py-12 md:py-16">
        {/* Top Section */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4 md:grid-cols-2">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-3xl font-bold bg-gradient-to-r from-vibehub-purple to-vibehub-blue-bright bg-clip-text text-transparent">
                Moretori Naija
              </span>
            </Link>
            <p className="text-muted-foreground max-w-xs">
              Your daily source for the latest trends, news, and entertainment from Nigeria and beyond. Stay informed, stay engaged.
            </p>
            
            <div className="flex space-x-3">
              <Button variant="outline" size="icon" className="rounded-full hover:bg-vibehub-purple hover:text-white transition-all duration-300" asChild>
                <a href="https://facebook.com" target="_blank" rel="noreferrer">
                  <Facebook className="h-4 w-4" />
                  <span className="sr-only">Facebook</span>
                </a>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full hover:bg-vibehub-purple hover:text-white transition-all duration-300" asChild>
                <a href="https://twitter.com" target="_blank" rel="noreferrer">
                  <Twitter className="h-4 w-4" />
                  <span className="sr-only">Twitter</span>
                </a>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full hover:bg-vibehub-purple hover:text-white transition-all duration-300" asChild>
                <a href="https://instagram.com" target="_blank" rel="noreferrer">
                  <Instagram className="h-4 w-4" />
                  <span className="sr-only">Instagram</span>
                </a>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full hover:bg-vibehub-purple hover:text-white transition-all duration-300" asChild>
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
              {["Tech", "Auto", "Health", "Entertainment", "News", "Fashion", "Sports", "Music"].map((category) => (
                <Link
                  key={category}
                  to={`/category/${category.toLowerCase()}`}
                  className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 group"
                >
                  <ArrowRight className="h-3 w-3 text-vibehub-purple opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
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
                className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 group"
              >
                <ArrowRight className="h-3 w-3 text-vibehub-purple opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                About Us
              </Link>
              <Link
                to="/contact"
                className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 group"
              >
                <ArrowRight className="h-3 w-3 text-vibehub-purple opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                Contact
              </Link>
              <Link
                to="/privacy"
                className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 group"
              >
                <ArrowRight className="h-3 w-3 text-vibehub-purple opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 group"
              >
                <ArrowRight className="h-3 w-3 text-vibehub-purple opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                Terms of Use
              </Link>
              <Link
                to="/advertise"
                className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 group"
              >
                <ArrowRight className="h-3 w-3 text-vibehub-purple opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                Advertise With Us
              </Link>
            </div>
          </div>
          
          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-vibehub-purple shrink-0 mt-0.5" />
                <span>123 Innovation Hub, Victoria Island, Lagos, Nigeria</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-vibehub-purple shrink-0" />
                <a href="mailto:info@moretorinaija.com" className="hover:text-foreground">info@moretorinaija.com</a>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-vibehub-purple shrink-0" />
                <a href="tel:+2341234567890" className="hover:text-foreground">+234 123 456 7890</a>
              </div>
            </div>
          </div>
        </div>
        
        <Separator className="my-8 opacity-30" />
        
        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-6">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            &copy; {currentYear} Moretori Naija. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link to="/privacy" className="hover:text-foreground">Privacy</Link>
            <Link to="/terms" className="hover:text-foreground">Terms</Link>
            <Link to="/sitemap" className="hover:text-foreground">Sitemap</Link>
            <Link to="/cookies" className="hover:text-foreground">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
