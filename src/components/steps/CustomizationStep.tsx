/**
 * Customization Step Component - COMPLETE
 * - Shows selected service details
 * - Guest count selection with validation
 * - Add hours functionality with pricing
 * - Service-specific add-on options
 * - Real-time price calculation
 * - Modern UI/UX design
 */

import { useState, useMemo } from 'react';
import { ChevronUp, ChevronDown, Users, Clock, Zap } from 'lucide-react';

// ✅ Local type definition (no need for ../types import)
interface Service {
  id: string;
  name?: string;
  description?: string;
  basePrice?: number;
  minGuests?: number;
  maxGuests?: number;
  duration?: number;
  image?: string;
}

interface CustomizationStepProps {
  service: Service | null;
  selectedOptions: Record<string, unknown>;
  onSelectOptions: (options: Record<string, unknown>, price: number) => void;
  error?: string;
}

// Add-ons for Photo Booth
const PHOTO_BOOTH_ADDONS = [
  { id: 'addon-pb-1', name: 'Custom Backdrop', description: 'Branded or themed backdrop', price: 100, icon: '🖼️' },
  { id: 'addon-pb-2', name: 'Premium Prints', description: 'Gold foil prints included', price: 75, icon: '✨' },
  { id: 'addon-pb-3', name: 'Extra Hours', description: 'Add 1 additional hour', price: 60, icon: '⏱️' },
];

// Add-ons for VR
const VR_ADDONS = [
  { id: 'addon-vr-1', name: 'Premium Headsets', description: 'Latest VR technology', price: 50, icon: '🎮' },
  { id: 'addon-vr-2', name: 'Group Session', description: 'Guided group experience', price: 75, icon: '👥' },
  { id: 'addon-vr-3', name: 'Extended Play', description: 'Extra 30 mins gameplay', price: 100, icon: '⏰' },
];

// Add-ons for Bouncy House
const BOUNCY_ADDONS = [
  { id: 'addon-bh-1', name: 'Extra Setup', description: 'Premium setup service', price: 45, icon: '🏗️' },
  { id: 'addon-bh-2', name: 'Safety Mats', description: 'Professional safety padding', price: 60, icon: '🛡️' },
  { id: 'addon-bh-3', name: 'Extended Time', description: 'Add 1 hour playtime', price: 50, icon: '⏱️' },
];

// Add-ons for Cotton Candy
const COTTON_CANDY_ADDONS = [
  { id: 'addon-cc-1', name: 'Premium Flavors', description: 'Specialty flavors included', price: 40, icon: '🌈' },
  { id: 'addon-cc-2', name: 'Custom Colors', description: 'Custom color combinations', price: 35, icon: '🎨' },
  { id: 'addon-cc-3', name: 'Extra Machine', description: 'Additional machine included', price: 80, icon: '🍭' },
];

// Add-ons for Waffle Station
const WAFFLE_ADDONS = [
  { id: 'addon-wf-1', name: 'Premium Toppings', description: 'Nutella, berries, chocolate', price: 60, icon: '🍫' },
  { id: 'addon-wf-2', name: 'Staff Attendant', description: 'Professional waffle chef', price: 80, icon: '👨‍🍳' },
  { id: 'addon-wf-3', name: 'Extra Hour', description: 'Add 1 additional hour', price: 45, icon: '⏱️' },
];

const ADDONS_BY_SERVICE: Record<string, Array<{ id: string; name: string; description: string; price: number; icon: string }>> = {
  '1': VR_ADDONS,
  '2': BOUNCY_ADDONS,
  '3': COTTON_CANDY_ADDONS,
  '4': WAFFLE_ADDONS,
  '5': PHOTO_BOOTH_ADDONS,
};

export function CustomizationStep({
  service,
  selectedOptions,
  onSelectOptions,
  error
}: CustomizationStepProps) {
  const [guestCount, setGuestCount] = useState(
    (selectedOptions?.guestCount as number) || 1
  );
  const [additionalHours, setAdditionalHours] = useState(
    (selectedOptions?.additionalHours as number) || 0
  );
  const [selectedAddOns, setSelectedAddOns] = useState<Set<string>>(
    new Set(
      Array.isArray(selectedOptions?.selectedAddOns)
        ? selectedOptions.selectedAddOns
        : []
    )
  );

  // Extract service ID to a variable for useMemo dependency
  const serviceId = service?.id || null;

  // Get available add-ons for this service
  const availableAddOns = useMemo(() => {
    if (!serviceId) return [];
    return ADDONS_BY_SERVICE[serviceId] || [];
  }, [serviceId]);

  // Get guest count limits
  const minGuests = service?.minGuests ? Number(service.minGuests) : 1;
  const maxGuests = service?.maxGuests ? Number(service.maxGuests) : 100;

  // Calculate total price
  const basePrice = service?.basePrice || 0;
  const hoursPrice = additionalHours * 50;
  
  // Get add-on details for selected add-ons ✅ FIXED
  const selectedAddOnsDetails = Array.from(selectedAddOns)
    .map(addonId => {
      const addon = availableAddOns.find(a => a.id === addonId);
      return addon ? { id: addon.id, name: addon.name, price: addon.price } : null;
    })
    .filter((addon): addon is { id: string; name: string; price: number } => addon !== null);

  const addOnsPrice = selectedAddOnsDetails.reduce((sum, addon) => sum + addon.price, 0);
  const totalPrice = basePrice + hoursPrice + addOnsPrice;

  // Handle guest count change
  const handleGuestCountChange = (change: number): void => {
    const newCount = Math.max(minGuests, Math.min(maxGuests, guestCount + change));
    setGuestCount(newCount);

    const newOptions: Record<string, unknown> = {
      guestCount: newCount,
      additionalHours,
      selectedAddOns: Array.from(selectedAddOns),
      addOnsDetails: selectedAddOnsDetails  // ✅ PASS ADDONS DETAILS
    };
    onSelectOptions(newOptions, totalPrice);
  };

  // Handle hours change
  const handleHoursChange = (change: number): void => {
    const newHours = Math.max(0, additionalHours + change);
    setAdditionalHours(newHours);

    const newOptions: Record<string, unknown> = {
      guestCount,
      additionalHours: newHours,
      selectedAddOns: Array.from(selectedAddOns),
      addOnsDetails: selectedAddOnsDetails  // ✅ PASS ADDONS DETAILS
    };
    const newPrice = basePrice + (newHours * 50) + addOnsPrice;
    onSelectOptions(newOptions, newPrice);
  };

  // Handle add-on toggle
  const handleAddOnToggle = (addonId: string): void => {
    const newSelectedAddOns = new Set(selectedAddOns);
    if (newSelectedAddOns.has(addonId)) {
      newSelectedAddOns.delete(addonId);
    } else {
      newSelectedAddOns.add(addonId);
    }
    setSelectedAddOns(newSelectedAddOns);

    // Recalculate add-ons details with updated selection
    const updatedAddOnsDetails = Array.from(newSelectedAddOns)
      .map(id => {
        const addon = availableAddOns.find(a => a.id === id);
        return addon ? { id: addon.id, name: addon.name, price: addon.price } : null;
      })
      .filter((addon): addon is { id: string; name: string; price: number } => addon !== null);

    const updatedAddOnsPrice = updatedAddOnsDetails.reduce((sum, addon) => sum + addon.price, 0);
    const newPrice = basePrice + (additionalHours * 50) + updatedAddOnsPrice;

    const newOptions: Record<string, unknown> = {
      guestCount,
      additionalHours,
      selectedAddOns: Array.from(newSelectedAddOns),
      addOnsDetails: updatedAddOnsDetails  // ✅ PASS ADDONS DETAILS
    };
    onSelectOptions(newOptions, newPrice);
  };

  return (
    <div className="space-y-6">
      {/* Service Summary Card */}
      <div className="rounded-2xl border-2 border-amber-200 bg-linear-to-r from-amber-50 to-yellow-50 p-8">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-amber-600 font-semibold mb-1">Currently Selected</p>
            <h3 className="text-2xl font-bold text-amber-900 mb-2">{service?.name}</h3>
            <p className="text-amber-600">{service?.description}</p>
          </div>
          <div className="text-4xl">{service?.image}</div>
        </div>
      </div>

      {/* Guest Count Card */}
      <div className="rounded-2xl border-2 border-amber-200 bg-white p-8">
        <div className="flex items-center gap-3 mb-6">
          <Users size={24} className="text-amber-600" />
          <h3 className="text-xl font-bold text-amber-900">Number of Guests</h3>
        </div>

        <p className="text-amber-600 mb-6">How many guests will be attending your event?</p>

        <div className="flex items-center justify-center gap-8 mb-6">
          <button
            onClick={() => handleGuestCountChange(-1)}
            disabled={guestCount <= minGuests}
            className="p-3 rounded-lg border-2 border-amber-300 hover:border-amber-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            <ChevronDown size={24} className="text-amber-600" />
          </button>

          <div className="text-center">
            <p className="text-5xl font-bold text-amber-600">{guestCount}</p>
            <p className="text-amber-600 mt-2">guests</p>
          </div>

          <button
            onClick={() => handleGuestCountChange(1)}
            disabled={guestCount >= maxGuests}
            className="p-3 rounded-lg border-2 border-amber-300 hover:border-amber-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            <ChevronUp size={24} className="text-amber-600" />
          </button>
        </div>

        <div className="p-4 bg-amber-100 border-2 border-amber-300 rounded-lg">
          <p className="text-amber-900 font-semibold">
            Valid range: {minGuests} - {maxGuests} guests
          </p>
        </div>
      </div>

      {/* Extend Duration Card */}
      <div className="rounded-2xl border-2 border-amber-200 bg-white p-8">
        <div className="flex items-center gap-3 mb-6">
          <Clock size={24} className="text-amber-600" />
          <h3 className="text-xl font-bold text-amber-900">Extend Duration</h3>
        </div>

        <p className="text-amber-600 mb-6">Add additional hours to your booking ($50/hour)</p>

        <div className="flex items-center justify-center gap-8 mb-6">
          <button
            onClick={() => handleHoursChange(-1)}
            disabled={additionalHours <= 0}
            className="p-3 rounded-lg border-2 border-amber-300 hover:border-amber-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            <ChevronDown size={24} className="text-amber-600" />
          </button>

          <div className="text-center">
            <p className="text-5xl font-bold text-amber-600">{additionalHours}</p>
            <p className="text-amber-600 mt-2">additional hours</p>
          </div>

          <button
            onClick={() => handleHoursChange(1)}
            className="p-3 rounded-lg border-2 border-amber-300 hover:border-blue-500 transition"
          >
            <ChevronUp size={24} className="text-amber-600" />
          </button>
        </div>

        {additionalHours > 0 && (
          <div className="p-4 bg-blue-100 border-2 border-amber-300 rounded-lg">
            <p className="text-amber-900 font-semibold">
              Additional hours cost: ${(additionalHours * 50).toFixed(2)}
            </p>
          </div>
        )}
      </div>

      {/* Add-Ons Card */}
      <div className="rounded-2xl border-2 border-amber-200 bg-white p-8">
        <div className="flex items-center gap-3 mb-6">
          <Zap size={24} className="text-amber-600" />
          <h3 className="text-xl font-bold text-amber-900">Add-On Options</h3>
        </div>

        <p className="text-amber-600 mb-6">Enhance your booking with premium options</p>

        <div className="space-y-3">
          {availableAddOns.map(addon => (
            <div
              key={addon.id}
              className={`
                p-4 rounded-lg border-2 transition cursor-pointer
                ${selectedAddOns.has(addon.id)
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 bg-white hover:border-blue-300'
                }
              `}
              onClick={() => handleAddOnToggle(addon.id)}
            >
              <div className="flex items-start gap-4">
                <input
                  type="checkbox"
                  checked={selectedAddOns.has(addon.id)}
                  onChange={() => handleAddOnToggle(addon.id)}
                  className="mt-1"
                  onClick={e => e.stopPropagation()}
                />
                <div className="text-2xl">{addon.icon}</div>
                <div className="flex-1">
                  <h4 className="font-bold text-amber-900">{addon.name}</h4>
                  <p className="text-sm text-amber-600">{addon.description}</p>
                </div>
                <p className="text-green-600 font-bold text-lg">+${addon.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Price Summary Card */}
      <div className="rounded-2xl border-2 border-green-300 bg-green-50 p-8">
        <h3 className="text-xl font-bold text-amber-900 mb-6">Price Summary</h3>

        <div className="space-y-3 mb-6">
          <div className="flex justify-between items-center pb-3 border-b-2 border-green-200">
            <p className="text-amber-700">Base service</p>
            <p className="font-semibold text-amber-900">${basePrice.toFixed(2)}</p>
          </div>

          {additionalHours > 0 && (
            <div className="flex justify-between items-center pb-3 border-b-2 border-green-200">
              <p className="text-amber-700">{additionalHours}h additional @ $50/hr</p>
              <p className="font-semibold text-amber-900">${hoursPrice.toFixed(2)}</p>
            </div>
          )}

          {selectedAddOnsDetails.length > 0 && (
            <>
              {selectedAddOnsDetails.map(addon => (
                <div key={addon.id} className="flex justify-between items-center pb-3 border-b-2 border-green-200">
                  <p className="text-amber-700">{addon.name}</p>
                  <p className="font-semibold text-amber-900">+${addon.price.toFixed(2)}</p>
                </div>
              ))}
            </>
          )}

          <div className="flex justify-between items-center pt-3">
            <p className="text-lg font-bold text-amber-900">Total Price</p>
            <p className="text-3xl font-bold bg-linear-to-r from-green-600 to-amber-600 bg-clip-text text-transparent">
              ${totalPrice.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-100 border-2 border-red-300 rounded-lg">
          <p className="text-red-700 font-semibold">{error}</p>
        </div>
      )}
    </div>
  );
}
