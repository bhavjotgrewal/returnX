'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PreviewChanges from '@/components/PreviewChanges';
import SuccessNotification from '@/components/SuccessNotification';

export default function ActionCard({ number, title, description, image, improvedDescription, onActionApplied }) {
  const [showPreview, setShowPreview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const handleUseSuggestion = () => {
    setShowPreview(true);
  };
  
  const handleReject = () => {
    setShowPreview(false);
  };
  
  const handleAccept = async (editedText) => {
    setIsSubmitting(true);
    
    try {
      // Call the API to apply changes
      const response = await fetch('/api/returns_analysis/applyAction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: number,
          description: editedText,
          timestamp: new Date().toISOString()
        }),
      });
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to apply changes');
      }
      
      // Close the preview
      setShowPreview(false);
      
      // Show success notification
      setShowSuccess(true);
      
      // Hide success notification after 2 seconds
      setTimeout(() => {
        setShowSuccess(false);
        // Notify parent component to remove this action
        if (onActionApplied) {
          onActionApplied(number);
        }
      }, 2000);
      
    } catch (error) {
      console.error('Error applying changes:', error);
      alert('Failed to apply changes: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden google-card">
      <div className="flex flex-col">
        <div className="p-6 flex flex-col">
          <div className="flex items-center mb-3">
            <div className="bg-google-blue bg-opacity-20 text-google-blue h-8 w-8 rounded-full flex items-center justify-center font-medium mr-3">
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
            <button 
              onClick={handleUseSuggestion}
              className="google-button px-4 py-2 rounded-md font-medium flex items-center"
            >
              <svg className="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Use Suggestion
            </button>
          </div>
        </div>
      </div>
      
      {/* Preview Changes Modal */}
      <AnimatePresence>
        {showPreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          >
            {/* Semi-transparent backdrop */}
            <div 
              className="absolute inset-0 bg-black/30 backdrop-blur-sm"
              onClick={handleReject}
            ></div>
            
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-lg shadow-xl overflow-hidden max-w-2xl w-full google-card relative z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-lg font-medium text-google-blue">Preview Changes</h3>
                <button 
                  onClick={handleReject}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <PreviewChanges 
                title={title}
                description={improvedDescription || description}
                onAccept={handleAccept}
                onReject={handleReject}
                isSubmitting={isSubmitting}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Success Notification */}
      <AnimatePresence>
        {showSuccess && <SuccessNotification message="Changes applied successfully!" />}
      </AnimatePresence>
    </div>
  );
}