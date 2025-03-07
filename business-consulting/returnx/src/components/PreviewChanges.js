'use client';

import { motion } from 'framer-motion';

// Change to default export
export default function PreviewChanges({ onReject }) {
  return (
    <div className="p-6 flex flex-col items-center justify-center space-y-4 min-h-[400px]">
      <motion.h2 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-xl font-medium text-indigo-600"
      >
        Preview Changes
      </motion.h2>
      
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="w-6 h-6"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 3H19V5H15V3ZM15 7H19V9H15V7ZM15 11H19V13H15V11ZM15 15H19V17H15V15ZM3 3H13V9H3V3ZM3 11H13V21H3V11ZM5 5V7H11V5H5ZM5 13V19H11V13H5Z" fill="#6B7280"/>
        </svg>
      </motion.div>
      
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex gap-4 mt-8"
      >
        <button 
          onClick={onReject}
          className="bg-white border border-red-500 text-red-500 hover:bg-red-50 px-6 py-2 rounded-full flex items-center justify-center gap-2 transition-all duration-200"
        >
          <span>Reject</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full flex items-center justify-center gap-2 transition-all duration-200">
          <span>Accept</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </motion.div>
    </div>
  );
}