/**
 * Logout Page - Modern Vibrant Design
 * - Full-width layout (w-screen)
 * - Light theme (white/blue/purple)
 * - Vibrant gradients
 * - Modern UI/UX
 */

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Home, AlertCircle, CheckCircle } from 'lucide-react';

export function LogoutPage() {
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutComplete, setLogoutComplete] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      // TODO: Call API to logout
      console.log('Logging out...');
      
      // Clear local storage
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
      
      setLogoutComplete(true);
      
      // Redirect after 2 seconds
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Logout failed';
      console.error('Logout error:', errorMessage);
      // Still redirect on error
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="w-screen min-h-screen bg-linear-to-br from-white via-blue-50 to-purple-50 overflow-x-hidden">
      {/* Navbar */}
      <nav className="w-full border-b border-gray-200/50 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="w-full px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-3 hover:opacity-70 transition"
            >
              <Home size={24} className="text-blue-600" />
              <span className="font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ZSquared
              </span>
            </button>
            <div className="text-sm text-gray-600 font-semibold">
              Signing out...
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="w-full px-4 sm:px-8 py-12 md:py-24 flex items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 shadow-xl hover:shadow-2xl transition">
            {/* Logout Complete */}
            {logoutComplete ? (
              <>
                {/* Success Icon */}
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-linear-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                    <CheckCircle size={32} className="text-white" />
                  </div>
                </div>

                {/* Success Message */}
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">You're logged out</h1>
                  <p className="text-gray-600">Thank you for using ZSquared!</p>
                </div>

                {/* Success Details */}
                <div className="mb-8 p-4 bg-green-100 border-2 border-green-300 rounded-lg flex items-start gap-3">
                  <CheckCircle size={20} className="text-green-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-green-900">Logout successful!</p>
                    <p className="text-sm text-green-800">Redirecting to home page...</p>
                  </div>
                </div>

                {/* Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={() => navigate('/')}
                    className="w-full px-6 py-3 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition font-bold"
                  >
                    Go to Home
                  </button>
                  <Link
                    to="/login"
                    className="w-full block text-center px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition font-bold"
                  >
                    Login Again
                  </Link>
                </div>
              </>
            ) : (
              <>
                {/* Logout Icon */}
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-linear-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center">
                    <AlertCircle size={32} className="text-white" />
                  </div>
                </div>

                {/* Logout Header */}
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">Confirm Logout</h1>
                  <p className="text-gray-600">Are you sure you want to log out?</p>
                </div>

                {/* Information */}
                <div className="mb-8 p-4 bg-blue-100 border-2 border-blue-300 rounded-lg">
                  <p className="text-sm text-blue-900">
                    You'll need to log in again to access your bookings and account.
                  </p>
                </div>

                {/* Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="w-full px-6 py-3 bg-linear-to-r from-red-500 to-red-600 text-white rounded-lg hover:shadow-lg hover:shadow-red-500/50 transition font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoggingOut ? 'Logging out...' : 'Yes, Logout'}
                  </button>
                  <button
                    onClick={() => navigate('/')}
                    disabled={isLoggingOut}
                    className="w-full px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Cancel
                  </button>
                </div>

                {/* Footer */}
                <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                  <Link
                    to="/"
                    className="text-blue-600 hover:text-blue-700 font-semibold transition"
                  >
                    ← Back to Home
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}