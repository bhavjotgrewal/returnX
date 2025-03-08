'use client';

import Image from 'next/image';

export default function ActionCard({ number, title, description, image }) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="flex flex-col md:flex-row flex-wrap">
        <div className="md:w-1/3 relative h-64 md:h-auto">
          <Image 
            src={image || "/api/placeholder/400/320"} 
            alt={title} 
            fill
            style={{ objectFit: 'cover' }}
            className="border-r border-gray-100"
          />
        </div>
        
        <div className="p-6 md:w-2/3 flex flex-col">
          <div className="flex items-center mb-3">
            <div className="bg-indigo-100 text-indigo-600 h-8 w-8 rounded-full flex items-center justify-center font-medium mr-3">
              {number}
            </div>
            <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
          </div>
          
          <div className="flex-1">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">{description}</p>
            </div>
          
            <div className="mt-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Current</div>
                  <div className="bg-gray-100 rounded-lg p-3">
                    <div className="text-lg font-semibold text-gray-700">48%</div>
                    <div className="text-xs text-gray-500">of total returns</div>
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-500 mb-1">Predicted</div>
                  <div className="bg-gray-100 rounded-lg p-3">
                    <div className="flex items-center">
                      <div className="text-lg font-semibold text-red-500">-$2310</div>
                      <svg className="h-4 w-4 text-red-500 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                      </svg>
                    </div>
                    <div className="text-xs text-gray-500">in profit</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <button className="bg-indigo-100 text-indigo-600 px-4 py-2 rounded-md font-medium flex items-center hover:bg-indigo-200 transition-colors">
              <svg className="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Use Suggestion
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}