"use client";

import { useState } from 'react';

export default function ApiKeyDisplay({ apiKey }) {
  const [showKey, setShowKey] = useState(false);
  
  return (
    <div className="py-3 border-b border-gray-100 last:border-0">
      <div className="mb-2">
        <h3 className="font-medium text-gray-800">API Key</h3>
        <p className="text-sm text-gray-500">Your secret API key for accessing the ReturnX API</p>
      </div>
      <div className="flex items-center">
        <input 
          type={showKey ? "text" : "password"}
          value={apiKey}
          readOnly
          className="flex-1 border border-gray-300 rounded-l-md px-3 py-2 bg-gray-50"
        />
        <button 
          onClick={() => setShowKey(!showKey)}
          className="bg-gray-100 hover:bg-gray-200 border border-gray-300 border-l-0 rounded-r-md px-3 py-2 transition-all duration-200"
        >
          {showKey ? "Hide" : "Show"}
        </button>
      </div>
    </div>
  );
}