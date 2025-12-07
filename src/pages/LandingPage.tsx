/**
 * Landing Page - Modern Vibrant Design
 * - Full-width layout
 * - Single clean navbar
 * - Vibrant gradients
 * - Lively animations
 * - NO dark section at top
 */

import { useNavigate } from 'react-router-dom';
import { Zap, Users, Award, ArrowRight, Play } from 'lucide-react';

export function LandingPage() {
  const navigate = useNavigate();

  const handleBooking = () => {
    navigate('/booking');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="w-screen min-h-screen bg-linear-to-br from-white via-blue-50 to-purple-50 overflow-x-hidden">
      {/* Navbar - SINGLE CLEAN VERSION */}
      <nav className="w-full border-b border-gray-200/50 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="w-full px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-3xl">🎉</div>
              <span className="text-2xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ZSquared
              </span>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={handleLogin}
                className="px-6 py-2 text-gray-700 hover:text-gray-900 font-semibold transition">
                Login
              </button>
              <button
                onClick={handleBooking}
                className="px-6 py-2 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition font-semibold"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="w-full px-8 py-24">
        <div className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <div className="inline-block mb-4 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                ✨ Next-Gen Event Booking Platform
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Book Your Perfect{' '}
                <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Event Today
                </span>
              </h1>

              <p className="text-xl text-gray-600 mb-8">
                Professional event booking platform for entertainment services. From immersive VR experiences to cotton candy machines, we've got everything you need.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <button
                  onClick={() => navigate('/booking')}
                  className="px-8 py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-2xl hover:shadow-blue-500/50 transition font-bold flex items-center justify-center gap-2 group"
                >
                  Book Now
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition" />
                </button>
                <button className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:border-gray-400 hover:bg-gray-50 transition font-bold flex items-center justify-center gap-2">
                  <Play size={20} />
                  Learn More
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <div className="text-3xl font-bold text-gray-900">1000+</div>
                  <p className="text-gray-600 text-sm">Happy Customers</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">500+</div>
                  <p className="text-gray-600 text-sm">Events Booked</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">24/7</div>
                  <p className="text-gray-600 text-sm">Customer Support</p>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-r from-blue-400/30 to-purple-400/30 rounded-3xl blur-3xl"></div>
              <div className="relative bg-linear-to-br from-blue-100 to-purple-100 rounded-3xl p-8 border border-blue-200/50 backdrop-blur">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition">
                    <div className="text-4xl mb-2">🎮</div>
                    <p className="font-semibold text-gray-900">360° VR</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition">
                    <div className="text-4xl mb-2">🏠</div>
                    <p className="font-semibold text-gray-900">Bouncy House</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition">
                    <div className="text-4xl mb-2">🍭</div>
                    <p className="font-semibold text-gray-900">Cotton Candy</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition">
                    <div className="text-4xl mb-2">📸</div>
                    <p className="font-semibold text-gray-900">Photo Booth</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full bg-linear-to-b from-transparent to-blue-100/50 px-8 py-20">
        <div className="w-full">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Why Choose ZSquared?
            </h2>
            <p className="text-xl text-gray-600">Everything you need for the perfect event</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-xl hover:border-blue-300 transition">
              <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                <Zap size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Lightning Fast</h3>
              <p className="text-gray-600">Book your event in just 4 simple steps. Quick, easy, and hassle-free.</p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-xl hover:border-purple-300 transition">
              <div className="w-12 h-12 bg-linear-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                <Award size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Quality Guaranteed</h3>
              <p className="text-gray-600">Premium services with professional staff. Your satisfaction is our priority.</p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-xl hover:border-pink-300 transition">
              <div className="w-12 h-12 bg-linear-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mb-4">
                <Users size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">24/7 Support</h3>
              <p className="text-gray-600">Our team is always here to help. Get support whenever you need it.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full px-8 py-20">
        <div className="w-full">
          <div className="bg-linear-to-r from-blue-600 to-purple-600 rounded-3xl p-12 md:p-16 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 text-9xl opacity-10">✨</div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6 relative z-10">
              Ready to Plan Your Event?
            </h2>
            <p className="text-xl text-blue-100 mb-8 relative z-10">
              Join 1000+ happy customers and book your perfect event today
            </p>
            <button
              onClick={() => navigate('/booking')}
              className="relative z-10 px-8 py-4 bg-white text-blue-600 rounded-xl hover:shadow-2xl transition font-bold text-lg"
            >
              Get Started Now
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-gray-50 border-t border-gray-200 px-8 py-12">
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="text-2xl">🎉</div>
                <span className="font-bold text-gray-900">ZSquared</span>
              </div>
              <p className="text-gray-600">Professional event booking platform.</p>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Services</h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-blue-600">VR Experiences</a></li>
                <li><a href="#" className="hover:text-blue-600">Entertainment</a></li>
                <li><a href="#" className="hover:text-blue-600">Catering</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Company</h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-blue-600">About Us</a></li>
                <li><a href="#" className="hover:text-blue-600">Contact</a></li>
                <li><a href="#" className="hover:text-blue-600">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-blue-600">Privacy</a></li>
                <li><a href="#" className="hover:text-blue-600">Terms</a></li>
                <li><a href="#" className="hover:text-blue-600">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-8 text-center text-gray-600">
            <p>&copy; 2025 ZSquared. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}