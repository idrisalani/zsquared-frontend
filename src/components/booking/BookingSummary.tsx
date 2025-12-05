/**
 * Booking Summary Component
 * - Sticky sidebar
 * - Shows selected date, service, options
 * - Price breakdown
 * - Real-time updates
 */

import React from 'react';
import { Calendar, Users, Clock, DollarSign } from 'lucide-react';
import { Service } from '../../types';

interface BookingSummaryProps {
  selectedDate: string | null;
  selectedService: Service | null;
  guestCount: number;
  eventHours: number;
  pricing: {
    baseServicePrice: number;
    addOnsTotal: number;
    taxAmount: number;
    totalPrice: number;
  };
}

export function BookingSummary({
  selectedDate,
  selectedService,
  guestCount,
  eventHours,
  pricing
}: BookingSummaryProps) {
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="sticky top-8 bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6 space-y-6">
      <h3 className="text-lg font-bold text-white">Booking Summary</h3>

      {/* Date */}
      {selectedDate && (
        <div className="flex gap-3">
          <Calendar size={18} className="text-cyan-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-slate-400 text-xs uppercase">Date</p>
            <p className="text-white font-semibold">
              {new Date(selectedDate).toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric'
              })}
            </p>
          </div>
        </div>
      )}

      {/* Service */}
      {selectedService && (
        <div className="flex gap-3">
          <span className="text-2xl">{selectedService.icon || '🎉'}</span>
          <div className="flex-1">
            <p className="text-slate-400 text-xs uppercase">Service</p>
            <p className="text-white font-semibold">{selectedService.name}</p>
          </div>
        </div>
      )}

      {/* Details */}
      <div className="space-y-2 pt-4 border-t border-slate-700/50">
        <div className="flex gap-3 text-sm">
          <Users size={16} className="text-cyan-400 flex-shrink-0 mt-0.5" />
          <span className="text-slate-300">{guestCount} guests</span>
        </div>
        <div className="flex gap-3 text-sm">
          <Clock size={16} className="text-cyan-400 flex-shrink-0 mt-0.5" />
          <span className="text-slate-300">{eventHours} hours</span>
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="space-y-3 pt-4 border-t border-slate-700/50">
        <div className="flex justify-between text-sm">
          <span className="text-slate-400">Service</span>
          <span className="text-white font-semibold">{formatPrice(pricing.baseServicePrice)}</span>
        </div>

        {pricing.addOnsTotal > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Add-ons</span>
            <span className="text-white font-semibold">+{formatPrice(pricing.addOnsTotal)}</span>
          </div>
        )}

        <div className="flex justify-between text-sm">
          <span className="text-slate-400">Tax</span>
          <span className="text-white font-semibold">{formatPrice(pricing.taxAmount)}</span>
        </div>

        <div className="flex justify-between pt-3 border-t border-slate-700/50">
          <span className="text-white font-bold">Total</span>
          <span className="text-lg font-bold text-cyan-400">{formatPrice(pricing.totalPrice)}</span>
        </div>
      </div>

      {/* Booking info */}
      <div className="p-4 bg-cyan-500/10 border border-cyan-500/50 rounded-lg text-xs text-cyan-400">
        <p>✓ Secure booking</p>
        <p>✓ Free cancellation up to 48 hours</p>
        <p>✓ Instant confirmation</p>
      </div>
    </div>
  );
}