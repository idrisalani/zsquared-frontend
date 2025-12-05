/**
 * Admin Dashboard
 * - Booking management
 * - Analytics
 * - Services management
 * - Customer management
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BarChart3,
  Users,
  Calendar,
  DollarSign,
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react';

export function AdminDashboard() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 to-slate-900 flex">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } glass border-r border-slate-700/50 transition-all duration-300 flex flex-col`}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-700/50 flex items-center justify-between">
          {sidebarOpen && (
            <div className="flex items-center gap-2">
              <span className="text-2xl">⚙️</span>
              <h1 className="text-lg font-bold text-white">Admin</h1>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-slate-700/50 rounded-lg transition"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-6 space-y-4">
          {[
            { id: 'overview', icon: BarChart3, label: 'Overview' },
            { id: 'bookings', icon: Calendar, label: 'Bookings' },
            { id: 'customers', icon: Users, label: 'Customers' },
            { id: 'revenue', icon: DollarSign, label: 'Revenue' },
            { id: 'settings', icon: Settings, label: 'Settings' }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                activeTab === item.id
                  ? 'bg-cyan-500/20 border border-cyan-500/50 text-cyan-400'
                  : 'text-slate-400 hover:bg-slate-700/30'
              }`}
            >
              <item.icon size={20} />
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-6 border-t border-slate-700/50">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition"
          >
            <LogOut size={20} />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="sticky top-0 z-40 glass border-b border-slate-700/50 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-white">
                {activeTab === 'overview' && 'Dashboard'}
                {activeTab === 'bookings' && 'Bookings'}
                {activeTab === 'customers' && 'Customers'}
                {activeTab === 'revenue' && 'Revenue'}
                {activeTab === 'settings' && 'Settings'}
              </h2>
            </div>
            <div className="text-right">
              <p className="text-slate-400">Welcome back, Admin</p>
              <p className="text-sm text-slate-500">{new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-8">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="glass rounded-xl p-6 border border-slate-700/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Total Bookings</p>
                      <p className="text-4xl font-bold text-white mt-2">1,234</p>
                      <p className="text-sm text-cyan-400 mt-2">+12% from last month</p>
                    </div>
                    <Calendar size={40} className="text-cyan-400/30" />
                  </div>
                </div>

                <div className="glass rounded-xl p-6 border border-slate-700/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Total Revenue</p>
                      <p className="text-4xl font-bold text-white mt-2">$45,321</p>
                      <p className="text-sm text-cyan-400 mt-2">+8% from last month</p>
                    </div>
                    <DollarSign size={40} className="text-cyan-400/30" />
                  </div>
                </div>

                <div className="glass rounded-xl p-6 border border-slate-700/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Total Customers</p>
                      <p className="text-4xl font-bold text-white mt-2">856</p>
                      <p className="text-sm text-cyan-400 mt-2">+22% from last month</p>
                    </div>
                    <Users size={40} className="text-cyan-400/30" />
                  </div>
                </div>

                <div className="glass rounded-xl p-6 border border-slate-700/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Avg. Rating</p>
                      <p className="text-4xl font-bold text-white mt-2">4.8</p>
                      <p className="text-sm text-cyan-400 mt-2">⭐⭐⭐⭐⭐</p>
                    </div>
                    <BarChart3 size={40} className="text-cyan-400/30" />
                  </div>
                </div>
              </div>

              {/* Charts Placeholder */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="glass rounded-xl p-6 border border-slate-700/50">
                  <h3 className="text-xl font-bold text-white mb-4">Bookings Trend</h3>
                  <div className="h-64 flex items-center justify-center text-slate-400">
                    <p>Chart visualization coming soon</p>
                  </div>
                </div>

                <div className="glass rounded-xl p-6 border border-slate-700/50">
                  <h3 className="text-xl font-bold text-white mb-4">Top Services</h3>
                  <div className="space-y-4">
                    {[
                      { name: '360° VR Experience', bookings: 234, revenue: '$18,240' },
                      { name: 'Photo Booth', bookings: 189, revenue: '$13,230' },
                      { name: 'Bouncy House', bookings: 156, revenue: '$9,360' }
                    ].map((service, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-slate-700/20 rounded-lg">
                        <div>
                          <p className="text-white font-semibold">{service.name}</p>
                          <p className="text-sm text-slate-400">{service.bookings} bookings</p>
                        </div>
                        <p className="text-cyan-400 font-bold">{service.revenue}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'bookings' && (
            <div className="glass rounded-xl p-6 border border-slate-700/50">
              <h3 className="text-2xl font-bold text-white mb-6">Recent Bookings</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-700/50">
                      <th className="px-6 py-3 text-slate-400 font-semibold">Booking ID</th>
                      <th className="px-6 py-3 text-slate-400 font-semibold">Customer</th>
                      <th className="px-6 py-3 text-slate-400 font-semibold">Service</th>
                      <th className="px-6 py-3 text-slate-400 font-semibold">Date</th>
                      <th className="px-6 py-3 text-slate-400 font-semibold">Amount</th>
                      <th className="px-6 py-3 text-slate-400 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { id: '#BK001', customer: 'John Doe', service: 'VR Experience', date: '2024-01-15', amount: '$450', status: 'Confirmed' },
                      { id: '#BK002', customer: 'Jane Smith', service: 'Photo Booth', date: '2024-01-14', amount: '$320', status: 'Confirmed' },
                      { id: '#BK003', customer: 'Mike Johnson', service: 'Bouncy House', date: '2024-01-13', amount: '$280', status: 'Pending' }
                    ].map((booking, idx) => (
                      <tr key={idx} className="border-b border-slate-700/50 hover:bg-slate-700/20">
                        <td className="px-6 py-4 text-white font-semibold">{booking.id}</td>
                        <td className="px-6 py-4 text-slate-300">{booking.customer}</td>
                        <td className="px-6 py-4 text-slate-300">{booking.service}</td>
                        <td className="px-6 py-4 text-slate-300">{booking.date}</td>
                        <td className="px-6 py-4 text-cyan-400 font-semibold">{booking.amount}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            booking.status === 'Confirmed'
                              ? 'bg-green-500/20 text-green-400'
                              : 'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {booking.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'customers' && (
            <div className="glass rounded-xl p-6 border border-slate-700/50">
              <h3 className="text-2xl font-bold text-white mb-6">Customers</h3>
              <p className="text-slate-400">Customer management features coming soon</p>
            </div>
          )}

          {activeTab === 'revenue' && (
            <div className="glass rounded-xl p-6 border border-slate-700/50">
              <h3 className="text-2xl font-bold text-white mb-6">Revenue Analytics</h3>
              <p className="text-slate-400">Revenue analytics coming soon</p>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="glass rounded-xl p-6 border border-slate-700/50">
              <h3 className="text-2xl font-bold text-white mb-6">Settings</h3>
              <p className="text-slate-400">Admin settings coming soon</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}