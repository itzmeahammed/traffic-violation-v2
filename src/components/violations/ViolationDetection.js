import React, { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  CameraIcon, 
  PhotoIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import Webcam from 'react-webcam';
import { useDropzone } from 'react-dropzone';
import Tesseract from 'tesseract.js';
import toast from 'react-hot-toast';

const ViolationDetection = () => {
  const [capturedImage, setCapturedImage] = useState(null);
  const [detectedPlate, setDetectedPlate] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [detectionResults, setDetectionResults] = useState(null);
  
  const webcamRef = useRef(null);

  const violationTypes = [
    { id: 'no_helmet', name: 'No Helmet', fine: 1000, color: 'red' },
    { id: 'overspeeding', name: 'Over Speeding', fine: 2000, color: 'orange' },
    { id: 'red_light', name: 'Red Light Violation', fine: 5000, color: 'red' },
    { id: 'wrong_lane', name: 'Wrong Lane Driving', fine: 1500, color: 'yellow' },
    { id: 'no_seatbelt', name: 'No Seatbelt', fine: 1000, color: 'orange' },
    { id: 'mobile_phone', name: 'Mobile Phone Usage', fine: 2000, color: 'red' },
  ];

  const processImage = async (imageSrc) => {
    setIsProcessing(true);
    try {
      // Simulate number plate detection using OCR
      const { data: { text } } = await Tesseract.recognize(imageSrc, 'eng', {
        logger: m => console.log(m)
      });
      
      // Extract potential number plate using regex
      const plateRegex = /[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4}/g;
      const matches = text.match(plateRegex);
      
      if (matches && matches.length > 0) {
        setDetectedPlate(matches[0]);
        
        // Simulate AI violation detection
        const simulatedViolations = detectViolations();
        setDetectionResults(simulatedViolations);
        
        if (simulatedViolations.length > 0) {
          toast.success(`Detected ${simulatedViolations.length} violation(s)`);
        } else {
          toast.success('No violations detected');
        }
      } else {
        // Fallback: generate mock plate for demo
        const mockPlate = generateMockPlate();
        setDetectedPlate(mockPlate);
        
        const simulatedViolations = detectViolations();
        setDetectionResults(simulatedViolations);
        
        toast.success('Image processed - using demo detection');
      }
    } catch (error) {
      console.error('OCR Error:', error);
      // Fallback for demo
      const mockPlate = generateMockPlate();
      setDetectedPlate(mockPlate);
      
      const simulatedViolations = detectViolations();
      setDetectionResults(simulatedViolations);
      
      toast.success('Demo mode: Simulated detection results');
    } finally {
      setIsProcessing(false);
    }
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    processImage(imageSrc);
  }, [webcamRef, processImage]);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCapturedImage(e.target.result);
        processImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }, [processImage]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    multiple: false
  });

  const generateMockPlate = () => {
    const states = ['MH', 'DL', 'KA', 'TN', 'GJ'];
    const state = states[Math.floor(Math.random() * states.length)];
    const district = String(Math.floor(Math.random() * 99) + 1).padStart(2, '0');
    const series = String.fromCharCode(65 + Math.floor(Math.random() * 26)) + 
                  String.fromCharCode(65 + Math.floor(Math.random() * 26));
    const number = String(Math.floor(Math.random() * 9999) + 1).padStart(4, '0');
    return `${state}${district}${series}${number}`;
  };

  const detectViolations = () => {
    // Simulate AI detection with random results
    const possibleViolations = violationTypes.slice(0, 3); // First 3 for demo
    const detectedCount = Math.floor(Math.random() * 3); // 0-2 violations
    
    return possibleViolations.slice(0, detectedCount).map(violation => ({
      ...violation,
      confidence: (Math.random() * 0.3 + 0.7) * 100, // 70-100% confidence
      timestamp: new Date().toISOString(),
      location: 'Bandra West, Mumbai'
    }));
  };

  const submitReport = async () => {
    if (!detectedPlate || !detectionResults || detectionResults.length === 0) {
      toast.error('No violations detected to report');
      return;
    }

    setIsProcessing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast.success('Violation report submitted successfully!');
    
    // Reset form
    setCapturedImage(null);
    setDetectedPlate('');
    setDetectionResults(null);
    setIsProcessing(false);
  };

  const resetDetection = () => {
    setCapturedImage(null);
    setDetectedPlate('');
    setDetectionResults(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Violation Detection</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Capture or upload images to detect traffic violations using AI
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Camera/Upload Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Capture Evidence</h3>
          
          {!capturedImage ? (
            <div className="space-y-4">
              {/* Live Camera Feed */}
              <div className="relative">
                <Webcam
                  ref={webcamRef}
                  audio={false}
                  screenshotFormat="image/jpeg"
                  className="w-full rounded-lg"
                />
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                  <button
                    onClick={capture}
                    className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-full shadow-lg transition-colors"
                  >
                    <CameraIcon className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* File Upload Area */}
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                  isDragActive
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-300 dark:border-gray-600 hover:border-blue-400'
                }`}
              >
                <input {...getInputProps()} />
                <PhotoIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 dark:text-gray-400">
                  {isDragActive
                    ? 'Drop the image here...'
                    : 'Drag & drop an image, or click to select'
                  }
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                  Supports JPG, PNG, GIF up to 10MB
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative">
                <img
                  src={capturedImage}
                  alt="Captured evidence"
                  className="w-full rounded-lg"
                />
                <button
                  onClick={resetDetection}
                  className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full"
                >
                  <XMarkIcon className="w-4 h-4" />
                </button>
              </div>
              
              {isProcessing && (
                <div className="flex items-center justify-center p-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <span className="ml-2 text-gray-600 dark:text-gray-400">Processing image...</span>
                </div>
              )}
            </div>
          )}
        </motion.div>

        {/* Detection Results */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Detection Results</h3>
          
          {detectedPlate && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Detected Number Plate
              </label>
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
                <p className="font-mono text-lg font-bold text-center text-gray-900 dark:text-white">
                  {detectedPlate}
                </p>
              </div>
            </div>
          )}

          {detectionResults && detectionResults.length > 0 ? (
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900 dark:text-white">Detected Violations:</h4>
              {detectionResults.map((violation, index) => (
                <div
                  key={index}
                  className="border border-red-200 dark:border-red-800 rounded-lg p-4 bg-red-50 dark:bg-red-900/20"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <ExclamationTriangleIcon className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" />
                      <div>
                        <h5 className="font-medium text-red-900 dark:text-red-200">
                          {violation.name}
                        </h5>
                        <p className="text-sm text-red-700 dark:text-red-300">
                          Fine: ₹{violation.fine.toLocaleString()}
                        </p>
                        <p className="text-xs text-red-600 dark:text-red-400">
                          Confidence: {violation.confidence.toFixed(1)}%
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-medium text-gray-900 dark:text-white">Total Fine:</span>
                  <span className="text-xl font-bold text-red-600 dark:text-red-400">
                    ₹{detectionResults.reduce((sum, v) => sum + v.fine, 0).toLocaleString()}
                  </span>
                </div>
                
                <button
                  onClick={submitReport}
                  disabled={isProcessing}
                  className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                >
                  {isProcessing ? 'Submitting...' : 'Submit Violation Report'}
                </button>
              </div>
            </div>
          ) : detectionResults && detectionResults.length === 0 ? (
            <div className="text-center py-8">
              <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No Violations Detected
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                The image appears to show compliant traffic behavior.
              </p>
            </div>
          ) : (
            <div className="text-center py-8">
              <CameraIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Ready to Detect
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                Capture or upload an image to start violation detection.
              </p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Violation Types Reference */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Violation Types & Fines</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {violationTypes.map((violation) => (
            <div
              key={violation.id}
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <h4 className="font-medium text-gray-900 dark:text-white">{violation.name}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Fine: ₹{violation.fine.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ViolationDetection;
