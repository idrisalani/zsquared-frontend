import { create } from 'zustand';
import type { Service, CustomerInfo } from '../types';

interface BookingData {
  date: string;
  options: Record<string, string | number>;
  customerInfo: CustomerInfo;
  serviceId: string;
  guestCount: number;
  eventHours: number;
}

interface BookingState {
  selectedService: Service | null;
  selectedDate: string | null;
  guestCount: number;
  eventHours: number;
  selectedOptions: Record<string, string | number>;
  customer: CustomerInfo | null;
  bookings: BookingData[];
  loading: boolean;
  error: string | null;

  setSelectedService: (service: Service | null) => void;
  setSelectedDate: (date: string) => void;
  setGuestCount: (count: number) => void;
  setEventHours: (hours: number) => void;
  setSelectedOption: (name: string, value: string | number) => void;
  setCustomer: (customer: CustomerInfo) => void;
  submitBooking: () => Promise<string | null>;
  reset: () => void;
}

export const useBookingStore = create<BookingState>((set, get) => ({
  selectedService: null,
  selectedDate: null,
  guestCount: 1,
  eventHours: 2,
  selectedOptions: {},
  customer: null,
  bookings: [],
  loading: false,
  error: null,

  setSelectedService: (service) => set({ selectedService: service }),
  
  setSelectedDate: (date) => set({ selectedDate: date }),
  
  setGuestCount: (count) => set({ guestCount: Math.max(1, count) }),
  
  setEventHours: (hours) => set({ eventHours: Math.max(1, hours) }),
  
  setSelectedOption: (name, value) =>
    set((state) => ({
      selectedOptions: {
        ...state.selectedOptions,
        [name]: value,
      },
    })),

  setCustomer: (customer) => set({ customer }),

  submitBooking: async () => {
    const state = get();

    if (!state.selectedService || !state.selectedDate || !state.customer) {
      set({ error: 'Missing required booking information' });
      return null;
    }

    set({ loading: true, error: null });

    try {
      // Validate booking
      const minGuests = state.selectedService.minGuests ?? 1;
      const minHours = state.selectedService.minHours ?? 1;

      if (state.guestCount < minGuests) {
        throw new Error(`Minimum ${minGuests} guests required`);
      }

      if (state.eventHours < minHours) {
        throw new Error(`Minimum ${minHours} hours required`);
      }

      // Create booking data
      const bookingData: BookingData = {
        date: state.selectedDate,
        options: state.selectedOptions,
        customerInfo: state.customer,
        serviceId: String(state.selectedService.id),
        guestCount: state.guestCount,
        eventHours: state.eventHours,
      };

      // In a real app, this would be an API call
      const orderId = `ZSQ${Math.random().toString(36).substring(2, 9).toUpperCase()}`;

      set((state) => ({
        bookings: [...state.bookings, bookingData],
        loading: false,
      }));

      return orderId;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Booking failed';
      set({ error: errorMessage, loading: false });
      return null;
    }
  },

  reset: () =>
    set({
      selectedService: null,
      selectedDate: null,
      guestCount: 1,
      eventHours: 2,
      selectedOptions: {},
      customer: null,
      error: null,
    }),
}));