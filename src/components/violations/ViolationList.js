import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ExclamationTriangleIcon,
  EyeIcon,
  DocumentTextIcon,
  MapPinIcon,
  CalendarIcon,
  MagnifyingGlassIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../../contexts/AuthContext';
import VehicleVisualization from '../3d/VehicleVisualization';

const ViolationList = () => {
  const { user } = useAuth();
  const [selectedViolation, setSelectedViolation] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showVisualization, setShowVisualization] = useState(false);

  const [violations] = useState([
    {
      id: 'V001',
      type: 'No Helmet',
      vehicle: user?.vehicleNumber || 'MH12AB1234',
      location: 'Bandra West, Mumbai',
      coordinates: { lat: 19.0596, lng: 72.8295 },
      date: '2024-01-10T14:30:00Z',
      status: 'pending',
      fine: 1000,
      severity: 'medium',
      evidence: ['IMG_001.jpg', 'IMG_002.jpg'],
      officerId: 'OFF123',
      officerName: 'Constable Sharma',
      description: 'Motorcycle rider detected without helmet at traffic signal',
      weather: 'Clear',
      trafficCondition: 'Heavy'
    },
    {
      id: 'V002',
      type: 'Overspeeding',
      vehicle: user?.vehicleNumber || 'MH12AB1234',
      location: 'Andheri East, Mumbai',
      coordinates: { lat: 19.1136, lng: 72.8697 },
      date: '2024-01-08T09:15:00Z',
      status: 'resolved',
      fine: 2000,
      severity: 'high',
      evidence: ['VID_001.mp4'],
      officerId: 'OFF456',
      officerName: 'Inspector Patel',
      description: 'Vehicle exceeded speed limit of 60 km/h, recorded at 85 km/h',
      weather: 'Rainy',
      trafficCondition: 'Moderate',
      resolvedDate: '2024-01-15T10:00:00Z'
    },
    {
      id: 'V003',
      type: 'Red Light Jump',
      vehicle: user?.vehicleNumber || 'MH12AB1234',
      location: 'Powai, Mumbai',
      coordinates: { lat: 19.1197, lng: 72.9081 },
      date: '2024-01-05T18:45:00Z',
      status: 'disputed',
      fine: 5000,
      severity: 'high',
      evidence: ['IMG_003.jpg', 'VID_002.mp4'],
      officerId: 'OFF789',
      officerName: 'Sub-Inspector Kumar',
      description: 'Vehicle crossed intersection during red light signal',
      weather: 'Clear',
      trafficCondition: 'Heavy',
      disputeReason: 'Signal malfunction claimed'
    },
    {
      id: 'V004',
      type: 'Wrong Lane',
      vehicle: user?.vehicleNumber || 'MH12AB1234',
      location: 'Kurla, Mumbai',
      coordinates: { lat: 19.0728, lng: 72.8826 },
      date: '2024-01-03T16:20:00Z',
      status: 'pending',
      fine: 1500,
      severity: 'low',
      evidence: ['IMG_004.jpg'],
      officerId: 'OFF321',
      officerName: 'Constable Singh',
      description: 'Vehicle driving in bus lane during restricted hours',
      weather: 'Cloudy',
      trafficCondition: 'Light'
    }
  ]);

  const filteredViolations = violations.filter(violation => {
    const matchesFilter = filter === 'all' || violation.status === filter;
    const matchesSearch = violation.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         violation.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         violation.vehicle.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'resolved': return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-200';
      case 'pending': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-200';
      case 'disputed': return 'text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-200';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {user?.role === 'government' ? 'All Violations' : 'My Violations'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {user?.role === 'government' 
              ? 'Monitor and manage all traffic violations in the system'
              : 'View your traffic violation history and status'
            }
          </p>
        </div>
        
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <button
            onClick={() => setShowVisualization(!showVisualization)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <EyeIcon className="w-4 h-4" />
            <span>3D View</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search violations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
        </div>
        
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="resolved">Resolved</option>
          <option value="disputed">Disputed</option>
        </select>
      </div>

      {/* 3D Visualization */}
      {showVisualization && selectedViolation && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mb-6"
        >
          <VehicleVisualization violationType={selectedViolation.type.toLowerCase().replace(' ', '_')} />
        </motion.div>
      )}

      {/* Violations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredViolations.map((violation, index) => (
          <motion.div
            key={violation.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
            onClick={() => setSelectedViolation(violation)}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${getSeverityColor(violation.severity)}`}></div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{violation.type}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">ID: {violation.id}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(violation.status)}`}>
                  {violation.status}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <MapPinIcon className="w-4 h-4 mr-2" />
                  {violation.location}
                </div>
                
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  {formatDate(violation.date)}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Fine Amount:</span>
                  <span className="font-bold text-red-600 dark:text-red-400">
                    ₹{violation.fine.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Evidence:</span>
                  <span className="text-sm text-blue-600 dark:text-blue-400">
                    {violation.evidence.length} file(s)
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                  {violation.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredViolations.length === 0 && (
        <div className="text-center py-12">
          <ExclamationTriangleIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No violations found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {searchTerm || filter !== 'all' 
              ? 'Try adjusting your search or filter criteria.'
              : 'No traffic violations recorded for your vehicle.'
            }
          </p>
        </div>
      )}

      {/* Violation Detail Modal */}
      {selectedViolation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full ${getSeverityColor(selectedViolation.severity)}`}></div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {selectedViolation.type}
                  </h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(selectedViolation.status)}`}>
                    {selectedViolation.status}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedViolation(null)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  <XCircleIcon className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Violation Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">ID:</span>
                      <span className="font-mono text-gray-900 dark:text-white">{selectedViolation.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Vehicle:</span>
                      <span className="font-mono text-gray-900 dark:text-white">{selectedViolation.vehicle}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Date:</span>
                      <span className="text-gray-900 dark:text-white">{formatDate(selectedViolation.date)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Fine:</span>
                      <span className="font-bold text-red-600 dark:text-red-400">₹{selectedViolation.fine.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Officer Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Officer:</span>
                      <span className="text-gray-900 dark:text-white">{selectedViolation.officerName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Badge:</span>
                      <span className="font-mono text-gray-900 dark:text-white">{selectedViolation.officerId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Weather:</span>
                      <span className="text-gray-900 dark:text-white">{selectedViolation.weather}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Traffic:</span>
                      <span className="text-gray-900 dark:text-white">{selectedViolation.trafficCondition}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Location</h4>
                <p className="text-gray-600 dark:text-gray-400">{selectedViolation.location}</p>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Description</h4>
                <p className="text-gray-600 dark:text-gray-400">{selectedViolation.description}</p>
              </div>

              {selectedViolation.disputeReason && (
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Dispute Reason</h4>
                  <p className="text-blue-600 dark:text-blue-400">{selectedViolation.disputeReason}</p>
                </div>
              )}

              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Evidence</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {selectedViolation.evidence.map((file, index) => (
                    <div key={index} className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 text-center">
                      <DocumentTextIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-xs text-gray-600 dark:text-gray-400">{file}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex space-x-3">
                {selectedViolation.status === 'pending' && (
                  <>
                    <button className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors">
                      Dispute Violation
                    </button>
                    <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors">
                      Pay Fine
                    </button>
                  </>
                )}
                <button
                  onClick={() => setSelectedViolation(null)}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ViolationList;
