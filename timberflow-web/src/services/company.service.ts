import api from './api';
import { ApiResponse, Company } from '../types';

export const companyService = {
  getAll: async (): Promise<ApiResponse<Company[]>> => {
    const response = await api.get<ApiResponse<Company[]>>('/companies');
    return response.data;
  },

  getById: async (id: string): Promise<ApiResponse<Company>> => {
    const response = await api.get<ApiResponse<Company>>(`/companies/${id}`);
    return response.data;
  },

  create: async (data: Omit<Company, 'id' | 'created_at' | 'updated_at'>): Promise<ApiResponse<Company>> => {
    const response = await api.post<ApiResponse<Company>>('/companies', data);
    return response.data;
  },

  update: async (id: string, data: Partial<Company>): Promise<ApiResponse<Company>> => {
    const response = await api.put<ApiResponse<Company>>(`/companies/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<ApiResponse<null>> => {
    const response = await api.delete<ApiResponse<null>>(`/companies/${id}`);
    return response.data;
  },
};
