/**
 * TypeScript Type Definitions
 * - Service types
 * - Booking types
 * - User types
 * - API response types
 */

// Service Types
export interface Service {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  image?: string;
  category?: string;
  duration?: number;
  minGuests?: number;      // ← Add this
  minHours?: number;       // ← Add this
  maxGuests?: number;
  [key: string]: unknown;
}

export interface ServiceOption {
  id: string;
  serviceId: string;
  name: string;
  description?: string;
  price: number;
  required: boolean;
  values?: ServiceOptionValue[];
  [key: string]: unknown;
}

export interface ServiceOptionValue {
  id: string;
  optionId: string;
  value: string;
  priceModifier?: number;
  [key: string]: unknown;
}

// Availability Types
export interface AvailabilityDate {
  date: string;
  spotsAvailable: number;
  isAvailable: boolean;
}

export interface AvailabilityData {
  serviceId: string;
  dates: AvailabilityDate[];
  totalSpots: number;
}

// Booking Types
export interface BookingData {
  serviceId: string;
  date: string;
  options: Record<string, unknown>;
  customerInfo: CustomerInfo;
}

export interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  streetAddress?: string;
  city?: string;
  postalCode?: string;
  additionalNotes?: string;
}

export interface Booking {
  id: string;
  serviceId: string;
  date: string;
  time?: string;
  options: Record<string, unknown>;
  customerInfo: CustomerInfo;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: string;
  updatedAt: string;
  [key: string]: unknown;
}

// User Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: 'customer' | 'admin' | 'staff';
  createdAt: string;
  updatedAt: string;
  [key: string]: unknown;
}

export interface AuthResponse {
  token?: string;
  user?: User;
  message?: string;
}

// Payment Types
export interface PaymentData {
  bookingId: string;
  amount: number;
  paymentMethod?: string;
  cardToken?: string;
}

export interface Payment {
  id: string;
  bookingId: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  transactionId?: string;
  createdAt: string;
  [key: string]: unknown;
}

// Store Types (Zustand)
export interface BookingState {
  selectedDate: string | null;
  selectedService: Service | null;
  selectedOptions: Record<string, unknown>;
  customerInfo: CustomerInfo | null;
  totalPrice: number;
  
  // Actions
  setSelectedDate: (date: string) => void;
  setSelectedService: (service: Service) => void;
  setSelectedOptions: (options: Record<string, unknown>) => void;
  setCustomerInfo: (info: CustomerInfo) => void;
  setTotalPrice: (price: number) => void;
  resetBooking: () => void;
}

// Component Props Types
export interface StepProps {
  onNext?: () => void;
  onPrevious?: () => void;
  isLoading?: boolean;
  error?: string;
}

export interface CalendarStepProps extends StepProps {
  serviceId: string | null;
  selectedDate: string | null;
  onSelectDate: (date: string) => void;
}

export interface ServiceSelectionStepProps extends StepProps {
  selectedServiceId: string | null;
  onSelectService: (service: Service) => void;
}

export interface CustomizationStepProps extends StepProps {
  serviceId: string | null;
  selectedOptions: Record<string, unknown>;
  onSelectOptions: (options: Record<string, unknown>) => void;
  onPriceChange: (price: number) => void;
}

export interface ContactStepProps extends StepProps {
  customerInfo: CustomerInfo | null;
  onSubmit: (info: CustomerInfo) => void;
}

export interface NavbarProps {
  onLogout?: () => void;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Utility Types
export type ServiceCategory = 'vr' | 'bouncy-house' | 'cotton-candy' | 'waffle-station' | 'photo-booth';

export interface FilterOptions {
  category?: ServiceCategory;
  minPrice?: number;
  maxPrice?: number;
  searchTerm?: string;
}

export interface SortOptions {
  field: 'name' | 'price' | 'rating' | 'popularity';
  order: 'asc' | 'desc';
}