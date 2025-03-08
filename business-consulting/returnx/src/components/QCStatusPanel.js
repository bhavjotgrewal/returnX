'use client';

import Image from 'next/image';
import { useState } from 'react';
import { CheckCircle, AlertTriangle, Clock, ChevronRight } from 'lucide-react';

export function QCStatusPanel({ qcItems }) {
  const [activeTab, setActiveTab] = useState('pending');
  
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

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden h-full">
      <div className="bg-gray-50 p-4 border-b">
        <h2 className="text-lg font-medium text-gray-800">Return QC Status</h2>
        <p className="text-sm text-gray-500">Customer-submitted return photos</p>
      </div>
      
      <div className="flex border-b">
        <button
          className={`flex-1 py-2 text-center text-sm font-medium ${
            activeTab === 'pending' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('pending')}
        >
          Pending ({counts.pending})
        </button>
        <button
          className={`flex-1 py-2 text-center text-sm font-medium ${
            activeTab === 'approved' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('approved')}
        >
          Approved ({counts.approved})
        </button>
        <button
          className={`flex-1 py-2 text-center text-sm font-medium ${
            activeTab === 'rejected' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('rejected')}
        >
          Rejected ({counts.rejected})
        </button>
      </div>
      
      <div className="divide-y overflow-auto" style={{ maxHeight: '350px' }}>
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div key={item.id} className="p-3 hover:bg-gray-50 transition-colors flex items-center">
              <div className="relative h-12 w-12 rounded-md overflow-hidden mr-3 flex-shrink-0">
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
              
              <ChevronRight className="h-4 w-4 text-gray-400 ml-2 flex-shrink-0" />
            </div>
          ))
        ) : (
          <div className="py-8 text-center text-gray-500">
            No {activeTab} returns found
          </div>
        )}
      </div>
      
      <div className="p-3 bg-gray-50 border-t">
        <button className="w-full py-2 text-indigo-600 text-sm font-medium hover:text-indigo-700 transition-colors text-center">
          View All QC Items
        </button>
      </div>
    </div>
  );
}