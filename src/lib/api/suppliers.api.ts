import { apiClient } from './client';
import { Supplier } from '@/types';

export const suppliersApi = {
  getAll: async (): Promise<Supplier[]> => {
    const response = await apiClient.get<{ code: number; data: Supplier[] }>('/suppliers');
    return response.data.data;
  },

  getById: async (id: string): Promise<Supplier> => {
    const response = await apiClient.get<{ code: number; data: Supplier }>(`/suppliers/${id}`);
    return response.data.data;
  },

  create: async (data: Omit<Supplier, 'id'>): Promise<Supplier> => {
    const response = await apiClient.post<{ code: number; data: Supplier }>('/suppliers', data);
    return response.data.data;
  },

  update: async (id: string, data: Partial<Supplier>): Promise<Supplier> => {
    const response = await apiClient.put<{ code: number; data: Supplier }>(`/suppliers/${id}`, data);
    return response.data.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/suppliers/${id}`);
  },
};
