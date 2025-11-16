import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import { 
  MapPinIcon, 
  ExclamationTriangleIcon,
  EyeIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  CameraIcon,
  ClockIcon,
  ShieldExclamationIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';

// Google Maps Component
const MapComponent = ({ violations, cameras, onViolationSelect, selectedViolation }) => {
  const ref = useRef(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    if (ref.current && !map) {
      const newMap = new window.google.maps.Map(ref.current, {
        center: { lat: 19.0760, lng: 72.8777 }, // Mumbai coordinates
        zoom: 12,
        styles: [
          {
            featureType: "all",
            elementType: "geometry.fill",
            stylers: [{ weight: "2.00" }]
          },
          {
            featureType: "all",
            elementType: "geometry.stroke",
            stylers: [{ color: "#9c9c9c" }]
          },
          {
            featureType: "all",
            elementType: "labels.text",
            stylers: [{ visibility: "on" }]
          },
          {
            featureType: "landscape",
            elementType: "all",
            stylers: [{ color: "#f2f2f2" }]
          },
          {
            featureType: "landscape",
            elementType: "geometry.fill",
            stylers: [{ color: "#ffffff" }]
          },
          {
            featureType: "landscape.man_made",
            elementType: "geometry.fill",
            stylers: [{ color: "#ffffff" }]
          },
          {
            featureType: "poi",
            elementType: "all",
            stylers: [{ visibility: "off" }]
          },
          {
            featureType: "road",
            elementType: "all",
            stylers: [{ saturation: -100 }, { lightness: 45 }]
          },
          {
            featureType: "road",
            elementType: "geometry.fill",
            stylers: [{ color: "#eeeeee" }]
          },
          {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: [{ color: "#7b7b7b" }]
          },
          {
            featureType: "road",
            elementType: "labels.text.stroke",
            stylers: [{ color: "#ffffff" }]
          },
          {
            featureType: "road.highway",
            elementType: "all",
            stylers: [{ visibility: "simplified" }]
          },
          {
            featureType: "road.arterial",
            elementType: "labels.icon",
            stylers: [{ visibility: "off" }]
          },
          {
            featureType: "transit",
            elementType: "all",
            stylers: [{ visibility: "off" }]
          },
          {
            featureType: "water",
            elementType: "all",
            stylers: [{ color: "#46bcec" }, { visibility: "on" }]
          },
          {
            featureType: "water",
            elementType: "geometry.fill",
            stylers: [{ color: "#c8d7d4" }]
          },
          {
            featureType: "water",
            elementType: "labels.text.fill",
            stylers: [{ color: "#070707" }]
          },
          {
            featureType: "water",
            elementType: "labels.text.stroke",
            stylers: [{ color: "#ffffff" }]
          }
        ],
        disableDefaultUI: true,
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: true,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: true
      });
      setMap(newMap);
    }
  }, [ref, map]);

  useEffect(() => {
    if (map) {
      // Clear existing markers
      markers.forEach(marker => marker.setMap(null));
      const newMarkers = [];

      // Add violation markers
      violations.forEach(violation => {
        const marker = new window.google.maps.Marker({
          position: violation.coordinates,
          map: map,
          title: `${violation.type} - ${violation.vehicle}`,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 12,
            fillColor: violation.severity === 'high' ? '#ef4444' : 
                      violation.severity === 'medium' ? '#f59e0b' : '#10b981',
            fillOpacity: 0.8,
            strokeColor: '#ffffff',
            strokeWeight: 2
          }
        });

        marker.addListener('click', () => {
          onViolationSelect(violation);
        });

        newMarkers.push(marker);
      });

      // Add camera markers
      cameras.forEach(camera => {
        const marker = new window.google.maps.Marker({
          position: camera.coordinates,
          map: map,
          title: camera.name,
          icon: {
            path: window.google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
            scale: 8,
            fillColor: camera.status === 'active' ? '#3b82f6' : '#6b7280',
            fillOpacity: 1,
            strokeColor: '#ffffff',
            strokeWeight: 1
          }
        });

        newMarkers.push(marker);
      });

      setMarkers(newMarkers);
    }
  }, [map, violations, cameras, onViolationSelect]);

  return <div ref={ref} className="w-full h-full rounded-xl" />;
};

const TrafficMap = () => {
  const [selectedViolation, setSelectedViolation] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchLocation, setSearchLocation] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);

  // Mock violation data with coordinates
  const [violations] = useState([
    {
      id: 1,
      type: 'No Helmet',
      vehicle: 'MH12AB1234',
      location: 'Bandra West',
      coordinates: { lat: 19.0596, lng: 72.8295 },
      time: '2 hours ago',
      status: 'pending',
      fine: 1000,
      severity: 'medium'
    },
    {
      id: 2,
      type: 'Overspeeding',
      vehicle: 'DL08CA9876',
      location: 'Andheri East',
      coordinates: { lat: 19.1136, lng: 72.8697 },
      time: '4 hours ago',
      status: 'resolved',
      fine: 2000,
      severity: 'high'
    },
    {
      id: 3,
      type: 'Red Light Jump',
      vehicle: 'KA03HB5432',
      location: 'Powai',
      coordinates: { lat: 19.1197, lng: 72.9081 },
      time: '6 hours ago',
      status: 'pending',
      fine: 5000,
      severity: 'high'
    },
    {
      id: 4,
      type: 'Wrong Lane',
      vehicle: 'TN09CC7890',
      location: 'Kurla',
      coordinates: { lat: 19.0728, lng: 72.8826 },
      time: '8 hours ago',
      status: 'resolved',
      fine: 1500,
      severity: 'low'
    },
    {
      id: 5,
      type: 'Mobile Phone Usage',
      vehicle: 'GJ01DE2468',
      location: 'Worli',
      coordinates: { lat: 19.0176, lng: 72.8118 },
      time: '1 hour ago',
      status: 'pending',
      fine: 2000,
      severity: 'medium'
    }
  ]);

  const [trafficCameras] = useState([
    { id: 1, name: 'Bandra Junction', coordinates: { lat: 19.0544, lng: 72.8406 }, status: 'active' },
    { id: 2, name: 'Andheri Flyover', coordinates: { lat: 19.1197, lng: 72.8464 }, status: 'active' },
    { id: 3, name: 'Powai Circle', coordinates: { lat: 19.1258, lng: 72.9044 }, status: 'maintenance' },
    { id: 4, name: 'Kurla Station', coordinates: { lat: 19.0669, lng: 72.8789 }, status: 'active' },
  ]);

  const filteredViolations = violations.filter(violation => {
    if (filter === 'all') return true;
    if (filter === 'pending') return violation.status === 'pending';
    if (filter === 'resolved') return violation.status === 'resolved';
    if (filter === 'high') return violation.severity === 'high';
    return true;
  });

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status) => {
    return status === 'resolved' ? 'text-green-600' : 'text-red-600';
  };

  // Handle API key from localStorage or environment
  useEffect(() => {
    const savedApiKey = localStorage.getItem('googleMapsApiKey') || process.env.REACT_APP_GOOGLE_MAPS_API_KEY || 'AIzaSyAp6FDgkn8sn4ejNFfaXi73VdVz6wL-qM8';
    if (savedApiKey) {
      setApiKey(savedApiKey);
      setShowApiKeyInput(false);
    } else {
      setShowApiKeyInput(true);
    }
  }, []);

  const handleApiKeySubmit = (key) => {
    setApiKey(key);
    localStorage.setItem('googleMapsApiKey', key);
    setShowApiKeyInput(false);
  };

  const render = (status) => {
    switch (status) {
      case Status.LOADING:
        return (
          <div className="flex items-center justify-center h-96 bg-gray-100 dark:bg-gray-700 rounded-xl">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">Loading Google Maps...</p>
            </div>
          </div>
        );
      case Status.FAILURE:
        return (
          <div className="flex items-center justify-center h-96 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800">
            <div className="text-center">
              <XCircleIcon className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <p className="text-red-600 dark:text-red-400 font-medium">Failed to load Google Maps</p>
              <button 
                onClick={() => setShowApiKeyInput(true)}
                className="mt-3 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Update API Key
              </button>
            </div>
          </div>
        );
      default:
        return <MapComponent violations={filteredViolations} cameras={trafficCameras} onViolationSelect={setSelectedViolation} selectedViolation={selectedViolation} />;
    }
  };

  return (
    <div className="space-y-6">
      {/* API Key Input Modal */}
      <AnimatePresence>
        {showApiKeyInput && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl"
            >
              <div className="text-center mb-6">
                <MapPinIcon className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Google Maps API Key</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Enter your Google Maps API key to enable the interactive map feature
                </p>
              </div>
              <input
                type="text"
                placeholder="Enter Google Maps API Key"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white mb-4"
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && e.target.value.trim()) {
                    handleApiKeySubmit(e.target.value.trim());
                  }
                }}
              />
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowApiKeyInput(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Skip for now
                </button>
                <button
                  onClick={(e) => {
                    const input = e.target.parentElement.previousElementSibling;
                    if (input.value.trim()) {
                      handleApiKeySubmit(input.value.trim());
                    }
                  }}
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Save & Continue
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Traffic Monitoring</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Real-time traffic violations and camera surveillance network
          </p>
        </div>
        
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <div className="relative">
            <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search location..."
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>
          
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          >
            <option value="all">All Violations</option>
            <option value="pending">Pending</option>
            <option value="resolved">Resolved</option>
            <option value="high">High Severity</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Container */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden"
          >
            <div className="h-96 bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900 dark:to-green-900 relative">
              {/* Mock Map Interface */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPinIcon className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Interactive Map
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Mapbox/Google Maps integration would be displayed here
                  </p>
                  <div className="bg-blue-600 text-white px-4 py-2 rounded-lg inline-block">
                    Mumbai Traffic Zone
                  </div>
                </div>
              </div>

              {/* Mock Violation Markers */}
              {filteredViolations.map((violation, index) => (
                <motion.div
                  key={violation.id}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`absolute w-4 h-4 rounded-full ${getSeverityColor(violation.severity)} cursor-pointer transform -translate-x-1/2 -translate-y-1/2 shadow-lg`}
                  style={{
                    left: `${20 + (index * 15)}%`,
                    top: `${30 + (index * 10)}%`
                  }}
                  onClick={() => setSelectedViolation(violation)}
                >
                  <div className={`absolute inset-0 rounded-full ${getSeverityColor(violation.severity)} animate-ping opacity-75`}></div>
                </motion.div>
              ))}

              {/* Mock Camera Markers */}
              {trafficCameras.map((camera, index) => (
                <div
                  key={camera.id}
                  className={`absolute w-3 h-3 rounded-full ${
                    camera.status === 'active' ? 'bg-green-400' : 'bg-gray-400'
                  } cursor-pointer transform -translate-x-1/2 -translate-y-1/2`}
                  style={{
                    left: `${60 + (index * 8)}%`,
                    top: `${20 + (index * 12)}%`
                  }}
                  title={camera.name}
                ></div>
              ))}

              {/* Map Controls */}
              <div className="absolute top-4 right-4 space-y-2">
                <button className="bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                  <span className="text-xl">+</span>
                </button>
                <button className="bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                  <span className="text-xl">-</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Legend */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Map Legend</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                <span className="text-sm text-gray-700 dark:text-gray-300">High Severity</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                <span className="text-sm text-gray-700 dark:text-gray-300">Medium Severity</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700 dark:text-gray-300">Low Severity</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="text-sm text-gray-700 dark:text-gray-300">Active Camera</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                <span className="text-sm text-gray-700 dark:text-gray-300">Inactive Camera</span>
              </div>
            </div>
          </motion.div>

          {/* Violation Details */}
          {selectedViolation && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Violation Details</h3>
                <button
                  onClick={() => setSelectedViolation(null)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Vehicle Number</p>
                  <p className="font-mono font-medium text-gray-900 dark:text-white">
                    {selectedViolation.vehicle}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Violation Type</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {selectedViolation.type}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Location</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {selectedViolation.location}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Time</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {selectedViolation.time}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Fine Amount</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    ₹{selectedViolation.fine.toLocaleString()}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Status</p>
                  <p className={`font-medium capitalize ${getStatusColor(selectedViolation.status)}`}>
                    {selectedViolation.status}
                  </p>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors">
                  View Full Report
                </button>
              </div>
            </motion.div>
          )}

          {/* Recent Violations List */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700"
          >
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Violations</h3>
            </div>
            <div className="p-6">
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {filteredViolations.map((violation) => (
                  <div
                    key={violation.id}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                    onClick={() => setSelectedViolation(violation)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${getSeverityColor(violation.severity)}`}></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {violation.vehicle}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {violation.type}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        {violation.time}
                      </p>
                      <p className={`text-xs capitalize ${getStatusColor(violation.status)}`}>
                        {violation.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TrafficMap;
