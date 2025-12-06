import { CheckCircle, Calendar, Users, Clock, ShoppingCart } from 'lucide-react';
import type { Service } from '../../types';

interface BookingSummaryProps {
  selectedService: Service | null;
  selectedDate: string | null;
  guestCount: number;
  eventHours: number;
  selectedOptions: Record<string, string | number>;
}

export function BookingSummary({
  selectedService,
  selectedDate,
  guestCount,
  eventHours,
  selectedOptions,
}: BookingSummaryProps) {
  if (!selectedService || !selectedDate) {
    return null;
  }

  // EXPLICIT: Convert any value to a number (never returns string or number | string)
  const toNumber = (value: string | number | undefined): number => {
    // If it's already a number, return it
    if (typeof value === 'number' && !isNaN(value)) {
      return value;
    }
    // If it's a string, try to parse it
    if (typeof value === 'string') {
      const parsed = parseFloat(value);
      return isNaN(parsed) ? 0 : parsed;
    }
    // Fallback for undefined
    return 0;
  };

  // EXPLICIT: basePrice is guaranteed to be a number (never string | number)
  const basePrice: number = toNumber(selectedService.basePrice);
  
  // EXPLICIT: hoursAsNumber is guaranteed to be a number (never string | number)
  const hoursAsNumber: number = toNumber(eventHours);
  
  // EXPLICIT: Calculate additional hours - both operands are definitely numbers
  const hourlyAdditional: number = hoursAsNumber > 2 ? (hoursAsNumber - 2) * 50 : 0;
  
  // EXPLICIT: Calculate options total - convert each value to number before adding
  const optionsTotal: number = Object.values(selectedOptions).reduce((sum: number, val: string | number) => {
    const price: number = toNumber(val);
    return sum + price;
  }, 0);
  
  // EXPLICIT: Calculate total price - both are definitely numbers
  const totalPrice: number = basePrice + hourlyAdditional + optionsTotal;

  return (
    <div className="rounded-2xl border-2 border-blue-200 bg-linear-to-br from-blue-50 to-purple-50 p-6">
      <div className="mb-4 flex items-center gap-2">
        <CheckCircle size={24} className="text-green-600" />
        <h3 className="text-lg font-bold text-gray-900">Booking Summary</h3>
      </div>

      <div className="space-y-3">
        {/* Service */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingCart size={18} className="text-blue-600" />
            <span className="text-gray-700">Service:</span>
          </div>
          <span className="font-semibold text-gray-900">{selectedService.name}</span>
        </div>

        {/* Date */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar size={18} className="text-blue-600" />
            <span className="text-gray-700">Date:</span>
          </div>
          <span className="font-semibold text-gray-900">
            {new Date(selectedDate).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
        </div>

        {/* Guests */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users size={18} className="text-blue-600" />
            <span className="text-gray-700">Guests:</span>
          </div>
          <span className="font-semibold text-gray-900">{guestCount}</span>
        </div>

        {/* Hours */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock size={18} className="text-blue-600" />
            <span className="text-gray-700">Duration:</span>
          </div>
          <span className="font-semibold text-gray-900">{hoursAsNumber} hours</span>
        </div>

        <div className="my-3 border-t-2 border-blue-200" />

        {/* Price Breakdown */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Base price:</span>
            <span className="text-gray-900">${basePrice.toFixed(2)}</span>
          </div>
          {hourlyAdditional > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-600">Additional hours:</span>
              <span className="text-gray-900">${hourlyAdditional.toFixed(2)}</span>
            </div>
          )}
          {optionsTotal > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-600">Options:</span>
              <span className="text-gray-900">${optionsTotal.toFixed(2)}</span>
            </div>
          )}
        </div>

        <div className="my-3 border-t-2 border-blue-300" />

        {/* Total */}
        <div className="flex justify-between">
          <span className="text-lg font-bold text-gray-900">Total:</span>
          <span className="text-2xl font-bold text-transparent bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text">
            ${totalPrice.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}