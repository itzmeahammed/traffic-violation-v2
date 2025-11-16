import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ExclamationTriangleIcon,
  CheckCircleIcon,
  TruckIcon
} from '@heroicons/react/24/outline';

const VehicleVisualization = ({ violationType = 'no_helmet' }) => {
  const [activeAnimation, setActiveAnimation] = useState(false);

  const scenarios = {
    no_helmet: {
      title: 'No Helmet Violation',
      description: 'Rider detected without helmet',
      icon: ExclamationTriangleIcon,
      color: 'red',
      fine: 1000
    },
    red_light: {
      title: 'Red Light Violation', 
      description: 'Vehicle crossed during red light',
      icon: ExclamationTriangleIcon,
      color: 'red',
      fine: 5000
    },
    overspeeding: {
      title: 'Overspeeding Violation',
      description: 'Vehicle exceeding speed limit',
      icon: ExclamationTriangleIcon,
      color: 'orange',
      fine: 2000
    }
  };

  const currentScenario = scenarios[violationType] || scenarios.no_helmet;
  const Icon = currentScenario.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden"
    >
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <Icon className="w-6 h-6 text-red-600" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {currentScenario.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
              {currentScenario.description}
            </p>
          </div>
        </div>
      </div>
      
      <div className="h-96 bg-gradient-to-b from-sky-200 to-green-200 dark:from-sky-800 dark:to-green-800 relative overflow-hidden">
        {/* Animated Traffic Scene */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            {/* Road */}
            <div className="w-80 h-20 bg-gray-700 rounded-lg relative mb-8">
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-white transform -translate-y-1/2"></div>
              <div className="absolute top-1/2 left-4 w-8 h-1 bg-yellow-400 transform -translate-y-1/2"></div>
              <div className="absolute top-1/2 left-16 w-8 h-1 bg-yellow-400 transform -translate-y-1/2"></div>
              <div className="absolute top-1/2 left-28 w-8 h-1 bg-yellow-400 transform -translate-y-1/2"></div>
            </div>
            
            {/* Vehicle */}
            <motion.div
              animate={activeAnimation ? { x: [0, 100, 0] } : {}}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-16 left-8"
            >
              <TruckIcon className={`w-12 h-12 ${currentScenario.color === 'red' ? 'text-red-600' : 'text-orange-600'}`} />
              {violationType === 'no_helmet' && (
                <div className="absolute -top-2 -right-2">
                  <ExclamationTriangleIcon className="w-6 h-6 text-red-600 animate-pulse" />
                </div>
              )}
            </motion.div>
            
            {/* Traffic Light */}
            {violationType === 'red_light' && (
              <div className="absolute -top-20 right-8">
                <div className="w-6 h-16 bg-gray-800 rounded-lg flex flex-col items-center justify-around py-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
                  <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
                </div>
              </div>
            )}
            
            {/* Speed Indicator */}
            {violationType === 'overspeeding' && (
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                <div className="bg-red-600 text-white px-3 py-1 rounded-lg text-sm font-bold animate-pulse">
                  85 km/h
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Violation Alert */}
        <div className="absolute top-4 right-4">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium"
          >
            VIOLATION DETECTED
          </motion.div>
        </div>
      </div>
      
      <div className="p-4 bg-gray-50 dark:bg-gray-700">
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveAnimation(!activeAnimation)}
              className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              {activeAnimation ? 'Stop Animation' : 'Start Animation'}
            </button>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500 dark:text-gray-400">Fine Amount</p>
            <p className="text-lg font-bold text-red-600">₹{currentScenario.fine.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default VehicleVisualization;
