import React from 'react';
import { motion } from 'framer-motion';
import { 
  HomeIcon,
  CameraIcon,
  MapIcon,
  DocumentTextIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  UserGroupIcon,
  CogIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const { user } = useAuth();

  const citizenMenuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: HomeIcon, gradient: 'from-emerald-500 to-teal-600' },
    { id: 'violations', name: 'My Violations', icon: ExclamationTriangleIcon, gradient: 'from-amber-500 to-orange-600' },
    { id: 'report', name: 'Report Violation', icon: DocumentTextIcon, gradient: 'from-rose-500 to-pink-600' },
    { id: 'detection', name: 'AI Detection', icon: CameraIcon, gradient: 'from-indigo-500 to-purple-600' },
    { id: 'map', name: 'Traffic Map', icon: MapIcon, gradient: 'from-cyan-500 to-blue-600' },
    { id: 'fines', name: 'Fines & Payments', icon: CurrencyDollarIcon, gradient: 'from-green-500 to-emerald-600' },
    { id: 'profile', name: 'Profile', icon: CogIcon, gradient: 'from-slate-500 to-gray-600' },
  ];

  const governmentMenuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: HomeIcon, gradient: 'from-emerald-500 to-teal-600' },
    { id: 'violations', name: 'All Violations', icon: ExclamationTriangleIcon, gradient: 'from-amber-500 to-orange-600' },
    { id: 'map', name: 'Live Monitoring', icon: MapIcon, gradient: 'from-cyan-500 to-blue-600' },
    { id: 'reports', name: 'Reports', icon: DocumentTextIcon, gradient: 'from-rose-500 to-pink-600' },
    { id: 'analytics', name: 'Analytics', icon: ChartBarIcon, gradient: 'from-indigo-500 to-purple-600' },
    { id: 'officers', name: 'Manage Officers', icon: UserGroupIcon, gradient: 'from-violet-500 to-purple-600' },
    { id: 'settings', name: 'Settings', icon: CogIcon, gradient: 'from-slate-500 to-gray-600' },
  ];

  const menuItems = user?.role === 'government' ? governmentMenuItems : citizenMenuItems;

  return (
    <motion.div 
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-gradient-to-b from-white via-gray-50 to-gray-100 dark:from-gray-800 dark:via-gray-850 dark:to-gray-900 shadow-2xl border-r border-gray-200/50 dark:border-gray-700/50 z-30 overflow-y-auto backdrop-blur-xl"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-indigo-500/5 pointer-events-none"></div>
      <div className="relative p-4">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-6"
        >
          <div className="relative overflow-hidden p-4 bg-gradient-to-br from-emerald-50 via-white to-indigo-50 dark:from-emerald-900/20 dark:via-gray-800 dark:to-indigo-900/20 rounded-2xl border border-emerald-200/50 dark:border-emerald-700/30 shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/10 to-indigo-400/10 dark:from-emerald-500/5 dark:to-indigo-500/5"></div>
            <div className="relative flex items-center space-x-3">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3">
                  <span className="text-white font-bold text-lg transform -rotate-3">
                    {user?.name?.charAt(0) || 'U'}
                  </span>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-2 border-white dark:border-gray-800 shadow-sm"></div>
              </div>
              <div className="flex-1">
                <p className="font-bold text-gray-900 dark:text-white text-sm">
                  {user?.name === 'John Doe' ? 'Ahmed' : user?.name}
                </p>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                    user?.role === 'government' 
                      ? 'bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 dark:from-indigo-900/30 dark:to-purple-900/30 dark:text-indigo-200'
                      : 'bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-800 dark:from-emerald-900/30 dark:to-teal-900/30 dark:text-emerald-200'
                  }`}>
                    {user?.role}
                  </span>
                </div>
                {user?.vehicleNumber && (
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 font-mono bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded mt-1 inline-block">{user?.vehicleNumber}</p>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        <nav className="space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <motion.button
                key={item.id}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 * index, duration: 0.4 }}
                whileHover={{ x: 6, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab(item.id)}
                className={`group relative w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-300 overflow-hidden ${
                  isActive
                    ? `bg-gradient-to-r ${item.gradient} text-white shadow-xl shadow-${item.gradient.split('-')[1]}-500/25 transform scale-105`
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 dark:hover:from-gray-700/50 dark:hover:to-gray-600/50 hover:shadow-md'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-xl"
                    initial={false}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <div className={`relative z-10 p-2 rounded-lg transition-all duration-300 ${
                  isActive 
                    ? 'bg-white/20 shadow-lg' 
                    : 'group-hover:bg-white/10 dark:group-hover:bg-gray-600/30'
                }`}>
                  <Icon className={`w-5 h-5 transition-all duration-300 ${
                    isActive ? 'text-white' : 'text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200'
                  }`} />
                </div>
                <span className={`font-semibold transition-all duration-300 ${
                  isActive ? 'text-white' : 'text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white'
                }`}>
                  {item.name}
                </span>
                {isActive && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="ml-auto w-2 h-2 bg-white rounded-full shadow-lg"
                  />
                )}
              </motion.button>
            );
          })}
        </nav>

        {/* Quick Stats */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-8 p-5 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-700/50 dark:via-gray-800/50 dark:to-gray-700/50 rounded-2xl border border-gray-200/50 dark:border-gray-600/30 shadow-lg backdrop-blur-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-bold text-gray-900 dark:text-white">Quick Stats</h4>
            <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full animate-pulse"></div>
          </div>
          <div className="space-y-3">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="flex justify-between items-center p-3 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl border border-emerald-200/30 dark:border-emerald-700/20"
            >
              <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Active Cases</span>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-emerald-900 dark:text-emerald-100">
                  {user?.role === 'government' ? '247' : '2'}
                </span>
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              </div>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="flex justify-between items-center p-3 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl border border-indigo-200/30 dark:border-indigo-700/20"
            >
              <span className="text-sm font-medium text-indigo-700 dark:text-indigo-300">This Month</span>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-indigo-900 dark:text-indigo-100">
                  {user?.role === 'government' ? '1,247' : '1'}
                </span>
                <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
              </div>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="flex justify-between items-center p-3 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl border border-amber-200/30 dark:border-amber-700/20"
            >
              <span className="text-sm font-medium text-amber-700 dark:text-amber-300">Revenue</span>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-amber-900 dark:text-amber-100">
                  ₹{user?.role === 'government' ? '2.8M' : '5K'}
                </span>
                <div className="w-2 h-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full animate-pulse"></div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Emergency Contact */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-6 relative overflow-hidden p-5 bg-gradient-to-br from-rose-50 via-red-50 to-pink-50 dark:from-red-900/20 dark:via-rose-900/20 dark:to-pink-900/20 rounded-2xl border border-rose-200/50 dark:border-red-700/30 shadow-lg"
        >
          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-red-400/20 to-rose-500/20 rounded-full -mr-8 -mt-8"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-bold text-red-900 dark:text-red-200 flex items-center">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></div>
                Emergency
              </h4>
              <div className="w-3 h-3 bg-gradient-to-r from-red-400 to-rose-500 rounded-full animate-pulse"></div>
            </div>
            <p className="text-xs font-medium text-red-700 dark:text-red-300 mb-2 bg-red-100/50 dark:bg-red-800/20 px-2 py-1 rounded-lg inline-block">
              Traffic Control Room
            </p>
            <div className="flex items-center space-x-2">
              <p className="text-lg font-bold font-mono text-red-900 dark:text-red-100 bg-white/50 dark:bg-gray-800/50 px-3 py-1 rounded-lg shadow-sm">
                100 | 1073
              </p>
              <motion.div 
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-3 h-3 bg-red-500 rounded-full"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
