/**
 * Booking Details Step
 * - Display service details
 * - Guest count selection
 * - Event hours selection
 * - Requirements display
 */

import { useState } from 'react';
import { GuestCountInput } from '../inputs/GuestCountInput';
import { EventHoursInput } from '../inputs/EventHoursInput';
import type { Service } from '../../types/index';

interface BookingDetailsStepProps {
  service: Service;
  onNext?: () => void;
  error?: string;
}

export function BookingDetailsStep({
  service,
  onNext,
  error
}: BookingDetailsStepProps) {
  const [guestCount, setGuestCount] = useState(1);
  const [eventHours, setEventHours] = useState(1);

  // Safely extract minGuests from service
  const minGuests = (() => {
    const value = service.minGuests;
    if (typeof value === 'number') return value;
    if (typeof value === 'string') {
      const parsed = parseInt(value, 10);
      return isNaN(parsed) ? 1 : parsed;
    }
    return 1;
  })();

  // Safely extract minHours from service
  const minHours = (() => {
    const value = service.minHours;
    if (typeof value === 'number') return value;
    if (typeof value === 'string') {
      const parsed = parseInt(value, 10);
      return isNaN(parsed) ? 1 : parsed;
    }
    return 1;
  })();

  // Safely extract maxGuests from service
  const maxGuests = (() => {
    const value = service.maxGuests;
    if (typeof value === 'number') return value;
    if (typeof value === 'string') {
      const parsed = parseInt(value, 10);
      return isNaN(parsed) ? 10 : parsed;
    }
    return 10;
  })();

  const handleGuestCountChange = (count: number): void => {
    setGuestCount(count);
  };

  const handleEventHoursChange = (hours: number): void => {
    setEventHours(hours);
  };

  const handleNext = (): void => {
    onNext?.();
  };

  // Safely extract service name
  const serviceName = typeof service.name === 'string' ? service.name : 'Service';

  // Safely extract service description
  const serviceDescription = typeof service.description === 'string' 
    ? service.description 
    : 'No description available';

  // Safely extract service duration
  const serviceDuration = (() => {
    const value = service.duration;
    if (typeof value === 'number') return value;
    if (typeof value === 'string') {
      const parsed = parseInt(value, 10);
      return isNaN(parsed) ? null : parsed;
    }
    return null;
  })();

  return (
    <div className="space-y-6">
      <div className="glass rounded-2xl border border-slate-700/50 p-8">
        <h3 className="mb-2 text-lg font-bold text-white">Booking Details</h3>
        <p className="mb-6 text-slate-400">Configure your event details</p>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* Service Summary */}
        <div className="mb-8 rounded-lg border border-slate-600/50 bg-slate-700/20 p-4">
          <h4 className="mb-2 font-semibold text-white">{String(serviceName)}</h4>
          <p className="text-sm text-slate-400">{String(serviceDescription)}</p>
          {serviceDuration && (
            <p className="mt-2 text-xs text-slate-500">
              Standard Duration: {serviceDuration} minutes
            </p>
          )}
        </div>

        {/* Guest Count Input */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-semibold text-white">
            Number of Guests
          </label>
          <GuestCountInput
            minGuests={minGuests}
            value={guestCount}
            onChange={handleGuestCountChange}
          />
          <p className="mt-2 text-xs text-slate-400">
            Minimum: {minGuests} guest{minGuests !== 1 ? 's' : ''} | Maximum: {maxGuests} guests
          </p>
        </div>

        {/* Event Hours Input */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-semibold text-white">
            Event Duration (hours)
          </label>
          <EventHoursInput
            minHours={minHours}
            value={eventHours}
            onChange={handleEventHoursChange}
          />
          <p className="mt-2 text-xs text-slate-400">
            Minimum: {minHours} hour{minHours !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Requirements */}
        <div className="rounded-lg border border-slate-600/50 bg-slate-700/10 p-4">
          <h4 className="mb-3 font-semibold text-white">Requirements</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-cyan-400"></div>
              Minimum {minGuests} guest{minGuests !== 1 ? 's' : ''}
            </li>
            <li className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-cyan-400"></div>
              Minimum {minHours} hour{minHours !== 1 ? 's' : ''} booking
            </li>
            <li className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-cyan-400"></div>
              Maximum {maxGuests} guests
            </li>
          </ul>
        </div>

        {/* Summary */}
        <div className="mt-8 rounded-lg bg-linear-to-r from-cyan-500/10 to-blue-600/10 border border-cyan-500/30 p-4">
          <p className="text-sm text-slate-400">
            You have selected: <span className="font-semibold text-white">{guestCount} guests</span> for{' '}
            <span className="font-semibold text-white">{eventHours} hour{eventHours !== 1 ? 's' : ''}</span>
          </p>
        </div>
      </div>

      {/* Next Button */}
      <button
        onClick={handleNext}
        className="w-full rounded-lg bg-linear-to-r from-cyan-500 to-blue-600 px-6 py-3 font-semibold text-white transition hover:shadow-lg hover:shadow-cyan-500/50"
      >
        Continue to Next Step
      </button>
    </div>
  );
}