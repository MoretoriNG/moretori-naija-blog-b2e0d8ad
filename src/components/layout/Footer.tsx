
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from "sonner";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Categories', href: '/category/tech' },
    { name: 'Videos', href: '/videos' },
  ];

  const categories = [
    { name: 'Technology', href: '/category/tech' },
    { name: 'Automotive', href: '/category/auto' },
    { name: 'Health', href: '/category/health' },
    { name: 'Entertainment', href: '/category/entertainment' },
    { name: 'Business', href: '/category/business' },
    { name: 'Sports', href: '/category/sports' },
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#', color: 'hover:text-blue-600' },
    { name: 'Twitter', icon: Twitter, href: '#', color: 'hover:text-blue-400' },
    { name: 'Instagram', icon: Instagram, href: '#', color: 'hover:text-pink-600' },
    { name: 'Youtube', icon: Youtube, href: '#', color: 'hover:text-red-600' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      toast.success("Thank you for subscribing! You'll receive our newsletter soon.");
      setTimeout(() => setIsSubscribed(false), 3000);
      setEmail("");
    }
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Newsletter Section */}
      <div className="border-b border-gray-700">
        <div className="container px-4 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <img 
                src="/lovable-uploads/b806c6e4-d29d-4771-83f8-042153c725d3.png" 
                alt="Moretori Naija Logo" 
                className="h-10 w-auto"
              />
              <div className="inline-block rounded-lg bg-blue-500/30 px-3 py-1 text-sm">
                <span className="flex items-center gap-1">
                  <Mail className="h-3.5 w-3.5" />
                  <span>Newsletter</span>
                </span>
              </div>
            </div>
            <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              Stay Updated with Moretori Naija
            </h3>
            <p className="text-gray-300 mb-6 text-lg">
              Get the latest news, reviews, and insights delivered straight to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <form onSubmit={handleSubmit} className="flex gap-2 w-full">
                <div className="relative flex-1">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-white/10 border-white/20 focus:bg-white/20 text-white pl-10"
                  />
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
                </div>
                <Button 
                  type="submit" 
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold px-8"
                  disabled={isSubscribed}
                >
                  {isSubscribed ? (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Done
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Subscribe
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-3 mb-6 group">
              <div className="h-12 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow overflow-hidden">
                <img 
                  src="/lovable-uploads/b806c6e4-d29d-4771-83f8-042153c725d3.png" 
                  alt="Moretori Naija" 
                  className="h-full w-auto object-contain"
                />
              </div>
            </Link>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Your premier destination for technology news, automotive reviews, health tips, and entertainment updates in Nigeria and beyond.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className={`p-2 rounded-full bg-gray-800 text-gray-400 transition-all duration-300 ${social.color} hover:bg-gray-700 hover:scale-110`}
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col">
            <h4 className="text-lg font-semibold mb-6 text-orange-400">Quick Links</h4>
            <ul className="space-y-3 flex-1">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-orange-400 transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="flex flex-col">
            <h4 className="text-lg font-semibold mb-6 text-orange-400">Categories</h4>
            <ul className="space-y-3 flex-1">
              {categories.map((category) => (
                <li key={category.name}>
                  <Link
                    to={category.href}
                    className="text-gray-300 hover:text-orange-400 transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col">
            <h4 className="text-lg font-semibold mb-6 text-orange-400">Contact Info</h4>
            <div className="space-y-4 flex-1">
              <div className="flex items-center text-gray-300">
                <Mail className="h-5 w-5 text-orange-500 mr-3 flex-shrink-0" />
                <span className="break-all">info@moretorinaija.com</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Phone className="h-5 w-5 text-orange-500 mr-3 flex-shrink-0" />
                <span>+234 (0) 123 456 7890</span>
              </div>
              <div className="flex items-start text-gray-300">
                <MapPin className="h-5 w-5 text-orange-500 mr-3 mt-1 flex-shrink-0" />
                <span>Lagos, Nigeria</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700">
        <div className="container px-4 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-center md:text-left">
            <div className="text-gray-400 text-sm">
              © {currentYear} Moretori Naija. All rights reserved.
            </div>
            <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-2 sm:space-y-0 text-sm">
              <Link to="/privacy" className="text-gray-400 hover:text-orange-400 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-orange-400 transition-colors">
                Terms of Service
              </Link>
              <Link to="/contact" className="text-gray-400 hover:text-orange-400 transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
