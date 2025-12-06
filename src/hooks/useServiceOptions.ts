import { useEffect, useState } from 'react';
import type { ServiceOption } from '../types';

export function useServiceOptions(serviceId: string | null) {
  const [options, setOptions] = useState<ServiceOption[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!serviceId) {
      setOptions([]);
      return;
    }

    const loadOptions = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        const mockOptions: ServiceOption[] = [
          {
            name: 'Add-ons',
            values: [
              { label: 'Premium Decorations', additionalPrice: 50 },
              { label: 'Professional Photos', additionalPrice: 100 },
              { label: 'Extended Hours', additionalPrice: 75 },
            ],
          },
        ];

        setOptions(mockOptions);
      } catch (err) {
        console.error('Failed to load service options:', err);
        setOptions([]);
      } finally {
        setLoading(false);
      }
    };

    loadOptions();
  }, [serviceId]);

  return { options, loading };
}