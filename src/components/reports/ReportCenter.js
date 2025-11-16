import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  DocumentTextIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  ClockIcon,
  CameraIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  PlusIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';
import Tesseract from 'tesseract.js';

const ReportCenter = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('new');
  const [reports, setReports] = useState([
    {
      id: 1,
      type: 'Red Light Violation',
      location: 'MG Road Junction',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      status: 'pending',
      description: 'Vehicle crossed red light signal',
      evidence: ['image1.jpg', 'video1.mp4'],
      reportedBy: user?.name === 'John Doe' ? 'Ahmed' : (user?.name || 'Anonymous')
    },
    {
      id: 2,
      type: 'No Helmet',
      location: 'Brigade Road',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      status: 'verified',
      description: 'Motorcycle rider without helmet',
      evidence: ['image2.jpg'],
      reportedBy: user?.name === 'John Doe' ? 'Ahmed' : (user?.name || 'Anonymous')
    }
  ]);

  const [newReport, setNewReport] = useState({
    type: '',
    location: '',
    description: '',
    evidence: [],
    detectedPlates: [],
    vehicleNumber: ''
  });

  const [isProcessing, setIsProcessing] = useState(false);

  const violationTypes = [
    'Red Light Violation',
    'No Helmet',
    'Overspeeding',
    'Wrong Lane',
    'Mobile Phone Usage',
    'No Seatbelt',
    'Illegal Parking',
    'Other'
  ];

  // Number plate detection function
  const detectNumberPlate = async (file) => {
    setIsProcessing(true);
    try {
      const result = await Tesseract.recognize(file, 'eng', {
        logger: m => {
          if (m.status === 'recognizing text') {
            toast.loading(`Processing image... ${Math.round(m.progress * 100)}%`, { id: 'ocr-progress' });
          }
        }
      });

      const text = result.data.text.trim();
      const platePattern = /[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4}|[A-Z]{2}[0-9]{1,2}[A-Z]{1,2}[0-9]{1,4}/g;
      const detectedPlates = text.match(platePattern) || [];
      
      if (detectedPlates.length > 0) {
        toast.success(`Detected ${detectedPlates.length} number plate(s)!`, { id: 'ocr-progress' });
        return detectedPlates;
      } else {
        toast.error('No number plates detected in this image', { id: 'ocr-progress' });
        return [];
      }
    } catch (error) {
      toast.error('Error processing image for number plate detection', { id: 'ocr-progress' });
      return [];
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileUpload = async (files) => {
    const fileArray = Array.from(files);
    const imageFiles = fileArray.filter(file => file.type.startsWith('image/'));
    
    setNewReport(prev => ({ 
      ...prev, 
      evidence: [...prev.evidence, ...fileArray.map(f => f.name)] 
    }));

    if (imageFiles.length > 0) {
      toast.success(`${fileArray.length} file(s) uploaded successfully!`);
      
      // Process first image for number plate detection
      const allDetectedPlates = [];
      for (const imageFile of imageFiles.slice(0, 2)) { // Limit to first 2 images for performance
        const plates = await detectNumberPlate(imageFile);
        allDetectedPlates.push(...plates);
      }

      if (allDetectedPlates.length > 0) {
        setNewReport(prev => ({
          ...prev,
          detectedPlates: [...new Set([...prev.detectedPlates, ...allDetectedPlates])],
          vehicleNumber: prev.vehicleNumber || allDetectedPlates[0]
        }));
      }
    }
  };

  const handleSubmitReport = () => {
    if (!newReport.type || !newReport.location || !newReport.description) {
      toast.error('Please fill all required fields');
      return;
    }

    const report = {
      id: reports.length + 1,
      ...newReport,
      timestamp: new Date(),
      status: 'pending',
      reportedBy: user?.name === 'John Doe' ? 'Ahmed' : (user?.name || 'Anonymous')
    };

    setReports(prev => [report, ...prev]);
    setNewReport({ 
      type: '', 
      location: '', 
      description: '', 
      evidence: [], 
      detectedPlates: [], 
      vehicleNumber: '' 
    });
    toast.success('Report submitted successfully!');
    setActiveTab('history');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'verified': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'rejected': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const formatTime = (timestamp) => {
    return new Intl.DateTimeFormat('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short'
    }).format(timestamp);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Report Center
            </h1>
            <p className="text-blue-100">
              Help make roads safer by reporting traffic violations
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{reports.length}</div>
            <div className="text-sm text-blue-100">Total Reports</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'new', name: 'New Report', icon: PlusIcon },
              { id: 'history', name: 'Report History', icon: DocumentTextIcon }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'new' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Violation Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Violation Type *
                  </label>
                  <select
                    value={newReport.type}
                    onChange={(e) => setNewReport(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">Select violation type</option>
                    {violationTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Location *
                  </label>
                  <div className="relative">
                    <MapPinIcon className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={newReport.location}
                      onChange={(e) => setNewReport(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="Enter location or landmark"
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Vehicle Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Vehicle Number
                </label>
                <input
                  type="text"
                  value={newReport.vehicleNumber}
                  onChange={(e) => setNewReport(prev => ({ ...prev, vehicleNumber: e.target.value }))}
                  placeholder="Enter vehicle number or it will be auto-detected from images"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
                {newReport.detectedPlates.length > 0 && (
                  <div className="mt-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <SparklesIcon className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-700 dark:text-blue-400">
                        AI Detected Plates:
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {newReport.detectedPlates.map((plate, index) => (
                        <button
                          key={index}
                          onClick={() => setNewReport(prev => ({ ...prev, vehicleNumber: plate }))}
                          className="px-3 py-1 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded-full text-sm hover:bg-blue-200 dark:hover:bg-blue-700 transition-colors"
                        >
                          {plate}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description *
                </label>
                <textarea
                  value={newReport.description}
                  onChange={(e) => setNewReport(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Provide detailed description of the violation"
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              {/* Evidence Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Evidence (Photos/Videos)
                </label>
                <div 
                  className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-blue-400 dark:hover:border-blue-500 transition-colors cursor-pointer"
                  onClick={() => document.getElementById('file-upload').click()}
                >
                  <div className="flex items-center justify-center mb-3">
                    <CameraIcon className="w-12 h-12 text-gray-400" />
                    {isProcessing && (
                      <div className="ml-3">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                      </div>
                    )}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    {isProcessing ? 'Processing images for number plate detection...' : 'Click to upload or drag and drop'}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">
                    PNG, JPG, MP4 up to 10MB • AI will auto-detect number plates
                  </p>
                  <input
                    id="file-upload"
                    type="file"
                    multiple
                    accept="image/*,video/*"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e.target.files)}
                  />
                </div>
                {newReport.evidence.length > 0 && (
                  <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <p className="text-sm text-green-700 dark:text-green-400 font-medium">
                      ✓ {newReport.evidence.length} file(s) selected
                    </p>
                    <div className="mt-2 space-y-1">
                      {newReport.evidence.map((file, index) => (
                        <div key={index} className="flex items-center justify-between text-xs text-green-600 dark:text-green-400">
                          <span>{file}</span>
                          <button
                            onClick={() => {
                              setNewReport(prev => ({
                                ...prev,
                                evidence: prev.evidence.filter((_, i) => i !== index)
                              }));
                            }}
                            className="text-red-500 hover:text-red-700"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex justify-between items-center">
                <button
                  onClick={() => setNewReport({ type: '', location: '', description: '', evidence: [] })}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                >
                  Clear Form
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSubmitReport}
                  disabled={!newReport.type || !newReport.location || !newReport.description}
                  className={`px-8 py-3 rounded-lg font-medium transition-all ${
                    !newReport.type || !newReport.location || !newReport.description
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg'
                  }`}
                >
                  Submit Report
                </motion.button>
              </div>
            </motion.div>
          )}

          {activeTab === 'history' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {reports.length === 0 ? (
                <div className="text-center py-12">
                  <DocumentTextIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">No reports submitted yet</p>
                </div>
              ) : (
                reports.map((report) => (
                  <motion.div
                    key={report.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-medium text-gray-900 dark:text-white">
                            {report.type}
                          </h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                            {report.status}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-2">
                          <div className="flex items-center space-x-1">
                            <MapPinIcon className="w-4 h-4" />
                            <span>{report.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <ClockIcon className="w-4 h-4" />
                            <span>{formatTime(report.timestamp)}</span>
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                          {report.description}
                        </p>
                        
                        {report.evidence.length > 0 && (
                          <div className="flex items-center space-x-2 text-sm text-blue-600 dark:text-blue-400">
                            <CameraIcon className="w-4 h-4" />
                            <span>{report.evidence.length} evidence file(s)</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="ml-4">
                        {report.status === 'verified' && (
                          <CheckCircleIcon className="w-6 h-6 text-green-600" />
                        )}
                        {report.status === 'pending' && (
                          <ExclamationTriangleIcon className="w-6 h-6 text-yellow-600" />
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportCenter;
