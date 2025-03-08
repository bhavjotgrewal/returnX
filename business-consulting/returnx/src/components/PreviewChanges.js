'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function PreviewChanges({ title, description, onAccept, onReject, isSubmitting }) {
  const [editedText, setEditedText] = useState(description);
  
  return (
    <div className="p-6 flex flex-col space-y-6">
      <motion.div 
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <h4 className="text-sm font-medium text-gray-500 mb-2">Suggestion Title</h4>
        <p className="text-gray-900 font-medium">{title}</p>
      </motion.div>
      
      <motion.div 
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="w-full"
      >
        <h4 className="text-sm font-medium text-gray-500 mb-2">Edit Description</h4>
        <textarea
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-3 h-32 focus:ring-2 focus:ring-google-blue focus:border-google-blue"
          placeholder="Edit the suggestion text..."
        />
      </motion.div>
      
      <motion.div 
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex justify-end space-x-3 pt-2"
      >
        <button 
          onClick={onReject}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          disabled={isSubmitting}
        >
          Cancel
        </button>
        
        <button 
          onClick={() => onAccept(editedText)}
          disabled={isSubmitting}
          className="google-button px-4 py-2 rounded-md font-medium flex items-center"
        >
          {isSubmitting && (
            <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
          )}
          {isSubmitting ? 'Applying...' : 'Apply Changes'}
        </button>
      </motion.div>
    </div>
  );
}