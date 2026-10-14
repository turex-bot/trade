import api from './api';
import { ApiResponse, Order } from '../types';

export const orderService = {
  getAll: async (): Promise<ApiResponse<Order[]>> => {
    const response = await api.get<ApiResponse<Order[]>>('/orders');
    return response.data;
  },

  getById: async (id: string): Promise<ApiResponse<Order>> => {
    const response = await api.get<ApiResponse<Order>>(`/orders/${id}`);
    return response.data;
  },

  create: async (data: Omit<Order, 'id' | 'created_at' | 'updated_at' | 'order_number'>): Promise<ApiResponse<Order>> => {
    const response = await api.post<ApiResponse<Order>>('/orders', data);
    return response.data;
  },

  update: async (id: string, data: Partial<Order>): Promise<ApiResponse<Order>> => {
    const response = await api.put<ApiResponse<Order>>(`/orders/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<ApiResponse<null>> => {
    const response = await api.delete<ApiResponse<null>>(`/orders/${id}`);
    return response.data;
  },

  confirm: async (id: string): Promise<ApiResponse<Order>> => {
    const response = await api.post<ApiResponse<Order>>(`/orders/${id}/confirm`);
    return response.data;
  },
};
