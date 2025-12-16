/**
 * Booking Confirmation Page - COMPLETE WITH ALL DETAILS
 * Shows full booking information including price breakdown
 * - Retrieves bookingState from navigation location
 * - No longer needs prop
 * - Works with App.tsx routing
 */

import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle, Calendar, Users, Clock, Zap, DollarSign, Mail, Phone, Home, Download } from 'lucide-react';

// Local type definitions
interface Service {
  name?: string;
  description?: string;
  duration?: number;
}

interface CustomerInfo {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  streetAddress?: string;
  city?: string;
  postalCode?: string;
}

interface AddOnDetail {
  id: string;
  name: string;
  price: number;
}

interface BookingState {
  selectedDate?: string;
  selectedService?: Service;
  selectedOptions?: Record<string, unknown>;
  customerInfo?: CustomerInfo;
  totalPrice: number;
}

interface LocationState {
  bookingState?: BookingState;
}

export function BookingConfirmationPage() {
  const location = useLocation();
  const locationState = location.state as LocationState;
  const bookingState = locationState?.bookingState || {
    selectedDate: undefined,
    selectedService: undefined,
    selectedOptions: {},
    customerInfo: {},
    totalPrice: 0
  };

  // Generate random order number
  const [orderNumber] = useState(() => {
    return `ZSQ${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
  });

  // ✅ FIX #2: Format date correctly (handle timezone)
  const formattedDate = bookingState.selectedDate 
    ? new Date(bookingState.selectedDate + 'T00:00:00').toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : 'TBD';

  // Get base duration
  const baseDuration = bookingState.selectedService?.duration 
    ? bookingState.selectedService.duration / 60 
    : 0;

  // Get additional hours
  const additionalHours = (bookingState.selectedOptions?.additionalHours as number) || 0;
  const totalHours = baseDuration + additionalHours;

  // Get guest count
  const guestCount = (bookingState.selectedOptions?.guestCount as number) || 0;

  // ✅ FIX #1: Get add-ons details directly from selectedOptions
  const addOnsDetails = (bookingState.selectedOptions?.addOnsDetails as AddOnDetail[]) || [];
  
  const selectedAddOns = addOnsDetails;
  const addOnsTotal = selectedAddOns.reduce((sum, addon) => sum + addon.price, 0);

  // Calculate price breakdown
  const hoursPrice = additionalHours * 50; // $50 per additional hour
  const baseServicePrice = Math.round((bookingState.totalPrice - hoursPrice - addOnsTotal) * 100) / 100;

  // Get customer info
  const customerName = `${bookingState.customerInfo?.firstName || ''} ${bookingState.customerInfo?.lastName || ''}`.trim();
  const customerEmail = bookingState.customerInfo?.email || '';
  const customerPhone = bookingState.customerInfo?.phone || '';

  return (
    <div className="min-h-screen w-screen bg-linear-to-br from-white via-amber-50 to-yellow-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-amber-200">
        <div className="w-full px-4 sm:px-8 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 hover:opacity-70 transition">
            <Home size={24} className="text-amber-600" />
            <span className="font-bold text-amber-900">ZSquared</span>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="w-full px-4 sm:px-8 py-12 md:py-24">
        {/* Success Header */}
        <div className="mb-12 text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-r from-green-400 to-amber-400 rounded-full blur-lg opacity-75"></div>
              <div className="relative bg-white rounded-full p-4">
                <CheckCircle size={64} className="text-green-600" />
              </div>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-amber-900 mb-3">
            Booking Confirmed!
          </h1>
          <p className="text-lg text-amber-600 mb-4">
            Your event has been successfully booked
          </p>
          <div className="inline-block bg-amber-600 text-white px-6 py-3 rounded-lg font-bold text-lg">
            Order #{orderNumber}
          </div>
        </div>

        {/* Content Grid */}
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Event Details Card */}
          <div className="rounded-2xl border-2 border-amber-200 bg-white p-8">
            <h2 className="text-2xl font-bold text-amber-900 mb-6 flex items-center gap-3">
              <Calendar size={28} className="text-amber-600" />
              Your Event Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Service */}
              <div className="pb-6 border-b md:border-b-0 md:border-r border-amber-200">
                <p className="text-sm text-amber-600 font-semibold mb-2">Service</p>
                <p className="text-2xl font-bold text-amber-900 mb-2">
                  {bookingState.selectedService?.name || 'Service'}
                </p>
                <p className="text-sm text-amber-600">
                  {bookingState.selectedService?.description}
                </p>
              </div>

              {/* Date */}
              <div className="pb-6 border-b md:border-b-0 border-amber-200">
                <p className="text-sm text-amber-600 font-semibold mb-2">Event Date</p>
                <p className="text-2xl font-bold text-amber-900">{formattedDate}</p>
              </div>

              {/* Duration */}
              <div className="pb-6 border-b md:border-b-0 md:border-r border-amber-200">
                <div className="flex items-center gap-2 mb-2">
                  <Clock size={16} className="text-amber-600" />
                  <p className="text-sm text-amber-600 font-semibold">Duration</p>
                </div>
                <p className="text-2xl font-bold text-amber-900">
                  {totalHours}h total
                </p>
                <p className="text-sm text-amber-600 mt-1">
                  {baseDuration}h base {additionalHours > 0 && `+ ${additionalHours}h extension`}
                </p>
              </div>

              {/* Guests */}
              <div className="pb-6 border-b md:border-b-0 border-amber-200">
                <div className="flex items-center gap-2 mb-2">
                  <Users size={16} className="text-amber-600" />
                  <p className="text-sm text-amber-600 font-semibold">Number of Guests</p>
                </div>
                <p className="text-2xl font-bold text-amber-900">{guestCount}</p>
              </div>
            </div>
          </div>

          {/* Add-ons Card */}
          {selectedAddOns.length > 0 && (
            <div className="rounded-2xl border-2 border-amber-200 bg-white p-8">
              <h2 className="text-2xl font-bold text-amber-900 mb-6 flex items-center gap-3">
                <Zap size={28} className="text-amber-600" />
                Selected Add-ons ({selectedAddOns.length})
              </h2>

              <div className="space-y-3">
                {selectedAddOns.map((addon) => (
                  <div key={addon.id} className="flex items-center justify-between p-3 bg-amber-50 rounded-lg border border-amber-200">
                    <p className="font-semibold text-amber-900">{addon.name}</p>
                    <p className="text-amber-600 font-bold">+${addon.price.toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Price Breakdown Card */}
          <div className="rounded-2xl border-2 border-green-300 bg-green-50 p-8">
            <h2 className="text-2xl font-bold text-amber-900 mb-6 flex items-center gap-3">
              <DollarSign size={28} className="text-green-600" />
              Price Breakdown
            </h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center pb-3 border-b border-green-200">
                <p className="text-amber-700">Base Service ({bookingState.selectedService?.name})</p>
                <p className="font-semibold text-amber-900">${baseServicePrice.toFixed(2)}</p>
              </div>

              {additionalHours > 0 && (
                <div className="flex justify-between items-center pb-3 border-b border-green-200">
                  <p className="text-amber-700">{additionalHours}h Additional Hour(s) @ $50/hr</p>
                  <p className="font-semibold text-amber-900">${hoursPrice.toFixed(2)}</p>
                </div>
              )}

              {addOnsTotal > 0 && (
                <div className="flex justify-between items-center pb-3 border-b border-green-200">
                  <p className="text-amber-700">Selected Add-ons ({selectedAddOns.length})</p>
                  <p className="font-semibold text-amber-900">${addOnsTotal.toFixed(2)}</p>
                </div>
              )}

              <div className="flex justify-between items-center pt-3">
                <p className="text-lg font-bold text-amber-900">Total Price</p>
                <p className="text-3xl font-bold bg-linear-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  ${bookingState.totalPrice.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          {/* Customer Details Card */}
          <div className="rounded-2xl border-2 border-amber-200 bg-white p-8">
            <h2 className="text-2xl font-bold text-amber-900 mb-6">Your Contact Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Name */}
              <div>
                <p className="text-sm text-amber-600 font-semibold mb-2">Full Name</p>
                <p className="text-lg font-bold text-amber-900">{customerName}</p>
              </div>

              {/* Email */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Mail size={16} className="text-amber-600" />
                  <p className="text-sm text-amber-600 font-semibold">Email Address</p>
                </div>
                <p className="text-lg font-bold text-amber-900 break-all">{customerEmail}</p>
              </div>

              {/* Phone */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Phone size={16} className="text-amber-600" />
                  <p className="text-sm text-amber-600 font-semibold">Phone Number</p>
                </div>
                <p className="text-lg font-bold text-amber-900">{customerPhone}</p>
              </div>

              {/* Address */}
              {bookingState.customerInfo?.streetAddress && (
                <div>
                  <p className="text-sm text-amber-600 font-semibold mb-2">Address</p>
                  <p className="text-lg font-bold text-amber-900">
                    {bookingState.customerInfo.streetAddress}
                    {bookingState.customerInfo.city && `, ${bookingState.customerInfo.city}`}
                    {bookingState.customerInfo.postalCode && ` ${bookingState.customerInfo.postalCode}`}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Next Steps Card */}
          <div className="rounded-2xl border-2 border-amber-300 bg-amber-50 p-8">
            <h2 className="text-2xl font-bold text-amber-900 mb-6">What Happens Next?</h2>

            <div className="space-y-4">
              {/* Step 1 */}
              <div className="flex gap-4">
                <div className="shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-amber-600 text-white font-bold">
                    1
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-amber-900">Confirmation Email Sent</h3>
                  <p className="text-amber-600 mt-1">
                    A confirmation email has been sent to <span className="font-semibold">{customerEmail}</span> with all your booking details
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-4">
                <div className="shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-600 text-white font-bold">
                    2
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-amber-900">Vendor Will Contact You</h3>
                  <p className="text-amber-600 mt-1">
                    Our {bookingState.selectedService?.name || 'service'} vendor will reach out within 24 hours to confirm details and discuss any requirements
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-4">
                <div className="shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-amber-600 text-white font-bold">
                    3
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-amber-900">Payment Due</h3>
                  <p className="text-amber-600 mt-1">
                    Payment of <span className="font-bold">${bookingState.totalPrice.toFixed(2)}</span> is due on the day of your event or as agreed with the vendor
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Important Notes */}
          <div className="rounded-2xl border-2 border-yellow-300 bg-yellow-50 p-8">
            <h3 className="text-lg font-bold text-amber-900 mb-4">Important Information</h3>
            <ul className="space-y-2 text-amber-700">
              <li className="flex items-start gap-3">
                <span className="text-yellow-600 font-bold mt-0.5">•</span>
                <span>Keep your order number <span className="font-bold">#{orderNumber}</span> handy for all communications</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-yellow-600 font-bold mt-0.5">•</span>
                <span>Check your email (including spam folder) for the confirmation message</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-yellow-600 font-bold mt-0.5">•</span>
                <span>Have your contact information ready when the vendor calls</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-yellow-600 font-bold mt-0.5">•</span>
                <span>Contact us immediately if you need to make any changes</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-amber-600 border-2 border-amber-600 text-amber-600 rounded-lg hover:bg-amber-700 transition font-bold">
              <Download size={20} />
              Download Booking Report
            </button>
            <Link
              to="/"
              className="flex-1 flex items-center justify-center gap-2 px-6 py-4 border-2 border-amber-600 text-amber-600 rounded-lg hover:bg-amber-50 transition font-bold"
            >
              🏠 Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
