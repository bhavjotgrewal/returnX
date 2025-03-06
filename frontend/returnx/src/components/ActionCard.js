'use client';

import { useState } from 'react';
import PreviewChanges from '@/components/PreviewChanges';

// Change to default export
export default function ActionCard({ number, title, image, description }) {
  const [showPreview, setShowPreview] = useState(false);
  
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {showPreview ? (
        <div className="animate-fade-in">
          <PreviewChanges onReject={() => setShowPreview(false)} />
        </div>
      ) : (
        <div className="animate-fade-in">
          <div className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-gray-100 w-6 h-6 rounded-full flex items-center justify-center text-gray-600">
                {number}
              </div>
              <h3 className="text-sm font-medium text-indigo-600">{title}</h3>
            </div>
            
            <div className="flex gap-4">
              <div className="rounded-lg overflow-hidden w-36 h-36 flex-shrink-0">
                <img src={image} alt={title} className="w-full h-full object-cover" />
              </div>
              
              <div>
                <div className="bg-gray-100 rounded-lg p-3 mb-3">
                  <p className="text-xs text-gray-600">
                    {description}
                  </p>
                  <a href="#" className="text-xs text-indigo-600 mt-1 block">Edit Plan</a>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-gray-100 p-2 rounded">
                    <div className="flex justify-between">
                      <span>+10.5%</span>
                      <span className="text-red-500">↓</span>
                    </div>
                    <div className="text-gray-500 text-xs">of total returns</div>
                  </div>
                  
                  <div className="bg-gray-100 p-2 rounded">
                    <div className="flex justify-between">
                      <span>$243.15</span>
                      <span className="text-red-500">↓</span>
                    </div>
                    <div className="text-gray-500 text-xs">avg value lost</div>
                  </div>
                  
                  <div className="bg-gray-100 p-2 rounded">
                    <div className="flex justify-between">
                      <span>+10.5%</span>
                      <span className="text-red-500">↓</span>
                    </div>
                    <div className="text-gray-500 text-xs">monthly change</div>
                  </div>
                  
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
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-1 rounded-full text-xs transition-all duration-200"
            >
              Edit Suggestion
            </button>
          </div>
        </div>
      )}
    </div>
  );
}