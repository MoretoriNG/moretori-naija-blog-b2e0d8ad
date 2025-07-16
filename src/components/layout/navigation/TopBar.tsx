
import React, { useState, useEffect } from 'react';
import { Calendar, Mail, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

export function TopBar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Update date every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Format date as: Tuesday, May 7, 2025
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  return (
    <div className="bg-gradient-to-r from-blue-700 to-blue-600 text-white py-1.5">
      <div className="container flex justify-between items-center text-sm">
        <div className="flex items-center">
          <Calendar className="h-3.5 w-3.5 mr-1.5" />
          <span className="hidden sm:inline">{formattedDate}</span>
          <span className="sm:hidden">{currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
        </div>
        
        <div className="flex items-center gap-4">
          <Link 
            to="/about" 
            className="flex items-center hover:text-blue-200 transition-colors"
          >
            <Info className="h-3.5 w-3.5 mr-1" />
            <span className="hidden md:inline">About</span>
          </Link>
          
          <a 
            href="mailto:contact@moretorinaija.com" 
            className="flex items-center hover:text-blue-200 transition-colors"
          >
            <Mail className="h-3.5 w-3.5 mr-1" />
            <span className="hidden sm:inline">contact@moretorinaija.com</span>
            <span className="sm:hidden">Contact</span>
          </a>
        </div>
      </div>
    </div>
  );
}
