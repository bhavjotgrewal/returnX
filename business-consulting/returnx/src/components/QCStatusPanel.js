'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, AlertTriangle, Clock, ChevronRight, X, ThumbsUp, ThumbsDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GeminiLoader } from '@/components/LoadingIndicator';

export function QCStatusPanel() {
  const [qcItems, setQcItems] = useState([]);
  const [activeTab, setActiveTab] = useState('pending');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  
  // Fetch returns data from API
  useEffect(() => {
    async function fetchReturns() {
      try {
        setIsLoading(true);
        const response = await fetch('/api/returns');
        if (response.ok) {
          const data = await response.json();
          setQcItems(data);
        } else {
          console.error('Failed to fetch returns');
        }
      } catch (error) {
        console.error('Error fetching returns:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchReturns();
  }, []);
  
  const changeTab = (tab) => {
    if (tab !== activeTab) {
      setActiveTab(tab);
    }
  };
  
  const filteredItems = qcItems.filter(item => {
    if (activeTab === 'pending') return item.status === 'Pending';
    if (activeTab === 'approved') return item.status === 'Approved';
    if (activeTab === 'rejected') return item.status === 'Rejected';
    return false;
  });
  
  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending':
        return <Clock className="h-5 w-5 text-amber-500" />;
      case 'Approved':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'Rejected':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };
  
  const getCounts = () => {
    const counts = {
      pending: qcItems.filter(i => i.status === 'Pending').length,
      approved: qcItems.filter(i => i.status === 'Approved').length,
      rejected: qcItems.filter(i => i.status === 'Rejected').length
    };
    return counts;
  };
  
  const counts = getCounts();

  const handleItemClick = (item) => {
    // Only allow interaction with pending items
    if (item.status === 'Pending') {
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

  const handleAccept = async () => {
    setIsProcessing(true);
    
    try {
      // Call API to update return status
      const response = await fetch(`/api/returns/${selectedItem.id}/status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          status: 'Approved' 
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update return status');
      }
      
      // Update local state
      const updatedItems = qcItems.map(item => 
        item.id === selectedItem.id ? {...item, status: 'Approved'} : item
      );
      
      setQcItems(updatedItems);
      
      // Change to approved tab to see the newly approved item
      setActiveTab('approved');
      closeModal();
      
      // Navigate to the suggestions page based on this return
      router.push(`/promote?returnId=${selectedItem.id}&productId=${selectedItem.productInfo.id}`);
      
    } catch (error) {
      console.error('Error updating return status:', error);
      alert('Failed to update status: ' + error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReject = async () => {
    setIsProcessing(true);
    
    try {
      // Call API to update return status
      const response = await fetch(`/api/returns/${selectedItem.id}/status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          status: 'Rejected' 
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update return status');
      }
      
      // Update local state
      const updatedItems = qcItems.map(item => 
        item.id === selectedItem.id ? {...item, status: 'Rejected'} : item
      );
      
      setQcItems(updatedItems);
      
      // Change to rejected tab to see the newly rejected item
      setActiveTab('rejected');
      closeModal();
      
    } catch (error) {
      console.error('Error updating return status:', error);
      alert('Failed to update status: ' + error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm overflow-hidden h-full google-card relative flex flex-col items-center justify-center" style={{ minHeight: '400px' }}>
        <GeminiLoader />
        <p className="mt-4 text-gray-500">Loading returns...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden h-full google-card relative" style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Panel header */}
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
      
      {/* Tabs */}
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
          Viewed ({counts.approved})
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
      
      {/* Returns list */}
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
                    item.status === 'Pending' 
                      ? 'hover:bg-gray-50 cursor-pointer' 
                      : 'cursor-default'
                  }`}
                  onClick={() => handleItemClick(item)}
                  whileHover={item.status === 'Pending' ? { backgroundColor: "rgba(0, 0, 0, 0.05)" } : {}}
                >
                  <div className="relative h-10 w-10 rounded-md overflow-hidden mr-3 flex-shrink-0">
                    <Image
                      src={`/api/returns/images/${item.imagePath}` || "/api/placeholder/48/48"}
                      alt={item.productInfo?.name || "Product"}
                      width={48}
                      height={48}
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-800 truncate">{item.productInfo?.name || "Product"}</p>
                      {getStatusIcon(item.status)}
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-500 truncate">
                        Order #{item.orderId} • Customer {item.orderId % 1000}
                      </p>
                      <p className="text-xs text-gray-500">{new Date(item.timestamp).toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                  {item.status === 'Pending' && (
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
        <span className="text-xs text-gray-500">Last updated: {new Date().toLocaleString()}</span>
      </div>

      {/* Modal popup for QC Review */}
      <AnimatePresence>
        {isModalOpen && selectedItem && (
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
                    {/* <div className="relative h-16 w-16 rounded-md overflow-hidden mr-3">
                      <Image
                        src={`/api/return-images/${selectedItem.imagePath}` || "/api/placeholder/64/64"}
                        alt={selectedItem.productInfo?.name || "Product"}
                        width={64}
                        height={64}
                        style={{ objectFit: 'cover' }}
                      />
                    </div> */}
                    <div>
                      <p className="text-sm font-medium">{selectedItem.productInfo?.name || "Product"}</p>
                      <p className="text-xs text-gray-500">Order #{selectedItem.orderId}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="text-sm font-medium text-gray-700 mb-1">Customer</div>
                  <p className="text-sm">Customer {selectedItem.orderId % 1000}</p>
                </div>
                
                <div className="mb-4">
                  <div className="text-sm font-medium text-gray-700 mb-1">Return Reason</div>
                  <p className="text-sm">{selectedItem.reason || "Item doesn't match description"}</p>
                </div>
                
                <div className="mb-4">
                  <div className="text-sm font-medium text-gray-700 mb-1">Customer Photos</div>
                  <div className="grid grid-cols-1 gap-2">
                    <div className="relative h-32 rounded-md overflow-hidden">
                      <Image
                        src={`/api/returns/images/${selectedItem.imagePath}` || "/api/placeholder/150/150"}
                        alt="Return photo"
                        width={150}
                        height={150}
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                  </div>
                </div>
                
                {/* {selectedItem.analysis && (
                  <div className="mb-4 bg-blue-50 p-3 rounded">
                    <div className="text-sm font-medium text-blue-700 mb-1">AI Analysis</div>
                    <div className="text-sm space-y-1">
                      <p>
                        <span className="font-medium">Product Identified: </span>
                        <span className={selectedItem.analysis.productIdentified ? "text-green-600" : "text-red-600"}>
                          {selectedItem.analysis.productIdentified ? "Yes" : "No"}
                        </span>
                      </p>
                      <p>
                        <span className="font-medium">Defects Found: </span>
                        <span className={selectedItem.analysis.defectsFound ? "text-red-600" : "text-green-600"}>
                          {selectedItem.analysis.defectsFound ? "Yes" : "No"}
                        </span>
                      </p>
                      {selectedItem.analysis.defectsFound && (
                        <p>
                          <span className="font-medium">Defect Type: </span>
                          <span>{selectedItem.analysis.defectType}</span>
                        </p>
                      )}
                      <p>
                        <span className="font-medium">Return Eligible: </span>
                        <span className={selectedItem.analysis.returnEligible ? "text-green-600" : "text-red-600"}>
                          {selectedItem.analysis.returnEligible ? "Yes" : "No"}
                        </span>
                      </p>
                    </div>
                  </div>
                )} */}
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
                        Approve & View Suggestions
                      </motion.button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}