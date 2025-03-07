'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function GenerateActionsButton() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    setIsLoading(true);
    
    // Simulate loading for 2 seconds before navigating
    setTimeout(() => {
      router.push('/promote');
    }, 2000);
  };

  return (
    <button 
      onClick={handleClick}
      disabled={isLoading}
      className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-full flex items-center justify-center gap-2 shadow-md transition-all duration-200 disabled:opacity-70"
    >
      <span>{isLoading ? 'Generating...' : 'Generate Actions'}</span>
      {isLoading ? (
        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 4V20M20 12L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
    </button>
  );
}
  