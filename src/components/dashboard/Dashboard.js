import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ExclamationTriangleIcon, 
  MapPinIcon,
  BellIcon,
  UserGroupIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ClockIcon,
  ShieldCheckIcon,
  DocumentChartBarIcon,
  CameraIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { useAuth } from '../../contexts/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalViolations: 0,
    pendingFines: 0,
    resolvedCases: 0,
    totalRevenue: 0
  });

  const [violationData] = useState([
    { name: 'No Helmet', count: 45, color: '#10b981', percentage: 35 },
    { name: 'Overspeeding', count: 32, color: '#f59e0b', percentage: 25 },
    { name: 'Red Light', count: 28, color: '#ef4444', percentage: 22 },
    { name: 'Wrong Lane', count: 15, color: '#8b5cf6', percentage: 18 },
  ]);

  const [weeklyData] = useState([
    { day: 'Mon', violations: 12, resolved: 8, pending: 4 },
    { day: 'Tue', violations: 19, resolved: 15, pending: 4 },
    { day: 'Wed', violations: 8, resolved: 6, pending: 2 },
    { day: 'Thu', violations: 15, resolved: 12, pending: 3 },
    { day: 'Fri', violations: 22, resolved: 18, pending: 4 },
    { day: 'Sat', violations: 18, resolved: 14, pending: 4 },
    { day: 'Sun', violations: 10, resolved: 8, pending: 2 },
  ]);

  const [performanceData] = useState([
    { name: 'Detection Rate', value: 94, color: '#10b981' },
    { name: 'Resolution Rate', value: 87, color: '#3b82f6' },
    { name: 'Payment Rate', value: 76, color: '#f59e0b' },
  ]);

  const [recentViolations] = useState([
    { id: 1, vehicle: 'MH12AB1234', type: 'No Helmet', location: 'Bandra West', time: '2 hours ago', status: 'pending' },
    { id: 2, vehicle: 'DL08CA9876', type: 'Overspeeding', location: 'Andheri East', time: '4 hours ago', status: 'resolved' },
    { id: 3, vehicle: 'KA03HB5432', type: 'Red Light Jump', location: 'Powai', time: '6 hours ago', status: 'pending' },
    { id: 4, vehicle: 'TN09CC7890', type: 'Wrong Lane', location: 'Kurla', time: '8 hours ago', status: 'resolved' },
  ]);

  useEffect(() => {
    // Simulate loading stats
    const timer = setTimeout(() => {
      setStats({
        totalViolations: user?.role === 'government' ? 1247 : 3,
        pendingFines: user?.role === 'government' ? 892 : 2,
        resolvedCases: user?.role === 'government' ? 355 : 1,
        totalRevenue: user?.role === 'government' ? 2840000 : 5000
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [user]);

  const StatCard = ({ title, value, icon: Icon, gradient, change, trend }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="relative overflow-hidden bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 group"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-5 group-hover:opacity-10 transition-opacity`}></div>
      <div className="relative p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">{title}</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2 mb-1">{value}</p>
            {change && (
              <div className="flex items-center space-x-1">
                {trend === 'up' ? (
                  <ArrowTrendingUpIcon className="w-4 h-4 text-emerald-500" />
                ) : (
                  <ArrowTrendingDownIcon className="w-4 h-4 text-red-500" />
                )}
                <p className={`text-sm font-medium ${trend === 'up' ? 'text-emerald-600' : 'text-red-600'}`}>
                  {change > 0 ? '+' : ''}{change}% from last week
                </p>
              </div>
            )}
          </div>
          <div className={`p-4 rounded-2xl bg-gradient-to-br ${gradient} shadow-lg`}>
            <Icon className="w-8 h-8 text-white" />
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {user?.role === 'government' ? 'Traffic Control Dashboard' : 'My Dashboard'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {user?.role === 'government' 
              ? 'Monitor traffic violations and manage enforcement activities'
              : `Welcome back, ${user?.name === 'John Doe' ? 'Ahmed' : user?.name}. Here's your traffic summary.`}
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <CameraIcon className="w-4 h-4" />
            <span>New Report</span>
          </button>
          <button className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <BellIcon className="w-4 h-4" />
            <span>Alerts</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Violations"
          value={stats.totalViolations.toLocaleString()}
          icon={ExclamationTriangleIcon}
          gradient="from-rose-500 to-pink-600"
          change={12}
          trend="up"
        />
        <StatCard
          title="Pending Fines"
          value={stats.pendingFines.toLocaleString()}
          icon={ClockIcon}
          gradient="from-amber-500 to-orange-600"
          change={-5}
          trend="down"
        />
        <StatCard
          title="Resolved Cases"
          value={stats.resolvedCases.toLocaleString()}
          icon={ShieldCheckIcon}
          gradient="from-emerald-500 to-teal-600"
          change={8}
          trend="up"
        />
        <StatCard
          title="Total Revenue"
          value={`₹${(stats.totalRevenue / 1000).toFixed(0)}K`}
          icon={DocumentChartBarIcon}
          gradient="from-blue-500 to-indigo-600"
          change={15}
          trend="up"
        />
      </div>

      {/* Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Violation Types Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Violation Distribution</h3>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Live Data</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={violationData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  dataKey="count"
                  startAngle={90}
                  endAngle={450}
                >
                  {violationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'rgba(17, 24, 39, 0.8)',
                    border: 'none',
                    borderRadius: '12px',
                    color: 'white'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-4">
              {violationData.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="font-medium text-gray-900 dark:text-white">{item.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900 dark:text-white">{item.count}</div>
                    <div className="text-sm text-gray-500">{item.percentage}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Performance Metrics */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700"
        >
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">System Performance</h3>
          <div className="space-y-6">
            {performanceData.map((metric, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{metric.name}</span>
                  <span className="text-lg font-bold text-gray-900 dark:text-white">{metric.value}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div 
                    className="h-3 rounded-full transition-all duration-1000 ease-out"
                    style={{ 
                      width: `${metric.value}%`,
                      background: `linear-gradient(90deg, ${metric.color}, ${metric.color}dd)`
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Weekly Trend Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700"
      >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Weekly Activity Trend</h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Total</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Resolved</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={weeklyData}>
              <defs>
                <linearGradient id="violationsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="resolvedGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
              <XAxis 
                dataKey="day" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#6b7280', fontSize: 12 }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#6b7280', fontSize: 12 }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(17, 24, 39, 0.9)',
                  border: 'none',
                  borderRadius: '12px',
                  color: 'white',
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="violations" 
                stroke="#3b82f6" 
                strokeWidth={3}
                fill="url(#violationsGradient)"
              />
              <Area 
                type="monotone" 
                dataKey="resolved" 
                stroke="#10b981" 
                strokeWidth={3}
                fill="url(#resolvedGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700"
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Recent Violations</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentViolations.map((violation) => (
              <div key={violation.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className={`w-3 h-3 rounded-full ${
                    violation.status === 'resolved' ? 'bg-emerald-500' : 'bg-amber-500'
                  }`}></div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{violation.vehicle}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{violation.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                    <MapPinIcon className="w-4 h-4 mr-1" />
                    {violation.location}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">{violation.time}</p>
                </div>
                <div>
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                    violation.status === 'resolved' 
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200'
                      : 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200'
                  }`}>
                    {violation.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      {user?.role === 'government' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700"
        >
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl hover:from-blue-100 hover:to-indigo-100 dark:hover:from-blue-900/30 dark:hover:to-indigo-900/30 transition-all duration-200 group">
              <UserGroupIcon className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <p className="text-sm font-medium text-blue-900 dark:text-blue-100">Manage Officers</p>
            </button>
            <button className="p-6 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-xl hover:from-emerald-100 hover:to-green-100 dark:hover:from-emerald-900/30 dark:hover:to-green-900/30 transition-all duration-200 group">
              <ChartBarIcon className="w-8 h-8 text-emerald-600 dark:text-emerald-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <p className="text-sm font-medium text-emerald-900 dark:text-emerald-100">Generate Reports</p>
            </button>
            <button className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl hover:from-purple-100 hover:to-pink-100 dark:hover:from-purple-900/30 dark:hover:to-pink-900/30 transition-all duration-200 group">
              <MapPinIcon className="w-8 h-8 text-purple-600 dark:text-purple-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <p className="text-sm font-medium text-purple-900 dark:text-purple-100">Monitor Zones</p>
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Dashboard;
