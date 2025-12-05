/**
 * useAvailability Hook
 * - Fetch available dates from API
 * - Handle loading and errors
 * - Cache results
 */

import { useState, useEffect, useMemo } from 'react';
import { api } from '../utils/api';

export interface AvailableDate {
  date: string;
  isAvailable: boolean;
  spotsAvailable: number;
  maxBookingsPerDay: number;
}

export function useAvailability(serviceId: string | null) {
  const [availableDates, setAvailableDates] = useState<AvailableDate[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!serviceId) {
      setAvailableDates([]);
      return;
    }

    const fetchAvailability = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await api.getAvailability(serviceId);
        setAvailableDates(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch availability');
        setAvailableDates([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAvailability();
  }, [serviceId]);

  // Memoize sorted dates
  const sortedDates = useMemo(() => {
    return [...availableDates].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [availableDates]);

  return {
    availableDates: sortedDates,
    loading,
    error
  };
}