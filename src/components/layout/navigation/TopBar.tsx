
import React, { useState, useEffect } from 'react';
import { Calendar, Mail } from 'lucide-react';

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
      <div className="container flex justify-between items-center">
        <div className="flex items-center text-sm">
          <Calendar className="h-3.5 w-3.5 mr-1.5" />
          <span>{formattedDate}</span>
        </div>
        <div className="flex items-center">
          <a href="mailto:contact@moretorinaija.com" className="flex items-center text-xs hover:text-blue-200 transition-colors">
            <Mail className="h-3.5 w-3.5 mr-1" />
            <span className="hidden sm:inline">contact@moretorinaija.com</span>
          </a>
        </div>
      </div>
    </div>
  );
}
