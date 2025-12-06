// Core Domain Types
export interface Service {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  minGuests?: number;
  maxGuests?: number;
  minHours?: number;
  maxHours?: number;
  image?: string;
}

export interface ServiceOption {
  name: string;
  values?: Array<{
    label: string | number;
    additionalPrice: number;
  }>;
}

export interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: string;
  notes?: string;
}

export interface BookingRequest {
  serviceId: string;
  bookingDate: string;
  guestCount: number;
  eventHours: number;
  selectedOptions: Record<string, string | number>;
  customer: CustomerInfo;
}

export interface BookingResponse {
  orderId: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  totalPrice: number;
  bookingDate: string;
}

export interface AvailabilityDate {
  date: string;
  isAvailable: boolean;
  maxBookingsPerDay: number;
}

// Component Props Types
export interface StepProps {
  onNext: (data?: Record<string, any>) => void;
  onPrevious?: () => void;
  data?: Record<string, any>;
}

export interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export interface FormInputProps {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
  icon?: 'mail' | 'phone';
}

export interface FormTextareaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
  rows?: number;
}