/**
 * Booking Page Component - COMPLETE & FIXED
 * 4-Step Booking Wizard with correct prop interfaces
 * Step 1: Select Date
 * Step 2: Choose Service
 * Step 3: Customize (Guests + Hours + Add-ons)
 * Step 4: Contact Information
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { CalendarStep } from '../components/steps/CalendarStep';
import { ServiceSelectionStep } from '../components/steps/ServiceSelectionStep';
import { CustomizationStep } from '../components/steps/CustomizationStep';
import { ContactStep } from '../components/steps/ContactStep';
import type { Service } from '../types';

interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  streetAddress?: string;
  city?: string;
  postalCode?: string;
  additionalNotes?: string;
}

interface BookingState {
  selectedDate: string | null;
  selectedService: Service | null;
  selectedOptions: Record<string, unknown>;
  customerInfo: CustomerInfo;
  totalPrice: number;
}

const STEP_NAMES = ['Select Date', 'Choose Service', 'Customize', 'Contact Info'];

export function BookingPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState('');

  const [bookingState, setBookingState] = useState<BookingState>({
    selectedDate: null,
    selectedService: null,
    selectedOptions: {},
    customerInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      streetAddress: '',
      city: '',
      postalCode: '',
      additionalNotes: ''
    },
    totalPrice: 0
  });

  // Handle date selection
  const handleDateSelect = (date: string): void => {
    setBookingState(prev => ({ ...prev, selectedDate: date }));
    setError('');
  };

  // Handle service selection
  const handleServiceSelect = (service: Service): void => {
    setBookingState(prev => ({
      ...prev,
      selectedService: service,
      totalPrice: service.basePrice
    }));
    setError('');
  };

  // Handle customization options change (guests + hours + add-ons)
  const handleOptionsChange = (options: Record<string, unknown>, price: number): void => {
    setBookingState(prev => ({
      ...prev,
      selectedOptions: options,
      totalPrice: price
    }));
    setError('');
  };

  // Handle customer info field change - Fixed for correct interface
  const handleCustomerInfoChange = (field: string, value: string): void => {
    setBookingState(prev => ({
      ...prev,
      customerInfo: { ...prev.customerInfo, [field]: value }
    }));
    setError('');
  };

  // ✅ COMPLETE BOOKING - Navigate to confirmation with state
  const handleCompleteBooking = (): void => {
    // Validate all required fields
    if (!bookingState.selectedDate) {
      setError('Please select a date');
      return;
    }

    if (!bookingState.selectedService) {
      setError('Please select a service');
      return;
    }

    if (!bookingState.customerInfo.firstName || !bookingState.customerInfo.firstName.trim()) {
      setError('Please enter your first name');
      return;
    }

    if (!bookingState.customerInfo.lastName || !bookingState.customerInfo.lastName.trim()) {
      setError('Please enter your last name');
      return;
    }

    if (!bookingState.customerInfo.email || !bookingState.customerInfo.email.trim()) {
      setError('Please enter your email address');
      return;
    }

    if (!bookingState.customerInfo.phone || !bookingState.customerInfo.phone.trim()) {
      setError('Please enter your phone number');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(bookingState.customerInfo.email)) {
      setError('Please enter a valid email address');
      return;
    }

    // Validate phone format (basic check)
    const phoneRegex = /^[\d\s+\-()]+$/;
    if (!phoneRegex.test(bookingState.customerInfo.phone) || bookingState.customerInfo.phone.length < 10) {
      setError('Please enter a valid phone number');
      return;
    }

    // All validation passed - navigate to confirmation with state
    console.log('✅ All validation passed. Booking data:', bookingState);
    
    navigate('/booking/confirmation', { 
      state: { bookingState }
    });
  };

  // Handle next step
  const handleNextStep = (): void => {
    // Validate current step before moving to next
    if (currentStep === 0 && !bookingState.selectedDate) {
      setError('Please select a date to continue');
      return;
    }

    if (currentStep === 1 && !bookingState.selectedService) {
      setError('Please select a service to continue');
      return;
    }

    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
      setError('');
    }
  };

  // Handle previous step
  const handlePreviousStep = (): void => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setError('');
    }
  };

  return (
    <div className="min-h-screen w-screen bg-linear-to-br from-amber via-amber-50 to-yellow-50">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-amber-200">
        <div className="w-full px-4 sm:px-8 py-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-amber-600 to-yellow-600 flex items-center justify-center text-white font-bold">
              P
            </div>
            <span className="text-xl font-bold text-amber-900">Pophauseventz</span>
            <div className="ml-auto text-sm font-semibold text-amber-600">
              Step {currentStep + 1} of 4
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="w-full px-4 sm:px-8 py-8 md:py-16">
        {/* Header - Centered */}
        <div className="max-w-5xl mx-auto mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-amber-900 mb-3">
            Book Your <span className="bg-linear-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">Perfect Event</span>
          </h1>
          <p className="text-lg text-amber-600">Complete your booking in just 4 steps</p>
        </div>

        {/* Progress Indicator - Centered with Step Names Below */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="flex items-start justify-between relative">
            {/* Connector Lines Background */}
            <div className="absolute top-7 left-0 right-0 h-1 -z-10">
              <div className="flex justify-between h-full w-full">
                {[0, 1, 2].map((gap) => (
                  <div
                    key={gap}
                    className="flex-1 h-full transition-all"
                    style={{
                      background: currentStep > gap
                        ? 'linear-gradient(to right, #2563EB, #9333EA)'
                        : '#e5e7eb'
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Steps */}
            {[0, 1, 2, 3].map((step) => (
              <div key={step} className="flex flex-col items-center flex-1 px-2">
                {/* Number Circle */}
                <div
                  className={`
                    w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg transition-all mb-4 relative z-10 bg-white
                    ${currentStep >= step
                      ? 'bg-linear-to-r from-amber-600 to-yellow-600 text-white shadow-lg'
                      : 'bg-gray-200 text-amber-600 border-4 border-white'
                    }
                  `}
                >
                  {step + 1}
                </div>

                {/* Step Name - Centered below */}
                <p className={`
                  text-sm font-semibold text-center whitespace-nowrap
                  ${currentStep >= step ? 'text-amber-900' : 'text-amber-500'}
                `}>
                  {STEP_NAMES[step]}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="max-w-4xl mx-auto">
          {/* Step 1: Calendar */}
          {currentStep === 0 && (
            <div className="animate-fadeIn">
              <CalendarStep
                selectedDate={bookingState.selectedDate}
                onSelectDate={handleDateSelect}
                error={error}
              />
            </div>
          )}

          {/* Step 2: Service Selection */}
          {currentStep === 1 && (
            <div className="animate-fadeIn">
              <ServiceSelectionStep
                selectedServiceId={bookingState.selectedService?.id || null}
                onSelectService={handleServiceSelect}
                error={error}
              />
            </div>
          )}

          {/* Step 3: Customization */}
          {currentStep === 2 && (
            <div className="animate-fadeIn">
              <CustomizationStep
                service={bookingState.selectedService}
                selectedOptions={bookingState.selectedOptions}
                onSelectOptions={handleOptionsChange}
                error={error}
              />
            </div>
          )}

          {/* Step 4: Contact Information */}
          {currentStep === 3 && (
            <div className="animate-fadeIn">
              <ContactStep
                customerInfo={bookingState.customerInfo}
                onCustomerInfoChange={handleCustomerInfoChange}
                error={error}
              />
            </div>
          )}

          {/* Booking Summary Card */}
          <div className="mt-12 rounded-2xl border-2 border-amber-200 bg-white p-8">
            <h3 className="text-xl font-bold text-amber-900 mb-6">Booking Summary</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <p className="text-sm text-amber-600 font-semibold mb-2">Selected Date</p>
                <p className="text-lg font-bold text-amber-900">
                  {bookingState.selectedDate
                    ? new Date(bookingState.selectedDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit'
                      })
                    : 'Not selected'}
                </p>
              </div>

              <div>
                <p className="text-sm text-amber-600 font-semibold mb-2">Selected Service</p>
                <p className="text-lg font-bold text-amber-900">
                  {bookingState.selectedService?.name || 'Not selected'}
                </p>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-100 border-2 border-red-300 rounded-lg">
                <p className="text-red-700 font-semibold">{error}</p>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handlePreviousStep}
                disabled={currentStep === 0}
                className="flex items-center gap-2 px-6 py-3 border-2 border-amber-300 text-amber-900 rounded-lg hover:border-amber-400 hover:bg-amber-50 disabled:opacity-50 disabled:cursor-not-allowed transition font-bold"
              >
                <ChevronLeft size={20} />
                Previous
              </button>

              {currentStep < 3 ? (
                <button
                  onClick={handleNextStep}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-linear-to-r from-amber-600 to-yellow-600 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition font-bold"
                >
                  Next
                  <ChevronRight size={20} />
                </button>
              ) : (
                <button
                  onClick={handleCompleteBooking}
                  className="flex-1 px-6 py-3 bg-linear-to-r from-green-600 to-amber-600 text-white rounded-lg hover:shadow-lg hover:shadow-green-500/30 transition font-bold text-lg"
                >
                  ✓ Complete Booking
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
