import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRightIcon,
  CheckCircleIcon,
  MapPinIcon,
  CameraIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  UsersIcon,
  LightBulbIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';

const LandingPage = ({ onGetStarted }) => {
  const [hoveredFeature, setHoveredFeature] = useState(null);

  const features = [
    {
      icon: CameraIcon,
      title: 'AI Detection',
      description: 'Advanced AI-powered camera systems detect traffic violations in real-time with 94% accuracy',
      color: 'from-blue-400 to-cyan-500'
    },
    {
      icon: MapPinIcon,
      title: 'Live Monitoring',
      description: 'Interactive maps with real-time violation tracking and camera status monitoring',
      color: 'from-emerald-400 to-teal-500'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Smart Enforcement',
      description: 'Automated violation processing with secure payment integration and case management',
      color: 'from-green-400 to-emerald-500'
    },
    {
      icon: ChartBarIcon,
      title: 'Analytics',
      description: 'Comprehensive dashboards with performance metrics and detailed traffic analysis',
      color: 'from-indigo-400 to-blue-500'
    },
    {
      icon: UsersIcon,
      title: 'Multi-Role System',
      description: 'Separate interfaces for citizens and government officials with role-based access',
      color: 'from-purple-400 to-pink-500'
    },
    {
      icon: LightBulbIcon,
      title: 'Smart Reports',
      description: 'Citizens can report violations with automatic number plate detection via OCR',
      color: 'from-amber-400 to-orange-500'
    }
  ];

  const stats = [
    { number: '94%', label: 'Detection Accuracy', icon: MagnifyingGlassIcon },
    { number: '87%', label: 'Resolution Rate', icon: CheckCircleIcon },
    { number: '76%', label: 'Payment Rate', icon: ArrowTrendingUpIcon },
    { number: '24/7', label: 'Monitoring', icon: CameraIcon }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/20 dark:border-gray-700/20 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-cyan-500 to-green-500 rounded-2xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-teal-700 dark:from-white dark:via-blue-200 dark:to-teal-300 bg-clip-text text-transparent">TrafficGuard</h1>
                <p className="text-xs font-medium text-blue-600 dark:text-blue-400">Smart Enforcement</p>
              </div>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onGetStarted}
              className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-green-500 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Get Started
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
      >
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-green-50/50 dark:from-blue-900/10 dark:via-gray-900 dark:to-green-900/10 pointer-events-none"></div>
        <div className="absolute top-20 right-0 w-96 h-96 bg-gradient-to-br from-blue-200/20 to-green-200/20 dark:from-blue-500/10 dark:to-green-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-cyan-200/20 to-blue-200/20 dark:from-cyan-500/10 dark:to-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center mb-16"
          >
            <motion.div variants={itemVariants} className="mb-6">
              <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-100 to-green-100 dark:from-blue-900/30 dark:to-green-900/30 rounded-full text-sm font-medium text-blue-700 dark:text-blue-300 border border-blue-200/50 dark:border-blue-700/30">
                ✨ Welcome to Smart Traffic Management
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-teal-700 dark:from-white dark:via-blue-200 dark:to-teal-300 bg-clip-text text-transparent leading-tight"
            >
              Intelligent Traffic<br />Violation Detection
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed"
            >
              Advanced AI-powered system for real-time traffic monitoring, violation detection, and smart enforcement. Making roads safer for everyone.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                onClick={onGetStarted}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center space-x-2 group"
              >
                <span>Start Now</span>
                <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-blue-300 dark:border-blue-600 text-blue-600 dark:text-blue-400 font-semibold rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300"
              >
                Learn More
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Hero Image/Illustration */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative mt-16"
          >
            <div className="relative bg-gradient-to-br from-blue-100/50 to-green-100/50 dark:from-blue-900/20 dark:to-green-900/20 rounded-3xl p-8 border border-blue-200/30 dark:border-blue-700/30 shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-green-400/10 dark:from-blue-500/5 dark:to-green-500/5"></div>
              <div className="relative h-80 flex items-center justify-center">
                <div className="text-center">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="mb-4"
                  >
                    <CameraIcon className="w-24 h-24 text-blue-500 dark:text-blue-400 mx-auto opacity-80" />
                  </motion.div>
                  <p className="text-gray-600 dark:text-gray-400 font-medium">Real-time Traffic Monitoring</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50/50 to-green-50/50 dark:from-blue-900/10 dark:to-green-900/10"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-lg border border-gray-100/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900/30 dark:to-green-900/30 rounded-xl">
                      <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{stat.number}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Everything you need for intelligent traffic management and enforcement
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  onMouseEnter={() => setHoveredFeature(index)}
                  onMouseLeave={() => setHoveredFeature(null)}
                  whileHover={{ y: -8 }}
                  className="group relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-green-50/50 dark:from-blue-900/10 dark:to-green-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="relative z-10">
                    <div className={`inline-block p-4 bg-gradient-to-br ${feature.color} rounded-xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {feature.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {feature.description}
                    </p>

                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={hoveredFeature === index ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                      className="mt-4 flex items-center text-blue-600 dark:text-blue-400 font-medium text-sm"
                    >
                      <span>Learn more</span>
                      <ArrowRightIcon className="w-4 h-4 ml-2" />
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50/50 to-green-50/50 dark:from-blue-900/10 dark:to-green-900/10"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Ready to Make Roads Safer?
            </h2>

            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              Join our intelligent traffic management system and experience the future of road safety with AI-powered detection and smart enforcement.
            </p>

            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              onClick={onGetStarted}
              className="px-10 py-4 bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 inline-flex items-center space-x-2 group"
            >
              <span>Get Started Today</span>
              <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-white dark:bg-gray-800 border-t border-gray-200/50 dark:border-gray-700/50 py-12 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">TG</span>
                </div>
                <span className="font-bold text-gray-900 dark:text-white">TrafficGuard</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Smart Enforcement System</p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><button onClick={() => {}} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left">Features</button></li>
                <li><button onClick={() => {}} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left">Pricing</button></li>
                <li><button onClick={() => {}} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left">Security</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><button onClick={() => {}} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left">About</button></li>
                <li><button onClick={() => {}} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left">Blog</button></li>
                <li><button onClick={() => {}} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left">Contact</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><button onClick={() => {}} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left">Privacy</button></li>
                <li><button onClick={() => {}} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left">Terms</button></li>
                <li><button onClick={() => {}} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left">Cookies</button></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200/50 dark:border-gray-700/50 pt-8">
            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              © 2024 TrafficGuard. All rights reserved. | Intelligent Traffic Management System
            </p>
          </div>
        </div>
      </motion.footer>
    </div>
  );
};

export default LandingPage;
