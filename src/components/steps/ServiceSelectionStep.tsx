/**
 * Service Selection Step Component - FIXED
 * - Modern UI/UX design
 * - Service cards with better styling
 * - Price display
 * - Selection state management
 */

import { Zap, Clock, Users } from 'lucide-react';
import type { Service } from '../../types/index';

interface ServiceSelectionStepProps {
  selectedServiceId: string | null;
  onSelectService: (service: Service) => void;
  error?: string;
}

const MOCK_SERVICES: Service[] = [
  {
    id: '1',
    name: '360° VR Experience',
    description: 'Immersive virtual reality experiences for all ages',
    basePrice: 150,
    category: 'entertainment',
    duration: 120,
    minGuests: 2,
    minHours: 2,
    maxGuests: 20,
    image: '🎮'
  },
  {
    id: '2',
    name: 'Bouncy House',
    description: 'Fun bouncy castle for kids parties and events',
    basePrice: 100,
    category: 'entertainment',
    duration: 240,
    minGuests: 5,
    minHours: 4,
    maxGuests: 50,
    image: '🏠'
  },
  {
    id: '3',
    name: 'Cotton Candy Machine',
    description: 'Sweet cotton candy machine with unlimited servings',
    basePrice: 75,
    category: 'catering',
    duration: 180,
    minGuests: 10,
    minHours: 3,
    maxGuests: 100,
    image: '🍭'
  },
  {
    id: '4',
    name: 'Waffle Station',
    description: 'Professional waffle station with toppings and customization',
    basePrice: 120,
    category: 'catering',
    duration: 180,
    minGuests: 15,
    minHours: 3,
    maxGuests: 100,
    image: '🧇'
  },
  {
    id: '5',
    name: 'Photo Booth',
    description: 'Professional photo booth with prints and digital copies',
    basePrice: 200,
    category: 'entertainment',
    duration: 240,
    minGuests: 10,
    minHours: 4,
    maxGuests: 200,
    image: '📸'
  }
];

export function ServiceSelectionStep({
  selectedServiceId,
  onSelectService,
  error
}: ServiceSelectionStepProps) {
  const selectedService = MOCK_SERVICES.find(s => s.id === selectedServiceId);

  return (
    <div className="w-full space-y-6">
      {/* Header Card */}
      <div className="rounded-2xl border-2 border-amber-200 bg-white p-8">
        <h3 className="mb-2 text-2xl font-bold text-amber-900">Choose Your Service</h3>
        <p className="text-amber-600">Select the entertainment or catering service you want to book</p>

        {/* Error Message */}
        {error && (
          <div className="mt-6 p-4 bg-red-100 border-2 border-red-300 rounded-xl">
            <p className="text-red-700 font-semibold">{error}</p>
          </div>
        )}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {MOCK_SERVICES.map(service => {
          const durationHours = service.duration ? service.duration / 60 : 0;
          
          return (
            <button
              key={service.id}
              onClick={() => onSelectService(service)}
              className={`
                rounded-2xl border-2 p-6 text-left transition-all duration-200 group
                ${selectedServiceId === service.id
                  ? 'border-blue-600 bg-linear-to-br from-amber-50 to-yellow-50 shadow-lg'
                  : 'border-gray-200 bg-white hover:border-amber-300 hover:shadow-md'
                }
              `}
            >
              {/* Icon */}
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{service.image}</div>

              {/* Title */}
              <h4 className={`text-lg font-bold mb-2 ${
                selectedServiceId === service.id ? 'text-amber-900' : 'text-amber-900'
              }`}>
                {service.name}
              </h4>

              {/* Description */}
              <p className="text-sm text-amber-600 mb-4 line-clamp-2">{service.description}</p>

              {/* Details Grid */}
              <div className="space-y-2 mb-4 pb-4 border-t border-amber-200 pt-4">
                {durationHours > 0 && (
                  <div className="flex items-center gap-2 text-sm">
                    <Clock size={16} className="text-amber-600" />
                    <span className="text-amber-600">{durationHours}h duration</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm">
                  <Users size={16} className="text-amber-600" />
                  <span className="text-amber-600">{service.minGuests}-{service.maxGuests} guests</span>
                </div>
              </div>

              {/* Price Section */}
              <div className="flex items-end justify-between pt-4 border-t border-amber-200">
                <span className="text-xs text-amber-600">Starting at</span>
                <div className="text-right">
                  <div className="text-3xl font-bold bg-linear-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
                    ${service.basePrice}
                  </div>
                </div>
              </div>

              {/* Selection Indicator */}
              {selectedServiceId === service.id && (
                <div className="mt-4 flex items-center justify-center gap-2 py-2 px-3 bg-amber-600 rounded-lg">
                  <Zap size={16} className="text-white" />
                  <span className="text-sm font-semibold text-white">Selected</span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Selected Service Summary */}
      {selectedService && (
        <div className="rounded-2xl border-2 border-green-300 bg-green-50 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 font-semibold mb-1">✓ Service Selected</p>
              <p className="text-2xl font-bold text-green-900">{selectedService.name}</p>
              <p className="text-sm text-green-700 mt-1">
                Base price: ${selectedService.basePrice}
              </p>
            </div>
            <div className="text-5xl">{selectedService.image}</div>
          </div>
        </div>
      )}
    </div>
  );
}
