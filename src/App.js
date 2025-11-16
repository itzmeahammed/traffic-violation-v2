import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import AuthPage from './components/auth/AuthPage';
import LandingPage from './components/landing/LandingPage';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './components/dashboard/Dashboard';
import ViolationDetection from './components/violations/ViolationDetection';
import ViolationList from './components/violations/ViolationList';
import TrafficMap from './components/map/TrafficMap';
import FineManagement from './components/fines/FineManagement';
import ReportCenter from './components/reports/ReportCenter';
import './App.css';

const AppContent = () => {
  const { isAuthenticated, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(false);
  const [showLanding, setShowLanding] = useState(!isAuthenticated);

  useEffect(() => {
    // Check for saved dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'report':
        return <ReportCenter />;
      case 'violations':
        return <ViolationList />;
      case 'map':
        return <TrafficMap />;
      case 'fines':
        return <FineManagement />;
      case 'detection':
        return <ViolationDetection />;
      case 'profile':
        return <Profile />;
      default:
        return <Dashboard />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return showLanding ? (
      <LandingPage onGetStarted={() => setShowLanding(false)} />
    ) : (
      <AuthPage />
    );
  }

  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900 flex flex-col overflow-hidden">
      <Navbar 
        darkMode={darkMode} 
        toggleDarkMode={toggleDarkMode}
      />
      
      <div className="flex flex-1 pt-16 overflow-hidden">
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
        />
        
        <main className="flex-1 ml-64 overflow-y-auto">
          <div className="p-6">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

// Placeholder component for profile
const Profile = () => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Profile Settings</h2>
    <p className="text-gray-600 dark:text-gray-400">User profile management and vehicle information updates.</p>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <AppContent />
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
    </AuthProvider>
  );
}

export default App;
