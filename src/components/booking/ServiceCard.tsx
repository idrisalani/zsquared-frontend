/**
 * Service Card Component
 * - Display individual service
 * - Show service details
 * - Handle selection
 * - Responsive design
 */

import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import type { Service } from '../../types';

interface ServiceCardProps {
  service: Service;
  isSelected?: boolean;
  onSelect?: (service: Service) => void;
}

export function ServiceCard({ service, isSelected = false, onSelect }: ServiceCardProps) {
  const handleClick = (): void => {
    onSelect?.(service);
  };

  // Safely convert price to display string
  const priceDisplay = typeof service.basePrice === 'number' 
    ? `$${service.basePrice.toFixed(2)}`
    : '$0.00';

  // Safely convert category to display string
  const categoryDisplay = typeof service.category === 'string'
    ? service.category
    : 'General';

  // Safely convert duration to display string
  const durationDisplay = typeof service.duration === 'number'
    ? `${service.duration} mins`
    : 'Check details';

  return (
    <Card
      onClick={handleClick}
      className={`
        cursor-pointer transition-all duration-300
        hover:shadow-lg hover:scale-105
        ${isSelected 
          ? 'border-2 border-cyan-500 bg-cyan-500/10' 
          : 'border border-slate-600/50 hover:border-cyan-500/50'
        }
      `}
    >
      {/* Service Image */}
      {service.image && (
        <div className="relative h-40 overflow-hidden bg-gradient-to-br from-slate-700 to-slate-800">
          <img
            src={service.image}
            alt={service.name}
            className="h-full w-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        </div>
      )}

      <CardHeader className="pb-3">
        <CardTitle className="text-lg text-white">
          {String(service.name)}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Description */}
        <p className="text-sm text-slate-400 line-clamp-2">
          {String(service.description || 'No description available')}
        </p>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-2 pt-2">
          {/* Price */}
          <div className="rounded-lg bg-slate-700/30 p-2">
            <p className="text-xs text-slate-400">Price</p>
            <p className="text-sm font-bold text-cyan-400">
              {priceDisplay}
            </p>
          </div>

          {/* Duration */}
          <div className="rounded-lg bg-slate-700/30 p-2">
            <p className="text-xs text-slate-400">Duration</p>
            <p className="text-sm font-bold text-cyan-400">
              {durationDisplay}
            </p>
          </div>
        </div>

        {/* Category Badge */}
        <div className="flex items-center gap-2 pt-2">
          <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-xs font-semibold text-cyan-400">
            {categoryDisplay}
          </span>
          {service.maxGuests && (
            <span className="text-xs text-slate-400">
              Up to {String(service.maxGuests)} guests
            </span>
          )}
        </div>

        {/* Selected Indicator */}
        {isSelected && (
          <div className="flex items-center justify-center gap-2 rounded-lg bg-cyan-500/20 py-2 pt-3">
            <div className="h-2 w-2 rounded-full bg-cyan-400" />
            <span className="text-xs font-semibold text-cyan-400">Selected</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}