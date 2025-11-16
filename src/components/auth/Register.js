import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { motion } from 'framer-motion';
import { EyeIcon, EyeSlashIcon, DocumentTextIcon, UserIcon, PhoneIcon, EnvelopeIcon, TruckIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

const schema = yup.object({
  name: yup.string().required('Full name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().matches(/^[0-9]{10}$/, 'Phone number must be 10 digits').required('Phone number is required'),
  vehicleNumber: yup.string()
    .matches(/^[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4}$/, 'Vehicle number format: XX00XX0000')
    .required('Vehicle number is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
  terms: yup.boolean().oneOf([true], 'You must accept the terms and conditions'),
});

const Register = ({ onSwitchToLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register: registerUser, loading } = useAuth();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const vehicleNumber = watch('vehicleNumber');

  const onSubmit = async (data) => {
    const result = await registerUser(data);
    if (result.success) {
      toast.success('Registration successful! Welcome to the system.');
    } else {
      toast.error(result.message || 'Registration failed');
    }
  };

  const formatVehicleNumber = (value) => {
    if (!value) return '';
    const cleaned = value.replace(/[^A-Z0-9]/g, '');
    const formatted = cleaned.replace(/^([A-Z]{0,2})([0-9]{0,2})([A-Z]{0,2})([0-9]{0,4}).*/, '$1$2$3$4');
    return formatted.toUpperCase();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-8">
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <TruckIcon className="w-8 h-8 text-white" />
          </motion.div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Vehicle Registration</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Register your vehicle to access the traffic monitoring system</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <UserIcon className="w-4 h-4 inline mr-1" />
                Full Name
              </label>
              <input
                {...register('name')}
                type="text"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                placeholder="Enter your full name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <EnvelopeIcon className="w-4 h-4 inline mr-1" />
                Email Address
              </label>
              <input
                {...register('email')}
                type="email"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <PhoneIcon className="w-4 h-4 inline mr-1" />
                Phone Number
              </label>
              <input
                {...register('phone')}
                type="tel"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                placeholder="10-digit phone number"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <TruckIcon className="w-4 h-4 inline mr-1" />
                Vehicle Number
              </label>
              <input
                {...register('vehicleNumber')}
                type="text"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors font-mono"
                placeholder="MH12AB1234"
                onChange={(e) => {
                  e.target.value = formatVehicleNumber(e.target.value);
                }}
              />
              {errors.vehicleNumber && (
                <p className="mt-1 text-sm text-red-600">{errors.vehicleNumber.message}</p>
              )}
              {vehicleNumber && vehicleNumber.length > 0 && (
                <p className="mt-1 text-xs text-gray-500">Format: State(2) + District(2) + Series(2) + Number(4)</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                  placeholder="Create password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  {...register('confirmPassword')}
                  type={showConfirmPassword ? 'text' : 'password'}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                  placeholder="Confirm password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  {showConfirmPassword ? (
                    <EyeSlashIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
              )}
            </div>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <div className="flex items-start">
              <DocumentTextIcon className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">Required Documents</h4>
                <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                  Please ensure you have your vehicle registration certificate and driving license ready for verification.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-start">
            <input
              {...register('terms')}
              type="checkbox"
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1"
            />
            <label className="ml-3 text-sm text-gray-600 dark:text-gray-400">
              I agree to the{' '}
              <button type="button" className="text-blue-600 hover:text-blue-500 dark:text-blue-400">
                Terms and Conditions
              </button>{' '}
              and{' '}
              <button type="button" className="text-blue-600 hover:text-blue-500 dark:text-blue-400">
                Privacy Policy
              </button>
              . I understand that my vehicle information will be used for traffic monitoring and violation detection.
            </label>
          </div>
          {errors.terms && (
            <p className="text-sm text-red-600">{errors.terms.message}</p>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:from-green-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Registering Vehicle...
              </div>
            ) : (
              'Register Vehicle'
            )}
          </motion.button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <button
              onClick={onSwitchToLogin}
              className="text-blue-600 hover:text-blue-500 dark:text-blue-400 font-medium"
            >
              Sign in here
            </button>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Register;
