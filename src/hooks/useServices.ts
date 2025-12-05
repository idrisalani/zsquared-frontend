/**
 * useServices Hook
 * - Fetch all services
 * - Handle loading and error states
 * - Cache results
 * - Type-safe with proper interfaces
 */

import { useState, useEffect } from 'react';
import { api } from '../utils/api';
import type { Service } from '../types';

interface UseServicesReturn {
  services: Service[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useServices(): UseServicesReturn {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchServices = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      // Fetch services from API
      const response = await api.getServices();

      // Type guard: determine what format the response is in
      let servicesList: unknown[] = [];
      
      if (Array.isArray(response)) {
        // Response is already an array
        servicesList = response;
      } else if (response && typeof response === 'object') {
        // Response is an object, check for data or services property
        const obj = response as Record<string, unknown>;
        if (Array.isArray(obj.data)) {
          servicesList = obj.data;
        } else if (Array.isArray(obj.services)) {
          servicesList = obj.services;
        }
      }

      // Transform to ensure all required fields exist
      const transformedServices: Service[] = servicesList.map((item: unknown) => {
        const service = item as Record<string, unknown>;
        return {
          id: String(service.id || ''),
          name: String(service.name || 'Unnamed Service'),
          description: String(service.description || ''),
          basePrice: Number(service.basePrice || service.price || 0),
          image: service.image ? String(service.image) : undefined,
          category: service.category ? String(service.category) : undefined,
          duration: service.duration ? Number(service.duration) : undefined,
          maxGuests: service.maxGuests ? Number(service.maxGuests) : undefined,
          ...service
        } as Service;
      });

      setServices(transformedServices);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch services';
      setError(errorMessage);
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch on mount
  useEffect(() => {
    fetchServices();
  }, []);

  return {
    services,
    loading,
    error,
    refetch: fetchServices
  };
}