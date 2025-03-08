'use client';

import { useState, useRef, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../../context/CartContext';
import { jsPDF } from 'jspdf';

export default function Return() {
const params = useParams();
const router = useRouter();
const { orders, setOrders } = useCart();
const [reason, setReason] = useState('');
const [step, setStep] = useState(1);
const [uploadedImage, setUploadedImage] = useState(null);
const [isAnalyzing, setIsAnalyzing] = useState(false);
const [analysisResult, setAnalysisResult] = useState(null);
const [returnApproved, setReturnApproved] = useState(false);
const fileInputRef = useRef(null);

// Find the order by ID
const order = orders.find(o => o.id === Number(params.id));

if (!order) {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-3xl font-bold mb-4">Order Not Found</h1>
      <p className="mb-8">Sorry, we couldn't find the order you're looking for.</p>
      <button 
        className="bg-black text-white px-8 py-3"
        onClick={() => router.push('/account')}
      >
        Return to My Orders
      </button>
    </div>
  );
}

const handleImageUpload = (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      setUploadedImage(reader.result);
    };
    reader.readAsDataURL(file);
  }
};

const analyzeImage = () => {
  setIsAnalyzing(true);
  
  // Simulate AI analysis with a timeout
  setTimeout(() => {
    // For demo purposes, we'll always approve the return
    setIsAnalyzing(false);
    setAnalysisResult({
      productIdentified: true,
      defectsFound: true,
      defectType: 'Fabric tear',
      returnEligible: true
    });
    setReturnApproved(true);
  }, 3000);
};

const printLabel = () => {
  const printContent = document.getElementById('return-label');
  const originalContents = document.body.innerHTML;
  
  if (printContent) {
    // Create a print-friendly version
    document.body.innerHTML = printContent.innerHTML;
    window.print();
    // Restore original content
    document.body.innerHTML = originalContents;
    // Need to re-bind event handlers after restoring original content
    window.location.reload();
  }
};

const downloadPDF = () => {
  const returnId = `RT${Math.floor(Math.random() * 10000000).toString().padStart(7, '0')}`;
  const doc = new jsPDF();
  
  // Add content to PDF
  doc.setFontSize(22);
  doc.text('Return Label', 105, 20, { align: 'center' });
  
  doc.setFontSize(14);
  doc.text(`Order #: ${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`, 20, 40);
  doc.text(`Generated: ${new Date().toLocaleDateString()}`, 20, 50);
  
  doc.setFontSize(12);
  doc.text('From:', 20, 70);
  doc.text('Customer Name', 20, 80);
  doc.text('123 Customer Address', 20, 90);
  doc.text('Customer City, ST 12345', 20, 100);
  
  doc.text('To:', 120, 70);
  doc.text('CLOUD Returns Department', 120, 80);
  doc.text('789 Warehouse Avenue', 120, 90);
  doc.text('Warehouse City, ST 54321', 120, 100);
  
  doc.line(20, 110, 190, 110);
  doc.text('Return Items:', 20, 120);
  
  let yPosition = 130;
  order.items.forEach(item => {
    doc.text(`${item.name} - ${item.size || 'XS'}, ${item.selectedColor || 'burgundy'}`, 20, yPosition);
    doc.text(`${item.price} ${item.currency}`, 150, yPosition);
    yPosition += 10;
  });
  
  doc.line(20, yPosition, 190, yPosition);
  yPosition += 10;
  
  // Barcode section
  doc.rect(50, yPosition, 110, 40);
  doc.setFontSize(14);
  doc.text('SCAN BARCODE BELOW', 105, yPosition + 10, { align: 'center' });
  doc.text('[Barcode Placeholder]', 105, yPosition + 25, { align: 'center' });
  doc.text(`Return ID: ${returnId}`, 105, yPosition + 38, { align: 'center' });
  
  yPosition += 50;
  
  doc.setFontSize(10);
  doc.text('Please ensure all items are in their original condition. Include all tags, packaging, and accessories.', 20, yPosition);
  doc.text('Refunds will be processed within 7-10 business days after we receive your return.', 20, yPosition + 10);
  
  doc.save(`return-label-${returnId}.pdf`);
};

const handleNextStep = () => {
  if (step === 1) {
    if (!reason) {
      alert('Please provide a reason for your return');
      return;
    }
    setStep(2);
  }
};

const generateReturnLabel = () => {
  // Move to the next step to show the label
  setStep(3);
};'use client';

const handleReturn = () => {
  // Mark the order as returned but don't remove it
  const updatedOrders = orders.map(o => {
    if (o.id === Number(params.id)) {
      return {
        ...o,
        status: 'Returned',
        returnDate: new Date().toISOString()
      };
    }
    return o;
  });
  
  // Update orders with the modified list
  setOrders(updatedOrders);
  
  // Show confirmation and redirect
  alert('Return processed successfully!');
  router.push('/account');
};

return (
  <div className="container mx-auto px-4 py-8">
    <motion.div 
      className="max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center mb-6">
        <h1 className="text-3xl font-bold">Return Your Order</h1>
      </div>
      
      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-8">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-black text-white' : 'bg-gray-200'}`}>1</div>
        <div className={`w-20 h-1 ${step >= 2 ? 'bg-black' : 'bg-gray-200'}`}></div>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-black text-white' : 'bg-gray-200'}`}>2</div>
        <div className={`w-20 h-1 ${step >= 3 ? 'bg-black' : 'bg-gray-200'}`}></div>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-black text-white' : 'bg-gray-200'}`}>3</div>
      </div>
      
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div>
              {order.items.map(item => (
                <motion.div 
                  key={item.id} 
                  className="mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex mb-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-32 h-32 object-cover bg-gray-100 mr-4"
                    />
                    
                    <div className="flex-grow">
                      <h3 className="text-xl font-bold">{item.name}</h3>
                      <p className="text-sm text-gray-700 mb-2">
                        The {item.name} are our best-selling {item.category}-style piece, made from a luxuriously soft and comfortable organic cotton with a weighty, high quality feel.
                      </p>
                      
                      <div className="mb-1">
                        <span className="font-medium">size: </span>
                        <span>{item.size || 'XS'}</span>
                      </div>
                      
                      <div className="mb-1">
                        <span className="font-medium">colour: </span>
                        <span>{item.selectedColor || 'burgundy'}</span>
                      </div>
                      
                      <div className="mb-1">
                        <span className="font-medium">compositions: </span>
                        <span>{item.composition || '95% organic certified cotton, 5% elastane'}</span>
                      </div>
                      
                      <p className="font-medium mt-2">${item.price} {item.currency}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">Why are you returning your purchase?</h3>
                <textarea
                  className="w-full h-32 p-4 border border-gray-300 mb-6 rounded"
                  placeholder="Type here..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                ></textarea>
                
                <div className="text-center">
                  <motion.button
                    className="bg-black text-white px-12 py-3 rounded"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextStep}
                  >
                    Continue
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <h2 className="text-2xl font-bold mb-6">Upload Product Photo</h2>
            <p className="text-gray-600 mb-8">
              Please upload a clear photo of the product you wish to return. Our AI system will analyze the image to verify the product and any defects.
            </p>
            
            <div className="mb-8">
              {!uploadedImage ? (
                <div 
                  className="border-2 border-dashed border-gray-300 rounded-lg p-12 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => fileInputRef.current.click()}
                >
                  <motion.div 
                    className="flex flex-col items-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="text-gray-500">Click to upload or drag and drop</p>
                    <p className="text-gray-400 text-sm mt-1">PNG, JPG, or JPEG (max. 5MB)</p>
                  </motion.div>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </div>
              ) : (
                <div className="relative">
                  <img 
                    src={uploadedImage} 
                    alt="Uploaded product" 
                    className="max-h-96 mx-auto rounded-lg"
                  />
                  <button 
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center"
                    onClick={() => setUploadedImage(null)}
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>
            
            {uploadedImage && !isAnalyzing && !analysisResult && (
              <motion.button
                className="bg-blue-400 text-white px-12 py-3 rounded-full"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={analyzeImage}
              >
                Analyze Image
              </motion.button>
            )}
            
            {isAnalyzing && (
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin mb-4"></div>
                <p>Analyzing image with AI...</p>
              </div>
            )}
            
            {analysisResult && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto mb-8"
              >
                <h3 className="text-xl font-bold mb-4">Analysis Results</h3>
                <div className="space-y-2 text-left mb-6">
                  <p>
                    <span className="font-medium">Product Identified: </span>
                    <span className="text-green-500">✓ Yes</span>
                  </p>
                  <p>
                    <span className="font-medium">Defects Found: </span>
                    <span className="text-green-500">✓ Yes</span>
                  </p>
                  <p>
                    <span className="font-medium">Defect Type: </span>
                    <span>Fabric tear</span>
                  </p>
                  <p>
                    <span className="font-medium">Return Eligible: </span>
                    <span className="text-green-500">✓ Approved</span>
                  </p>
                </div>
                
                <motion.button
                  className="bg-blue-400 text-white px-12 py-3 rounded-full"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={generateReturnLabel}
                >
                  Generate Return Label
                </motion.button>
              </motion.div>
            )}
            
            <div className="mt-4">
              <button 
                className="text-gray-500 underline"
                onClick={() => setStep(1)}
              >
                ← Back
              </button>
            </div>
          </motion.div>
        )}
        
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <h2 className="text-2xl font-bold mb-6">Return Label Generated</h2>
            <p className="text-gray-600 mb-8">
              Your return has been approved! Please print the label below and attach it to your package.
            </p>
            
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto mb-8 text-left" id="return-label">
              <div className="border border-gray-300 p-4 mb-6">
                <div className="flex justify-between mb-4">
                  <div>
                    <p className="font-bold text-xl">Return Label</p>
                    <p>Order #{Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}</p>
                  </div>
                  <div className="text-right">
                    <p>Generated: {new Date().toLocaleDateString()}</p>
                  </div>
                </div>
                
                <div className="flex mb-6">
                  <div className="w-1/2 pr-4">
                    <p className="font-medium">From:</p>
                    <p>Customer Name</p>
                    <p>123 Customer Address</p>
                    <p>Customer City, ST 12345</p>
                  </div>
                  <div className="w-1/2 pl-4 border-l">
                    <p className="font-medium">To:</p>
                    <p>CLOUD Returns Department</p>
                    <p>789 Warehouse Avenue</p>
                    <p>Warehouse City, ST 54321</p>
                  </div>
                </div>
                
                <div className="border-t border-b border-gray-300 py-4 mb-4">
                  <p className="font-medium">Return Items:</p>
                  {order.items.map(item => (
                    <div key={item.id} className="flex justify-between">
                      <p>{item.name} - {item.size || 'XS'}, {item.selectedColor || 'burgundy'}</p>
                      <p>${item.price} {item.currency}</p>
                    </div>
                  ))}
                </div>
                
                <div className="text-center border-2 border-black p-4 mb-4">
                  <p className="text-xl font-bold">SCAN BARCODE BELOW</p>
                  <div className="my-4 h-24 bg-gray-300 flex items-center justify-center">
                    [Barcode Placeholder]
                  </div>
                  <p>Return ID: RT{Math.floor(Math.random() * 10000000).toString().padStart(7, '0')}</p>
                </div>
                
                <div className="text-sm">
                  <p>Please ensure all items are in their original condition. Include all tags, packaging, and accessories.</p>
                  <p>Refunds will be processed within 7-10 business days after we receive your return.</p>
                </div>
              </div>
              
              <div className="flex justify-center">
                <motion.button
                  className="bg-gray-800 text-white px-6 py-2 mr-4 flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={downloadPDF}
                >
                  <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download PDF
                </motion.button>
                
                <motion.button
                  className="bg-gray-800 text-white px-6 py-2 flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={printLabel}
                >
                  <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  Print Label
                </motion.button>
              </div>
            </div>
            
            <motion.button
              className="bg-blue-400 text-white px-12 py-3 rounded-full"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleReturn}
            >
              Complete Return
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  </div>
);
}