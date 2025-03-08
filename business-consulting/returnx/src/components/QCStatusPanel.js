'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { CheckCircle, AlertTriangle, Clock, ChevronRight, X, ThumbsUp, ThumbsDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GeminiLoader } from '@/components/LoadingIndicator';

export function QCStatusPanel({ qcItems: initialQcItems }) {
  const [qcItems, setQcItems] = useState(initialQcItems);
  const [activeTab, setActiveTab] = useState('pending');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  useEffect(() => {
    // Update local state if props change
    setQcItems(initialQcItems);
  }, [initialQcItems]);
  
  const changeTab = (tab) => {
    if (tab !== activeTab) {
      setActiveTab(tab);
    }
  };
  
  const filteredItems = qcItems.filter(item => {
    if (activeTab === 'pending') return item.status === 'pending';
    if (activeTab === 'approved') return item.status === 'approved';
    if (activeTab === 'rejected') return item.status === 'rejected';
    return false;
  });
  
  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-5 w-5 text-amber-500" />;
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'rejected':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };
  
  const getCounts = () => {
    const counts = {
      pending: qcItems.filter(i => i.status === 'pending').length,
      approved: qcItems.filter(i => i.status === 'approved').length,
      rejected: qcItems.filter(i => i.status === 'rejected').length
    };
    return counts;
  };
  
  const counts = getCounts();

  const handleItemClick = (item) => {
    // Only allow interaction with pending items
    if (item.status === 'pending') {
      setSelectedItem(item);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Reset the selected item after the modal closes
    setTimeout(() => {
      setSelectedItem(null);
    }, 300);
  };

  const handleAccept = () => {
    setIsProcessing(true);
    
    // In a real implementation, this would call your API
    const updatedItems = qcItems.map(item => 
      item.id === selectedItem.id ? {...item, status: 'approved'} : item
    );
    
    // Simulate API call delay
    setTimeout(() => {
      // Update local state
      setQcItems(updatedItems);
      
      // Change to approved tab to see the newly approved item
      setActiveTab('approved');
      setIsProcessing(false);
      closeModal();
    }, 1000);
  };

  const handleReject = () => {
    setIsProcessing(true);
    
    // In a real implementation, this would call your API
    const updatedItems = qcItems.map(item => 
      item.id === selectedItem.id ? {...item, status: 'rejected'} : item
    );
    
    // Simulate API call delay
    setTimeout(() => {
      // Update local state
      setQcItems(updatedItems);
      
      // Change to rejected tab to see the newly rejected item
      setActiveTab('rejected');
      setIsProcessing(false);
      closeModal();
    }, 1000);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden h-full google-card relative" style={{ display: 'flex', flexDirection: 'column' }}>
      <div className="bg-gray-50 p-3 border-b flex justify-between items-center">
        <div>
          <h2 className="text-lg font-medium text-gray-800">Return QC Status</h2>
          <p className="text-xs text-gray-500">Customer-submitted return photos</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            <div className="h-2 w-2 rounded-full bg-amber-500 mr-1"></div>
            <span className="text-xs text-gray-500">Pending: {counts.pending}</span>
          </div>
          <div className="flex items-center">
            <div className="h-2 w-2 rounded-full bg-green-500 mr-1"></div>
            <span className="text-xs text-gray-500">Approved: {counts.approved}</span>
          </div>
          <div className="flex items-center">
            <div className="h-2 w-2 rounded-full bg-red-500 mr-1"></div>
            <span className="text-xs text-gray-500">Rejected: {counts.rejected}</span>
          </div>
        </div>
      </div>
      
      <div className="flex border-b">
        <button
          className={`flex-1 py-1.5 text-center text-sm font-medium cursor-pointer ${
            activeTab === 'pending' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500 hover:bg-gray-50'
          }`}
          onClick={() => changeTab('pending')}
        >
          Pending ({counts.pending})
        </button>
        <button
          className={`flex-1 py-1.5 text-center text-sm font-medium cursor-pointer ${
            activeTab === 'approved' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500 hover:bg-gray-50'
          }`}
          onClick={() => changeTab('approved')}
        >
          Approved ({counts.approved})
        </button>
        <button
          className={`flex-1 py-1.5 text-center text-sm font-medium cursor-pointer ${
            activeTab === 'rejected' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500 hover:bg-gray-50'
          }`}
          onClick={() => changeTab('rejected')}
        >
          Rejected ({counts.rejected})
        </button>
      </div>
      
      <motion.div 
        className="divide-y"
        initial={false}
        animate={{ opacity: 1 }}
        style={{ minHeight: '240px', maxHeight: '240px', overflowY: 'auto', flex: '1 1 auto' }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <motion.div 
                  key={item.id} 
                  className={`p-2 transition-colors flex items-center ${
                    item.status === 'pending' 
                      ? 'hover:bg-gray-50 cursor-pointer' 
                      : 'cursor-default'
                  }`}
                  onClick={() => handleItemClick(item)}
                  whileHover={item.status === 'pending' ? { backgroundColor: "rgba(0, 0, 0, 0.05)" } : {}}
                >
                  <div className="relative h-10 w-10 rounded-md overflow-hidden mr-3 flex-shrink-0">
                    <Image
                      src={item.image || "/api/placeholder/48/48"}
                      alt={item.productName}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-800 truncate">{item.productName}</p>
                      {getStatusIcon(item.status)}
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-500 truncate">
                        Order #{item.orderId} • {item.customerName}
                      </p>
                      <p className="text-xs text-gray-500">{item.timestamp}</p>
                    </div>
                  </div>
                  
                  {item.status === 'pending' && (
                    <ChevronRight className="h-4 w-4 text-gray-400 ml-2 flex-shrink-0" />
                  )}
                </motion.div>
              ))
            ) : (
              <div className="py-4 text-center text-gray-500">
                No {activeTab} returns found
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
      
      <div className="p-2 bg-gray-50 border-t flex justify-between items-center" style={{ marginTop: 'auto' }}>
        <span className="text-xs text-gray-500">Last updated: Today, 10:45 AM</span>
      </div>

      {/* Modal popup for QC Review */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div 
              className="fixed inset-0 backdrop-blur-sm bg-black/10 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
            />
            
            <motion.div 
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-lg shadow-lg z-50 overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              {selectedItem && (
                <>
                  <div className="p-4 border-b flex justify-between items-center bg-gray-50">
                    <h2 className="text-lg font-medium text-gray-800">QC Review</h2>
                    <motion.button 
                      onClick={closeModal}
                      className="p-1 rounded-full hover:bg-gray-200 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <X className="h-5 w-5 text-gray-500" />
                    </motion.button>
                  </div>
                  
                  <div className="p-4 overflow-y-auto max-h-96">
                    <div className="mb-4">
                      <div className="text-sm font-medium text-gray-700 mb-1">Product</div>
                      <div className="flex items-center">
                        <div className="relative h-16 w-16 rounded-md overflow-hidden mr-3">
                          <Image
                            src={selectedItem.image || "/api/placeholder/64/64"}
                            alt={selectedItem.productName}
                            fill
                            style={{ objectFit: 'cover' }}
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{selectedItem.productName}</p>
                          <p className="text-xs text-gray-500">Order #{selectedItem.orderId}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="text-sm font-medium text-gray-700 mb-1">Customer</div>
                      <p className="text-sm">{selectedItem.customerName}</p>
                    </div>
                    
                    <div className="mb-4">
                      <div className="text-sm font-medium text-gray-700 mb-1">Return Reason</div>
                      <p className="text-sm">{selectedItem.reason || "Item doesn't match description"}</p>
                    </div>
                    
                    <div className="mb-4">
                      <div className="text-sm font-medium text-gray-700 mb-1">Customer Photos</div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="relative h-32 rounded-md overflow-hidden">
                          <Image
                            src="/api/placeholder/150/150"
                            alt="Return photo 1"
                            fill
                            style={{ objectFit: 'cover' }}
                          />
                        </div>
                        <div className="relative h-32 rounded-md overflow-hidden">
                          <Image
                            src="/api/placeholder/150/150"
                            alt="Return photo 2"
                            fill
                            style={{ objectFit: 'cover' }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border-t bg-gray-50">
                    <div className="flex space-x-3">
                      {isProcessing ? (
                        <div className="flex-1 flex items-center justify-center py-2">
                          <GeminiLoader size="small" />
                        </div>
                      ) : (
                        <>
                          <motion.button 
                            onClick={handleReject}
                            className="flex-1 flex items-center justify-center px-4 py-2 border border-red-500 text-red-500 rounded-md hover:bg-red-50 transition-colors text-sm font-medium"
                            whileHover={{ backgroundColor: "rgba(254, 226, 226, 0.5)" }}
                            whileTap={{ scale: 0.98 }}
                            disabled={isProcessing}
                          >
                            <ThumbsDown className="h-4 w-4 mr-2" />
                            Reject
                          </motion.button>
                          <motion.button 
                            onClick={handleAccept}
                            className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm font-medium"
                            whileHover={{ backgroundColor: "#3b82f6" }}
                            whileTap={{ scale: 0.98 }}
                            disabled={isProcessing}
                          >
                            <ThumbsUp className="h-4 w-4 mr-2" />
                            Approve
                          </motion.button>
                        </>
                      )}
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}