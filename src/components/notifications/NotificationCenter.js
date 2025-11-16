import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BellIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  InformationCircleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../../contexts/AuthContext';

const NotificationCenter = ({ isOpen, setIsOpen }) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Mock notifications data
  useEffect(() => {
    const mockNotifications = [
      {
        id: 1,
        type: 'violation',
        title: 'New Violation Detected',
        message: 'Red light violation detected at MG Road Junction',
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        read: false,
        priority: 'high'
      },
      {
        id: 2,
        type: 'fine',
        title: 'Fine Payment Due',
        message: 'Your fine of ₹2,000 is due in 3 days',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        read: false,
        priority: 'medium'
      },
      {
        id: 3,
        type: 'system',
        title: 'System Update',
        message: 'New features added to violation detection',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
        read: true,
        priority: 'low'
      },
      {
        id: 4,
        type: 'success',
        title: 'Payment Successful',
        message: 'Your fine payment of ₹1,000 has been processed',
        timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000),
        read: false,
        priority: 'medium'
      }
    ];

    setNotifications(mockNotifications);
    setUnreadCount(mockNotifications.filter(n => !n.read).length);
  }, []);

  const getIcon = (type) => {
    switch (type) {
      case 'violation':
        return ExclamationTriangleIcon;
      case 'success':
        return CheckCircleIcon;
      case 'fine':
        return ExclamationTriangleIcon;
      default:
        return InformationCircleIcon;
    }
  };

  const getIconColor = (type, priority) => {
    if (priority === 'high') return 'text-red-600';
    if (type === 'success') return 'text-green-600';
    if (type === 'violation') return 'text-orange-600';
    return 'text-blue-600';
  };

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    setUnreadCount(0);
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    const notification = notifications.find(n => n.id === id);
    if (notification && !notification.read) {
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <>
      {/* Notification Bell */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative p-2 rounded-lg text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <BellIcon className="w-6 h-6" />
          {unreadCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium"
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </motion.span>
          )}
        </button>
      </div>

      {/* Notification Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="absolute right-0 top-12 w-96 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 max-h-96 overflow-hidden"
            >
              {/* Header */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Notifications
                  </h3>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
                    >
                      Mark all read
                    </button>
                  )}
                </div>
              </div>

              {/* Notifications List */}
              <div className="max-h-80 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center">
                    <BellIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-500 dark:text-gray-400">No notifications</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {notifications.map((notification) => {
                      const Icon = getIcon(notification.type);
                      return (
                        <motion.div
                          key={notification.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer ${
                            !notification.read ? 'bg-blue-50 dark:bg-blue-900/10' : ''
                          }`}
                          onClick={() => markAsRead(notification.id)}
                        >
                          <div className="flex items-start space-x-3">
                            <Icon className={`w-5 h-5 mt-0.5 ${getIconColor(notification.type, notification.priority)}`} />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <p className={`text-sm font-medium ${
                                  !notification.read ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'
                                }`}>
                                  {notification.title}
                                </p>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    deleteNotification(notification.id);
                                  }}
                                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                >
                                  <XMarkIcon className="w-4 h-4" />
                                </button>
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                                {formatTime(notification.timestamp)}
                              </p>
                            </div>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Footer */}
              {notifications.length > 0 && (
                <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
                  <button className="w-full text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium">
                    View all notifications
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default NotificationCenter;
