'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PreviewChanges from '@/components/PreviewChanges';

// Change to default export
export default function ActionCard({ number, title, image, description }) {
  const [showPreview, setShowPreview] = useState(false);
  
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden relative">
      <AnimatePresence mode="wait">
        {showPreview ? (
          <motion.div
            key="preview"
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <PreviewChanges onReject={() => setShowPreview(false)} />
          </motion.div>
        ) : (
          <motion.div
            key="card"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-gray-100 w-6 h-6 rounded-full flex items-center justify-center text-gray-600">
                  {number}
                </div>
                <h3 className="text-sm font-medium text-indigo-600">{title}</h3>
              </div>
              
              <div className="mt-2">
                <div className="rounded-lg overflow-hidden mb-3">
                  <img src={image} alt={title} className="w-full object-cover" />
                </div>
                
                <p className="text-gray-600 text-sm">{description}</p>
                
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <div className="bg-gray-100 p-2 rounded">
                      <div className="flex justify-between">
                        <span>-15.2%</span>
                        <span className="text-green-500">↑</span>
                      </div>
                      <div className="text-gray-500 text-xs">return rate</div>
                    </div>
                  </div>
                  <div>
                    <div className="bg-gray-100 p-2 rounded">
                      <div className="flex justify-between">
                        <span>+10.5%</span>
                        <span className="text-red-500">↓</span>
                      </div>
                      <div className="text-gray-500 text-xs">yearly change</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-2 flex justify-end">
              <button 
                onClick={() => setShowPreview(true)}
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-1 rounded-full text-xs transition-all duration-200 flex items-center gap-1"
              >
                <span>Edit Suggestion</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}