'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  BarChart2, 
  MessageSquareText, 
  Settings,
} from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  
  const navItems = [
    {
      name: 'Performance',
      href: '/dashboard',
      icon: BarChart2,
    },
    {
      name: 'Promote',
      href: '/promote',
      icon: MessageSquareText,
    },
    {
      name: 'Settings',
      href: '/settings',
      icon: Settings,
    },
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-16 md:w-60 bg-white shadow-sm z-10 flex flex-col overflow-y-auto overflow-x-hidden">
      <div className="p-4 border-b flex items-center gap-3">
        <div className="relative h-8 w-8">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="h-8 w-8">
            <path d="M50 10 C 25 10, 10 30, 10 50 C 10 70, 30 90, 50 90 C 70 90, 90 70, 90 50 C 90 30, 75 10, 50 10" fill="none" stroke="#4e8de7" strokeWidth="8" />
            <path d="M70 25 L 45 65 L 30 50" fill="none" stroke="#4e8de7" strokeWidth="8" strokeLinecap="round" />
          </svg>
        </div>
        <span className="text-xl font-semibold text-google-blue hidden md:block">ReturnX</span>
      </div>

      <nav className="flex-1 pt-6">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center px-4 py-3 text-gray-600 transition-colors ${
                    isActive ? 'bg-google-blue bg-opacity-10 text-google-blue border-r-4 border-google-blue' : 'hover:bg-gray-100'
                  }`}
                >
                  <item.icon className={`h-5 w-5 ${isActive ? 'text-google-blue' : 'text-gray-500'}`} />
                  <span className={`ml-3 hidden md:block ${isActive ? 'font-medium' : ''}`}>
                    {item.name}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}