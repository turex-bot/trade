import api from './api';
import { ApiResponse, Payment } from '../types';

export const paymentService = {
  getAll: async (): Promise<ApiResponse<Payment[]>> => {
    const response = await api.get<ApiResponse<Payment[]>>('/payments');
    return response.data;
  },

  create: async (data: Omit<Payment, 'id' | 'created_at'>): Promise<ApiResponse<Payment>> => {
    const response = await api.post<ApiResponse<Payment>>('/payments', data);
    return response.data;
  },
};
