import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CurrencyDollarIcon,
  CreditCardIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  CalendarIcon,
  ReceiptPercentIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

const FineManagement = () => {
  const { user } = useAuth();
  const [selectedFine, setSelectedFine] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const [fines] = useState([
    {
      id: 'F001',
      violationType: 'No Helmet',
      amount: 1000,
      vehicle: user?.vehicleNumber || 'MH12AB1234',
      location: 'Bandra West',
      date: '2024-01-10',
      dueDate: '2024-02-10',
      status: 'pending',
      evidence: 'IMG_001.jpg',
      officerId: 'OFF123'
    },
    {
      id: 'F002',
      violationType: 'Overspeeding',
      amount: 2000,
      vehicle: user?.vehicleNumber || 'MH12AB1234',
      location: 'Andheri East',
      date: '2024-01-08',
      dueDate: '2024-02-08',
      status: 'pending',
      evidence: 'VID_002.mp4',
      officerId: 'OFF456'
    },
    {
      id: 'F003',
      violationType: 'Red Light Jump',
      amount: 5000,
      vehicle: user?.vehicleNumber || 'MH12AB1234',
      location: 'Powai',
      date: '2024-01-05',
      dueDate: '2024-02-05',
      status: 'paid',
      evidence: 'IMG_003.jpg',
      officerId: 'OFF789',
      paidDate: '2024-01-15'
    }
  ]);

  const pendingFines = fines.filter(fine => fine.status === 'pending');
  const totalPending = pendingFines.reduce((sum, fine) => sum + fine.amount, 0);

  const handlePayment = async (fine) => {
    setIsProcessingPayment(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    toast.success(`Payment of ₹${fine.amount.toLocaleString()} processed successfully!`);
    setIsProcessingPayment(false);
    setSelectedFine(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid': return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-200';
      case 'pending': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-200';
      case 'overdue': return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-200';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Fine Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage and pay your traffic violation fines
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Pending</p>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400 mt-2">
                ₹{totalPending.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                {pendingFines.length} fine(s)
              </p>
            </div>
            <div className="p-3 rounded-full bg-red-100 dark:bg-red-900/20">
              <ExclamationTriangleIcon className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Paid</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-2">
                ₹{fines.filter(f => f.status === 'paid').reduce((sum, f) => sum + f.amount, 0).toLocaleString()}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                {fines.filter(f => f.status === 'paid').length} fine(s)
              </p>
            </div>
            <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/20">
              <CheckCircleIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">This Month</p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-2">
                ₹{fines.filter(f => new Date(f.date).getMonth() === new Date().getMonth()).reduce((sum, f) => sum + f.amount, 0).toLocaleString()}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                {fines.filter(f => new Date(f.date).getMonth() === new Date().getMonth()).length} fine(s)
              </p>
            </div>
            <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/20">
              <CalendarIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Fines List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700"
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">All Fines</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {fines.map((fine) => (
              <div
                key={fine.id}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
                          <CurrencyDollarIcon className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            {fine.violationType}
                          </h4>
                          <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(fine.status)}`}>
                            {fine.status}
                          </span>
                          {isOverdue(fine.dueDate) && fine.status === 'pending' && (
                            <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                              Overdue
                            </span>
                          )}
                        </div>
                        <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                          <span>Fine ID: {fine.id}</span>
                          <span className="mx-2">•</span>
                          <span>{fine.location}</span>
                          <span className="mx-2">•</span>
                          <span>{new Date(fine.date).toLocaleDateString()}</span>
                        </div>
                        <div className="mt-1 text-sm text-gray-500 dark:text-gray-500">
                          Vehicle: {fine.vehicle} • Due: {new Date(fine.dueDate).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-gray-900 dark:text-white">
                          ₹{fine.amount.toLocaleString()}
                        </p>
                        {fine.status === 'pending' && (
                          <button
                            onClick={() => setSelectedFine(fine)}
                            className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                          >
                            Pay Now
                          </button>
                        )}
                        {fine.status === 'paid' && (
                          <p className="text-sm text-green-600 dark:text-green-400 mt-2">
                            Paid on {new Date(fine.paidDate).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Payment Modal */}
      {selectedFine && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full"
          >
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Pay Fine - {selectedFine.id}
              </h3>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600 dark:text-gray-400">Violation:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{selectedFine.violationType}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600 dark:text-gray-400">Vehicle:</span>
                    <span className="font-mono text-gray-900 dark:text-white">{selectedFine.vehicle}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600 dark:text-gray-400">Location:</span>
                    <span className="text-gray-900 dark:text-white">{selectedFine.location}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Amount:</span>
                    <span className="text-xl font-bold text-red-600 dark:text-red-400">
                      ₹{selectedFine.amount.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Payment Method
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-700 dark:text-gray-300 flex items-center">
                      <CreditCardIcon className="w-4 h-4 mr-1" />
                      Credit/Debit Card
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="upi"
                      checked={paymentMethod === 'upi'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-700 dark:text-gray-300">UPI Payment</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="netbanking"
                      checked={paymentMethod === 'netbanking'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-700 dark:text-gray-300">Net Banking</span>
                  </label>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setSelectedFine(null)}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-3 px-4 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handlePayment(selectedFine)}
                  disabled={isProcessingPayment}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                >
                  {isProcessingPayment ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Processing...
                    </div>
                  ) : (
                    `Pay ₹${selectedFine.amount.toLocaleString()}`
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default FineManagement;
