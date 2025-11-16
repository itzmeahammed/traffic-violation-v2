import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Bars3Icon, 
  XMarkIcon, 
  BellIcon, 
  UserCircleIcon,
  SunIcon,
  MoonIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../../contexts/AuthContext';
import NotificationCenter from '../notifications/NotificationCenter';

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
  };

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 bg-gradient-to-r from-white via-gray-50 to-white dark:from-gray-800 dark:via-gray-850 dark:to-gray-800 shadow-2xl border-b border-gray-200/50 dark:border-gray-700/50 z-50 backdrop-blur-xl"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent to-indigo-500/5 pointer-events-none"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              className="flex-shrink-0 flex items-center group"
            >
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center mr-3 shadow-lg transform rotate-3 group-hover:rotate-6 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white transform -rotate-3 group-hover:-rotate-6 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-2 border-white dark:border-gray-800 shadow-sm animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 via-emerald-800 to-teal-700 dark:from-white dark:via-emerald-200 dark:to-teal-300 bg-clip-text text-transparent">TrafficGuard</h1>
                <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400">Smart Enforcement</p>
              </div>
            </motion.div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Dark Mode Toggle */}
            <motion.button
              whileHover={{ scale: 1.05, rotate: 180 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleDarkMode}
              className="relative p-3 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50 dark:border-gray-600/30"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400/10 to-orange-500/10 dark:from-indigo-400/10 dark:to-purple-500/10 rounded-2xl"></div>
              {darkMode ? (
                <SunIcon className="relative w-5 h-5 text-amber-500" />
              ) : (
                <MoonIcon className="relative w-5 h-5 text-indigo-500" />
              )}
            </motion.button>

            {/* Notifications */}
            <div className="relative">
              <NotificationCenter 
                isOpen={isNotificationOpen} 
                setIsOpen={setIsNotificationOpen} 
              />
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-3 p-3 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 hover:from-emerald-50 hover:to-teal-50 dark:hover:from-emerald-900/20 dark:hover:to-teal-900/20 transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-200/50 dark:border-gray-600/30 group"
              >
                <div className="relative">
                  <div className="w-9 h-9 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:rotate-3 transition-transform duration-300">
                    <span className="text-white text-sm font-bold">
                      {user?.name?.charAt(0) || 'U'}
                    </span>
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-2 border-white dark:border-gray-800 shadow-sm"></div>
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">
                    {user?.name === 'John Doe' ? 'Ahmed' : user?.name}
                  </p>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full transition-colors ${
                    user?.role === 'government' 
                      ? 'bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 dark:from-indigo-900/30 dark:to-purple-900/30 dark:text-indigo-200'
                      : 'bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-800 dark:from-emerald-900/30 dark:to-teal-900/30 dark:text-emerald-200'
                  }`}>
                    {user?.role}
                  </span>
                </div>
              </motion.button>

              {/* Profile Dropdown Menu */}
              {isProfileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50"
                >
                  <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {user?.name === 'John Doe' ? 'Ahmed' : user?.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
                    {user?.vehicleNumber && (
                      <p className="text-xs text-blue-600 dark:text-blue-400 font-mono">{user?.vehicleNumber}</p>
                    )}
                  </div>
                  <div className="py-1">
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center">
                      <UserCircleIcon className="w-4 h-4 mr-2" />
                      Profile Settings
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                    >
                      <ArrowRightOnRectangleIcon className="w-4 h-4 mr-2" />
                      Sign Out
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              {isMenuOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700"
        >
          <div className="px-4 py-3 space-y-3">
            <div className="flex items-center space-x-3 p-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-medium">
                  {user?.name?.charAt(0) || 'U'}
                </span>
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {user?.name === 'John Doe' ? 'Ahmed' : user?.name}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</p>
              </div>
            </div>
            
            <div className="border-t border-gray-200 dark:border-gray-700 pt-3 space-y-2">
              <button
                onClick={toggleDarkMode}
                className="w-full flex items-center px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                {darkMode ? (
                  <SunIcon className="w-5 h-5 mr-3" />
                ) : (
                  <MoonIcon className="w-5 h-5 mr-3" />
                )}
                {darkMode ? 'Light Mode' : 'Dark Mode'}
              </button>
              
              <button className="w-full flex items-center px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                <BellIcon className="w-5 h-5 mr-3" />
                Notifications
                <span className="ml-auto w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              <button className="w-full flex items-center px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                <UserCircleIcon className="w-5 h-5 mr-3" />
                Profile Settings
              </button>
              
              <button
                onClick={handleLogout}
                className="w-full flex items-center px-3 py-2 text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <ArrowRightOnRectangleIcon className="w-5 h-5 mr-3" />
                Sign Out
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
