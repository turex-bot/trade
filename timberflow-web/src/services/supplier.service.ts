import api from './api';
import { ApiResponse, Supplier } from '../types';

export const supplierService = {
  getAll: async (): Promise<ApiResponse<Supplier[]>> => {
    const response = await api.get<ApiResponse<Supplier[]>>('/suppliers');
    return response.data;
  },

  getById: async (id: string): Promise<ApiResponse<Supplier>> => {
    const response = await api.get<ApiResponse<Supplier>>(`/suppliers/${id}`);
    return response.data;
  },

  create: async (data: Omit<Supplier, 'id' | 'created_at' | 'updated_at'>): Promise<ApiResponse<Supplier>> => {
    const response = await api.post<ApiResponse<Supplier>>('/suppliers', data);
    return response.data;
  },

  update: async (id: string, data: Partial<Supplier>): Promise<ApiResponse<Supplier>> => {
    const response = await api.put<ApiResponse<Supplier>>(`/suppliers/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<ApiResponse<null>> => {
    const response = await api.delete<ApiResponse<null>>(`/suppliers/${id}`);
    return response.data;
  },
};
