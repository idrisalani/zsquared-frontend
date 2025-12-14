/**
 * Navigation Bar with Auth
 * - Links
 * - User profile
 * - Logout button
 */
import { useNavigate } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';

export function Navbar() {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('auth_token');

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 glass border-b border-amber-700/50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <span className="text-3xl">🎉</span>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
            ZSquared
          </h1>
        </div>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <button
                onClick={() => navigate('/booking')}
                className="px-6 py-2 text-white hover:text-cyan-400 transition"
              >
                Book Now
              </button>
              <button
                onClick={() => navigate('/admin')}
                className="px-6 py-2 border border-amber-700 text-white rounded-lg hover:bg-amber-800 transition flex items-center gap-2"
              >
                <User size={18} />
                Admin
              </button>
              <button
                onClick={handleLogout}
                className="px-6 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition flex items-center gap-2"
              >
                <LogOut size={18} />
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate('/login')}
                className="px-6 py-2 text-white hover:text-cyan-400 transition"
              >
                Login
              </button>
              <button
                onClick={() => navigate('/register')}
                className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:from-cyan-600 hover:to-blue-700 transition"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
