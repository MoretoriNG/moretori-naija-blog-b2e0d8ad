
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
      {/* Main Footer Content - More Compact */}
      <div className="container px-4 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Brand Section */}
          <div>
            <Link to="/" className="flex items-center space-x-3 mb-4 group">
              <div className="h-10 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow overflow-hidden">
                <img 
                  src="/lovable-uploads/b806c6e4-d29d-4771-83f8-042153c725d3.png" 
                  alt="Logo" 
                  className="h-full w-auto object-contain"
                />
              </div>
            </Link>
            <p className="text-gray-300 mb-4 text-sm leading-relaxed">
              Your premier destination for technology news, automotive reviews, health tips, and entertainment updates.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className={`p-2 rounded-full bg-gray-800 text-gray-400 transition-all duration-300 ${social.color} hover:bg-gray-700 hover:scale-110`}
                  aria-label={social.name}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-orange-400">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-orange-400 transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-orange-400">Categories</h4>
            <ul className="space-y-2">
              {categories.slice(0, 4).map((category) => (
                <li key={category.name}>
                  <Link
                    to={category.href}
                    className="text-gray-300 hover:text-orange-400 transition-colors duration-300 text-sm"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info & Newsletter Combined */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-orange-400">Stay Connected</h4>
            
            {/* Newsletter */}
            <div className="mb-4">
              <p className="text-gray-300 text-sm mb-3">Get the latest updates</p>
              <form onSubmit={handleSubmit} className="space-y-2">
                <div className="relative">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-white/10 border-white/20 focus:bg-white/20 text-white text-sm"
                  />
                </div>
                <Button 
                  type="submit" 
                  size="sm"
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold"
                  disabled={isSubscribed}
                >
                  {isSubscribed ? (
                    <>
                      <CheckCircle className="h-3 w-3 mr-2" />
                      Subscribed
                    </>
                  ) : (
                    <>
                      <Send className="h-3 w-3 mr-2" />
                      Subscribe
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-2">
              <div className="flex items-center text-gray-300 text-sm">
                <Mail className="h-4 w-4 text-orange-500 mr-2 flex-shrink-0" />
                <span className="break-all">info@example.com</span>
              </div>
              <div className="flex items-center text-gray-300 text-sm">
                <Phone className="h-4 w-4 text-orange-500 mr-2 flex-shrink-0" />
                <span>+234 (0) 123 456 7890</span>
              </div>
              <div className="flex items-start text-gray-300 text-sm">
                <MapPin className="h-4 w-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Lagos, Nigeria</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer - More Compact */}
      <div className="border-t border-gray-700">
        <div className="container px-4 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0 text-center md:text-left">
            <div className="text-gray-400 text-sm">
              © {currentYear} All rights reserved.
            </div>
            <div className="flex flex-wrap justify-center md:justify-end gap-4 text-sm">
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
