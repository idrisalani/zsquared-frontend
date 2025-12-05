/**
 * Contact Form Component
 * - Collect customer contact information
 * - Address details
 * - Additional notes
 * - Form validation
 */

import type { CustomerInfo } from '../../types';

interface ContactFormProps {
  customerInfo: CustomerInfo;
  onFieldChange: (field: string, value: string) => void;
  error?: string;
}

export function ContactForm({
  customerInfo,
  onFieldChange,
  error
}: ContactFormProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    onFieldChange(name, value);
  };

  return (
    <div className="space-y-6">
      <div className="glass rounded-2xl border border-slate-700/50 p-8">
        <h3 className="mb-2 text-lg font-bold text-white">Contact Information</h3>
        <p className="mb-6 text-slate-400">Please provide your details</p>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* Name Fields Row */}
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* First Name */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-white">
              First Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="firstName"
              value={customerInfo.firstName}
              onChange={handleInputChange}
              placeholder="John"
              required
              className="w-full rounded-lg border border-slate-600/50 bg-slate-700/30 px-4 py-2 text-white placeholder-slate-500 transition focus:border-cyan-500/50 focus:bg-slate-700/50 focus:outline-none"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-white">
              Last Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="lastName"
              value={customerInfo.lastName}
              onChange={handleInputChange}
              placeholder="Doe"
              required
              className="w-full rounded-lg border border-slate-600/50 bg-slate-700/30 px-4 py-2 text-white placeholder-slate-500 transition focus:border-cyan-500/50 focus:bg-slate-700/50 focus:outline-none"
            />
          </div>
        </div>

        {/* Email and Phone Row */}
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-white">
              Email Address <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={customerInfo.email}
              onChange={handleInputChange}
              placeholder="john@example.com"
              required
              className="w-full rounded-lg border border-slate-600/50 bg-slate-700/30 px-4 py-2 text-white placeholder-slate-500 transition focus:border-cyan-500/50 focus:bg-slate-700/50 focus:outline-none"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-white">
              Phone Number <span className="text-red-400">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={customerInfo.phone}
              onChange={handleInputChange}
              placeholder="+1 (555) 123-4567"
              required
              className="w-full rounded-lg border border-slate-600/50 bg-slate-700/30 px-4 py-2 text-white placeholder-slate-500 transition focus:border-cyan-500/50 focus:bg-slate-700/50 focus:outline-none"
            />
          </div>
        </div>

        {/* Address Section */}
        <div className="mb-6 rounded-lg border border-slate-600/50 bg-slate-700/10 p-4">
          <h4 className="mb-4 font-semibold text-white">Address (Optional)</h4>

          {/* Street Address */}
          <div className="mb-4">
            <label className="mb-2 block text-sm font-semibold text-white">
              Street Address
            </label>
            <input
              type="text"
              name="streetAddress"
              value={customerInfo.streetAddress || ''}
              onChange={handleInputChange}
              placeholder="123 Main Street"
              className="w-full rounded-lg border border-slate-600/50 bg-slate-700/30 px-4 py-2 text-white placeholder-slate-500 transition focus:border-cyan-500/50 focus:bg-slate-700/50 focus:outline-none"
            />
          </div>

          {/* City and Postal Code Row */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* City */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-white">
                City
              </label>
              <input
                type="text"
                name="city"
                value={customerInfo.city || ''}
                onChange={handleInputChange}
                placeholder="New York"
                className="w-full rounded-lg border border-slate-600/50 bg-slate-700/30 px-4 py-2 text-white placeholder-slate-500 transition focus:border-cyan-500/50 focus:bg-slate-700/50 focus:outline-none"
              />
            </div>

            {/* Postal Code */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-white">
                Postal Code
              </label>
              <input
                type="text"
                name="postalCode"
                value={customerInfo.postalCode || ''}
                onChange={handleInputChange}
                placeholder="10001"
                className="w-full rounded-lg border border-slate-600/50 bg-slate-700/30 px-4 py-2 text-white placeholder-slate-500 transition focus:border-cyan-500/50 focus:bg-slate-700/50 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Additional Notes */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-white">
            Additional Notes (Optional)
          </label>
          <textarea
            name="additionalNotes"
            value={customerInfo.additionalNotes || ''}
            onChange={handleInputChange}
            placeholder="Any special requests or additional information about your event..."
            rows={4}
            className="w-full rounded-lg border border-slate-600/50 bg-slate-700/30 px-4 py-2 text-white placeholder-slate-500 transition focus:border-cyan-500/50 focus:bg-slate-700/50 focus:outline-none"
          />
        </div>

        {/* Info Message */}
        <div className="mt-6 rounded-lg bg-blue-500/10 border border-blue-500/50 p-4">
          <p className="text-blue-400 text-sm">
            ℹ️ Fields marked with <span className="text-red-400">*</span> are required
          </p>
        </div>
      </div>
    </div>
  );
}