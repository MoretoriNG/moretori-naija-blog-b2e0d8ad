
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Footer() {
  const currentYear = new Date().getFullYear();

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

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-orange-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-blue-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-green-500 rounded-full blur-2xl animate-ping delay-500"></div>
      </div>
      
      {/* Newsletter Section */}
      <div className="border-b border-gray-700/50 relative">
        <div className="container px-4 lg:px-8 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-fade-in">
              <h3 className="text-4xl font-bold mb-6 bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent">
                Stay Updated with Moretori Naija
              </h3>
              <p className="text-gray-300 mb-8 text-xl leading-relaxed">
                Get the latest news, reviews, and insights delivered straight to your inbox
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto animate-scale-in">
              <Input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 bg-gray-800/50 backdrop-blur-sm border-gray-600 text-white placeholder-gray-400 focus:border-orange-500 focus:ring-orange-500/20 h-12 transition-all duration-300"
              />
              <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold px-8 h-12 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                Subscribe Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container px-4 lg:px-8 py-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1 animate-fade-in">
            <Link to="/" className="flex items-center space-x-3 mb-8 group">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-500 overflow-hidden bg-gradient-to-br from-orange-400 to-red-500 p-1">
                <img 
                  src="/lovable-uploads/0d5f121b-be39-414c-818b-109e0a3fbf92.png" 
                  alt="Moretori Naija" 
                  className="w-full h-full object-contain rounded-lg bg-white"
                />
              </div>
              <span className="text-2xl font-black bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                Moretori Naija
              </span>
            </Link>
            <p className="text-gray-300 mb-8 leading-relaxed text-lg">
              Your premier destination for technology news, automotive reviews, health tips, and entertainment updates in Nigeria and beyond.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => (
                <a
                  key={social.name}
                  href={social.href}
                  className={`p-3 rounded-xl bg-gray-800/50 backdrop-blur-sm text-gray-400 transition-all duration-500 ${social.color} hover:bg-gray-700/70 hover:scale-110 hover:rotate-6 animate-fade-in`}
                  style={{ animationDelay: `${index * 100}ms` }}
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col animate-fade-in">
            <h4 className="text-xl font-bold mb-8 text-orange-400 relative">
              Quick Links
              <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-orange-400 to-red-400 rounded-full"></div>
            </h4>
            <ul className="space-y-4 flex-1">
              {quickLinks.map((link, index) => (
                <li key={link.name} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-orange-400 transition-all duration-300 flex items-center group text-lg"
                  >
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-4 opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-300"></span>
                    <span className="group-hover:translate-x-2 transition-transform duration-300">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="flex flex-col animate-fade-in">
            <h4 className="text-xl font-bold mb-8 text-orange-400 relative">
              Categories
              <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-orange-400 to-red-400 rounded-full"></div>
            </h4>
            <ul className="space-y-4 flex-1">
              {categories.map((category, index) => (
                <li key={category.name} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <Link
                    to={category.href}
                    className="text-gray-300 hover:text-orange-400 transition-all duration-300 flex items-center group text-lg"
                  >
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-4 opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-300"></span>
                    <span className="group-hover:translate-x-2 transition-transform duration-300">{category.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col animate-fade-in">
            <h4 className="text-xl font-bold mb-8 text-orange-400 relative">
              Contact Info
              <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-orange-400 to-red-400 rounded-full"></div>
            </h4>
            <div className="space-y-6 flex-1">
              <div className="flex items-center text-gray-300 group hover:text-orange-400 transition-all duration-300">
                <div className="p-3 rounded-xl bg-orange-500/20 group-hover:bg-orange-500/30 transition-colors duration-300 mr-4">
                  <Mail className="h-5 w-5 text-orange-500" />
                </div>
                <span className="break-all text-lg">info@moretorinaija.com</span>
              </div>
              <div className="flex items-center text-gray-300 group hover:text-orange-400 transition-all duration-300">
                <div className="p-3 rounded-xl bg-orange-500/20 group-hover:bg-orange-500/30 transition-colors duration-300 mr-4">
                  <Phone className="h-5 w-5 text-orange-500" />
                </div>
                <span className="text-lg">+234 (0) 123 456 7890</span>
              </div>
              <div className="flex items-start text-gray-300 group hover:text-orange-400 transition-all duration-300">
                <div className="p-3 rounded-xl bg-orange-500/20 group-hover:bg-orange-500/30 transition-colors duration-300 mr-4 mt-1">
                  <MapPin className="h-5 w-5 text-orange-500" />
                </div>
                <span className="text-lg">Lagos, Nigeria</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700/50 relative">
        <div className="container px-4 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 text-center md:text-left">
            <div className="text-gray-400 text-lg animate-fade-in">
              © {currentYear} Moretori Naija. All rights reserved. Made with ❤️ in Nigeria
            </div>
            <div className="flex flex-col sm:flex-row sm:space-x-8 space-y-3 sm:space-y-0 text-lg animate-fade-in">
              <Link to="/privacy" className="text-gray-400 hover:text-orange-400 transition-all duration-300 hover:scale-105">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-orange-400 transition-all duration-300 hover:scale-105">
                Terms of Service
              </Link>
              <Link to="/contact" className="text-gray-400 hover:text-orange-400 transition-all duration-300 hover:scale-105">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
