'use client';

import { useRouter } from 'next/navigation';

export function GenerateActionsButton() {
  const router = useRouter();
  
  const handleClick = () => {
    router.push('/promote');
  };
  
  return (
    <button
      onClick={handleClick}
      className="google-button px-6 py-3 rounded-md shadow-md hover:shadow-lg transition-all flex items-center"
    >
      <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3v3m0 4.5V12m0 4.5V18m-5.4-15h10.8c.84 0 1.26 0 1.59.16.29.15.52.38.67.67.16.33.16.75.16 1.59v4.16c0 .84 0 1.26-.16 1.59-.15.29-.38.52-.67.67-.33.16-.75.16-1.59.16H5.4c-.84 0-1.26 0-1.59-.16a1.5 1.5 0 0 1-.67-.67c-.16-.33-.16-.75-.16-1.59V5.42c0-.84 0-1.26.16-1.59.15-.29.38-.52.67-.67.33-.16.75-.16 1.59-.16z" />
      </svg>
      <span>Generate Actions</span>
    </button>
  );
}