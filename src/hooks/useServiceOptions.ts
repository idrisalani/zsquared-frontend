// src/hooks/useServiceOptions.ts

import { useState, useEffect } from 'react';
import { api } from '../utils/api';
import { ServiceOption } from '../types';

export function useServiceOptions(serviceId: string | null) {
  const [options, setOptions] = useState<ServiceOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!serviceId) {
      setOptions([]);
      return;
    }

    const fetchOptions = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await api.getServiceOptions(serviceId);
        setOptions(data.options || []);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch options');
        setOptions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOptions();
  }, [serviceId]);

  return { options, loading, error };
}