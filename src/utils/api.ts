/**
 * Frontend API Client - Fully Typed Version
 * - Proper TypeScript types (no 'any')
 * - Type-only imports for types
 * - Class-based structure
 * - All API methods
 * - Automatic token handling
 * - Complete error handling
 */

import axios from 'axios';
import type { AxiosInstance } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Response types
interface AuthResponse {
  token?: string;
  user?: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
}

interface AvailabilityDate {
  date: string;
  spotsAvailable: number;
}

interface AvailabilityResponse {
  availableDates?: AvailabilityDate[];
}

interface BookingData {
  serviceId: string;
  date: string;
  options: Record<string, unknown>;
  customerInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
}

interface ProfileData {
  [key: string]: unknown;
}

interface ServiceResponse {
  id: string;
  name: string;
  description: string;
  [key: string]: unknown;
}

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Request interceptor - add auth token
    this.client.interceptors.request.use((config) => {
      const token = localStorage.getItem('auth_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Response interceptor - handle errors and extract data
    this.client.interceptors.response.use(
      (response) => {
        // Handle both response.data and response.data.data
        return response.data?.data || response.data;
      },
      (error) => {
        // Handle 401 - unauthorized
        if (error.response?.status === 401) {
          localStorage.removeItem('auth_token');
          window.location.href = '/login';
        }
        
        // Return error message
        const message = error.response?.data?.message || error.message || 'An error occurred';
        return Promise.reject(new Error(message));
      }
    );
  }

  // AUTH ENDPOINTS

  async register(email: string, password: string, firstName: string, lastName: string): Promise<AuthResponse> {
    const response = await this.client.post<AuthResponse>('/auth/register', {
      email,
      password,
      firstName,
      lastName
    });
    
    const authResponse = response as unknown as AuthResponse;
    if (authResponse?.token) {
      localStorage.setItem('auth_token', authResponse.token);
    }
    
    return authResponse;
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await this.client.post<AuthResponse>('/auth/login', {
      email,
      password
    });
    
    const authResponse = response as unknown as AuthResponse;
    if (authResponse?.token) {
      localStorage.setItem('auth_token', authResponse.token);
    }
    
    return authResponse;
  }

  async logout(): Promise<void> {
    await this.client.post('/auth/logout');
    localStorage.removeItem('auth_token');
  }

  // SERVICE ENDPOINTS

  async getServices(): Promise<ServiceResponse[]> {
    return await this.client.get('/services');
  }

  async getService(serviceId: string): Promise<ServiceResponse> {
    return await this.client.get(`/services/${serviceId}`);
  }

  async getServiceOptions(serviceId: string): Promise<Record<string, unknown>> {
    return await this.client.get(`/services/${serviceId}/options`);
  }

  // AVAILABILITY ENDPOINTS

  async getAvailability(serviceId: string, year?: number, month?: number): Promise<AvailabilityDate[]> {
    const params = new URLSearchParams();
    if (year) params.append('year', year.toString());
    if (month) params.append('month', month.toString());
    
    const response = await this.client.get<AvailabilityResponse>(`/availability/${serviceId}`, { params });
    
    const availabilityResponse = response as unknown as AvailabilityResponse;
    
    return Array.isArray(availabilityResponse) 
      ? availabilityResponse 
      : availabilityResponse?.availableDates || [];
  }

  // BOOKING ENDPOINTS

  async validateBooking(bookingData: {
    serviceId: string;
    date: string;
    options?: Record<string, unknown>;
  }): Promise<Record<string, unknown>> {
    return await this.client.post('/bookings/validate', bookingData);
  }

  async createBooking(bookingData: BookingData): Promise<Record<string, unknown>> {
    return await this.client.post('/bookings', bookingData);
  }

  async getBooking(bookingId: string): Promise<Record<string, unknown>> {
    return await this.client.get(`/bookings/${bookingId}`);
  }

  async getMyBookings(): Promise<Record<string, unknown>[]> {
    return await this.client.get('/bookings');
  }

  async updateBooking(bookingId: string, updates: Record<string, unknown>): Promise<Record<string, unknown>> {
    return await this.client.patch(`/bookings/${bookingId}`, updates);
  }

  async cancelBooking(bookingId: string, reason?: string): Promise<Record<string, unknown>> {
    return await this.client.delete(`/bookings/${bookingId}`, {
      params: { reason }
    });
  }

  // PAYMENT ENDPOINTS

  async initializePayment(bookingId: string, amount: number): Promise<Record<string, unknown>> {
    return await this.client.post('/payments/initialize', {
      bookingId,
      amount
    });
  }

  async confirmPayment(paymentId: string, token: string): Promise<Record<string, unknown>> {
    return await this.client.post('/payments/confirm', {
      paymentId,
      token
    });
  }

  // CUSTOMER PROFILE ENDPOINTS

  async getProfile(): Promise<Record<string, unknown>> {
    return await this.client.get('/customers/profile');
  }

  async updateProfile(profileData: ProfileData): Promise<Record<string, unknown>> {
    return await this.client.patch('/customers/profile', profileData);
  }
}

// Create singleton instance
export const api = new ApiClient();

// Also export default for flexibility
export default api;