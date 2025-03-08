'use client';

import { useState } from 'react';
import { Menu, Search, Bell } from 'lucide-react';

export function Header() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  return (
    <header className="bg-white shadow-sm h-16 fixed top-0 right-0 left-0 z-20 ml-16 md:ml-60">
      <div className="flex h-full items-center justify-between px-6">
        <div className="flex items-center w-full max-w-xl">
          <div className="md:hidden mr-4">
            <button className="text-gray-500 hover:text-gray-700">
              <Menu size={20} />
            </button>
          </div>
          
          <div className="flex items-center h-10 bg-gray-100 rounded-full w-full px-4">
            <Search size={18} className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent border-none outline-none text-sm flex-1"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100">
            <Bell size={20} />
          </button>
          
          <div className="relative">
            <button 
              onClick={() => setShowProfileMenu(!showProfileMenu)} 
              className="relative flex items-center justify-center h-9 w-9 rounded-full bg-google-blue text-white overflow-hidden"
            >
              <img 
                src="/api/placeholder/36/36" 
                alt="Profile" 
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.style.display = 'none';
                  e.target.parentNode.innerText = 'U';
                }}
              />
            </button>
            
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-60 bg-white shadow-lg rounded-md py-1 z-50">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-medium">User Name</p>
                  <p className="text-xs text-gray-500">user@example.com</p>
                </div>
                <div className="py-1">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Help</a>
                  <div className="border-t border-gray-100"></div>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}