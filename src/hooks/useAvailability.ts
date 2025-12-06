import { useEffect, useState } from 'react';

interface AvailabilityDate {
  date: string;
  isAvailable: boolean;
  maxBookingsPerDay: number;
}

export function useAvailability(month: number, year: number) {
  const [availability, setAvailability] = useState<AvailabilityDate[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAvailability = async () => {
      setLoading(true);
      setError(null);

      try {
        // In a real app, this would be an API call
        const mockData: AvailabilityDate[] = [];
        const daysInMonth = new Date(year, month, 0).getDate();

        for (let day = 1; day <= daysInMonth; day++) {
          const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          mockData.push({
            date: dateStr,
            isAvailable: Math.random() > 0.2, // 80% available
            maxBookingsPerDay: 10,
          });
        }

        setAvailability(mockData);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to check availability';
        setError(errorMessage);
        setAvailability([]);
      } finally {
        setLoading(false);
      }
    };

    checkAvailability();
  }, [month, year]);

  return { availability, loading, error };
}