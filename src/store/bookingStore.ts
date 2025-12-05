/**
 * Booking Store - Zustand state management
 * - Central state for entire booking flow
 * - Step management
 * - Form data persistence
 * - Real-time pricing
 * - Error handling
 */

import { create } from 'zustand';
import { Service, CustomerInfo } from '../types';
import { api } from '../utils/api';

export interface BookingState {
  // Current step (1-4)
  currentStep: number;

  // Step 1: Date selection
  selectedDate: string | null;

  // Step 2: Service selection
  selectedService: Service | null;

  // Step 3: Customization
  guestCount: number;
  eventHours: number;
  selectedOptions: Record<string, string>;

  // Step 4: Contact info
  customerInfo: CustomerInfo;

  // Pricing
  pricing: {
    baseServicePrice: number;
    addOnsTotal: number;
    taxAmount: number;
    totalPrice: number;
  };

  // UI State
  loading: boolean;
  errors: Record<string, string>;
  bookingId: string | null;

  // Actions
  setStep: (step: number) => void;
  setSelectedDate: (date: string) => void;
  setSelectedService: (service: Service) => void;
  setGuestCount: (count: number) => void;
  setEventHours: (hours: number) => void;
  setSelectedOptions: (options: Record<string, string>) => void;
  setCustomerInfo: (field: keyof CustomerInfo, value: string) => void;
  updatePricing: (pricing: any) => void;
  validateStep: (step: number) => Promise<boolean>;
  createBooking: () => Promise<string>;
  reset: () => void;
  setError: (field: string, error: string) => void;
  clearErrors: () => void;
}

const initialState = {
  currentStep: 1,
  selectedDate: null,
  selectedService: null,
  guestCount: 30,
  eventHours: 2,
  selectedOptions: {},
  customerInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    streetAddress: '',
    city: '',
    postalCode: '',
    country: 'USA'
  },
  pricing: {
    baseServicePrice: 0,
    addOnsTotal: 0,
    taxAmount: 0,
    totalPrice: 0
  },
  loading: false,
  errors: {},
  bookingId: null
};

export const useBookingStore = create<BookingState>((set, get) => ({
  ...initialState,

  setStep: (step) => set({ currentStep: step }),

  setSelectedDate: (date) => set({ selectedDate: date }),

  setSelectedService: (service) => {
    set({ selectedService: service });
    // Auto-set to min requirements
    set({
      guestCount: Math.max(service.minGuests, 30),
      eventHours: Math.max(service.minHours, 2)
    });
  },

  setGuestCount: (count) => set({ guestCount: count }),

  setEventHours: (hours) => set({ eventHours: hours }),

  setSelectedOptions: (options) => set({ selectedOptions: options }),

  setCustomerInfo: (field, value) => {
    const state = get();
    set({
      customerInfo: {
        ...state.customerInfo,
        [field]: value
      }
    });
  },

  updatePricing: (pricing) => set({ pricing }),

  validateStep: async (step) => {
    const state = get();
    const errors: Record<string, string> = {};

    // Step 1: Date validation
    if (step === 1) {
      if (!state.selectedDate) {
        errors.selectedDate = 'Please select a date';
      }
    }

    // Step 2: Service validation
    if (step === 2) {
      if (!state.selectedService) {
        errors.selectedService = 'Please select a service';
      }
    }

    // Step 3: Customization validation
    if (step === 3) {
      if (!state.selectedService) {
        errors.customization = 'No service selected';
      } else {
        if (state.guestCount < state.selectedService.minGuests) {
          errors.guestCount = `Minimum ${state.selectedService.minGuests} guests required`;
        }
        if (state.eventHours < state.selectedService.minHours) {
          errors.eventHours = `Minimum ${state.selectedService.minHours} hours required`;
        }
      }
    }

    // Step 4: Contact info validation
    if (step === 4) {
      if (!state.customerInfo.firstName) errors.firstName = 'Required';
      if (!state.customerInfo.lastName) errors.lastName = 'Required';
      if (!state.customerInfo.email) errors.email = 'Required';
      if (!state.customerInfo.phone) errors.phone = 'Required';
      if (!state.customerInfo.city) errors.city = 'Required';
      if (!state.customerInfo.postalCode) errors.postalCode = 'Required';
    }

    set({ errors });
    return Object.keys(errors).length === 0;
  },

  createBooking: async () => {
    const state = get();
    set({ loading: true });

    try {
      // Validate before submission
      const isValid = await get().validateStep(4);
      if (!isValid) {
        return '';
      }

      const bookingData = {
        serviceId: state.selectedService!.id,
        bookingDate: state.selectedDate!,
        guestCount: state.guestCount,
        eventHours: state.eventHours,
        selectedOptions: state.selectedOptions,
        customer: state.customerInfo
      };

      const result = await api.createBooking(bookingData);
      
      set({ bookingId: result.id });
      return result.id;
    } catch (error: any) {
      set({
        errors: {
          submit: error.response?.data?.error?.message || 'Failed to create booking'
        }
      });
      return '';
    } finally {
      set({ loading: false });
    }
  },

  reset: () => set(initialState),

  setError: (field, error) => {
    const state = get();
    set({
      errors: {
        ...state.errors,
        [field]: error
      }
    });
  },

  clearErrors: () => set({ errors: {} })
}));