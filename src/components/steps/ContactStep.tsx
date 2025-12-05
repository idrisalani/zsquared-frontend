/**
 * Contact Step Component - IMPROVED
 * - Modern form design
 * - Clear field organization
 * - Better input styling
 * - Booking summary
 * - Form validation feedback
 */

import { User, Mail, Phone, MapPin, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import type { CustomerInfo } from '../../types';

interface ContactStepProps {
  customerInfo: CustomerInfo;
  onCustomerInfoChange: (field: string, value: string) => void;
  error?: string;
}

export function ContactStep({
  customerInfo,
  onCustomerInfoChange,
  error
}: ContactStepProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onCustomerInfoChange(name, value);
  };

  const isFieldComplete = (field: string): boolean => {
    const value = customerInfo[field as keyof CustomerInfo];
    if (!value) return false;
    
    // Validate email
    if (field === 'email') {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }
    
    // Validate phone
    if (field === 'phone') {
      return /^[\d\s+\-()]+$/.test(value) && value.length >= 10;
    }
    
    return value.length > 0;
  };

  const requiredFields = ['firstName', 'lastName', 'email', 'phone'];
  const allRequiredFieldsComplete = requiredFields.every(field => isFieldComplete(field));

  return (
    <div className="w-full space-y-6">
      {/* Header Card */}
      <div className="rounded-2xl border-2 border-gray-200 bg-white p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Your Contact Information</h3>
        <p className="text-gray-600">We need these details to confirm your booking</p>

        {/* Error Message */}
        {error && (
          <div className="mt-6 p-4 bg-red-100 border-2 border-red-300 rounded-xl flex items-start gap-3">
            <AlertCircle size={20} className="text-red-600 shrink-0 mt-0.5" />
            <p className="text-red-700 font-semibold">{error}</p>
          </div>
        )}
      </div>

      {/* Contact Form */}
      <div className="rounded-2xl border-2 border-gray-200 bg-white p-8 space-y-6">
        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              First Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <User size={18} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                name="firstName"
                value={customerInfo.firstName}
                onChange={handleChange}
                placeholder="John"
                className={`
                  w-full pl-10 pr-4 py-3 rounded-lg border-2 bg-white text-gray-900 placeholder-gray-500 transition
                  ${isFieldComplete('firstName')
                    ? 'border-green-300 focus:border-green-500'
                    : 'border-gray-300 focus:border-blue-500'
                  } focus:outline-none
                `}
              />
              {isFieldComplete('firstName') && (
                <CheckCircle size={18} className="absolute right-3 top-3 text-green-500" />
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Last Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <User size={18} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                name="lastName"
                value={customerInfo.lastName}
                onChange={handleChange}
                placeholder="Doe"
                className={`
                  w-full pl-10 pr-4 py-3 rounded-lg border-2 bg-white text-gray-900 placeholder-gray-500 transition
                  ${isFieldComplete('lastName')
                    ? 'border-green-300 focus:border-green-500'
                    : 'border-gray-300 focus:border-blue-500'
                  } focus:outline-none
                `}
              />
              {isFieldComplete('lastName') && (
                <CheckCircle size={18} className="absolute right-3 top-3 text-green-500" />
              )}
            </div>
          </div>
        </div>

        {/* Contact Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Email Address <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Mail size={18} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="email"
                name="email"
                value={customerInfo.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={`
                  w-full pl-10 pr-4 py-3 rounded-lg border-2 bg-white text-gray-900 placeholder-gray-500 transition
                  ${isFieldComplete('email')
                    ? 'border-green-300 focus:border-green-500'
                    : 'border-gray-300 focus:border-blue-500'
                  } focus:outline-none
                `}
              />
              {isFieldComplete('email') && (
                <CheckCircle size={18} className="absolute right-3 top-3 text-green-500" />
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Phone size={18} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="tel"
                name="phone"
                value={customerInfo.phone}
                onChange={handleChange}
                placeholder="+1 (555) 123-4567"
                className={`
                  w-full pl-10 pr-4 py-3 rounded-lg border-2 bg-white text-gray-900 placeholder-gray-500 transition
                  ${isFieldComplete('phone')
                    ? 'border-green-300 focus:border-green-500'
                    : 'border-gray-300 focus:border-blue-500'
                  } focus:outline-none
                `}
              />
              {isFieldComplete('phone') && (
                <CheckCircle size={18} className="absolute right-3 top-3 text-green-500" />
              )}
            </div>
          </div>
        </div>

        {/* Address Fields */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Street Address <span className="text-gray-500">(Optional)</span>
          </label>
          <div className="relative">
            <MapPin size={18} className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              name="streetAddress"
              value={customerInfo.streetAddress || ''}
              onChange={handleChange}
              placeholder="123 Main Street"
              className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none transition"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              City <span className="text-gray-500">(Optional)</span>
            </label>
            <input
              type="text"
              name="city"
              value={customerInfo.city || ''}
              onChange={handleChange}
              placeholder="New York"
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Postal Code <span className="text-gray-500">(Optional)</span>
            </label>
            <input
              type="text"
              name="postalCode"
              value={customerInfo.postalCode || ''}
              onChange={handleChange}
              placeholder="10001"
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none transition"
            />
          </div>
        </div>

        {/* Additional Notes */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Special Requests <span className="text-gray-500">(Optional)</span>
          </label>
          <div className="relative">
            <FileText size={18} className="absolute left-3 top-3 text-gray-400" />
            <textarea
              name="additionalNotes"
              value={customerInfo.additionalNotes || ''}
              onChange={handleChange}
              placeholder="Any special requests or notes for the vendor..."
              rows={4}
              className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none transition resize-none"
            />
          </div>
        </div>

        {/* Completion Status */}
        <div className={`
          p-4 rounded-lg border-2 transition
          ${allRequiredFieldsComplete
            ? 'bg-green-50 border-green-300'
            : 'bg-yellow-50 border-yellow-300'
          }
        `}>
          <p className={`flex items-center gap-2 font-semibold ${
            allRequiredFieldsComplete ? 'text-green-900' : 'text-yellow-900'
          }`}>
            {allRequiredFieldsComplete ? (
              <>
                <CheckCircle size={18} />
                All required information provided
              </>
            ) : (
              <>
                <AlertCircle size={18} />
                Please fill in all required fields (*)
              </>
            )}
          </p>
        </div>
      </div>

      {/* Required Fields Indicator */}
      <div className="rounded-2xl border-2 border-gray-200 bg-gray-50 p-6">
        <p className="text-sm text-gray-600">
          <span className="font-semibold">*</span> Required fields
        </p>
      </div>
    </div>
  );
}