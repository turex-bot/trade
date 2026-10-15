import { z } from 'zod';

export const createCompanySchema = z.object({
  name: z.string().min(3, 'Nama perusahaan minimal 3 karakter').max(100, 'Nama perusahaan maksimal 100 karakter'),
  pic_name: z.string().min(3, 'Nama PIC minimal 3 karakter'),
  pic_phone: z.string().min(10, 'Nomor telepon PIC minimal 10 karakter'),
  address: z.string().min(10, 'Alamat minimal 10 karakter'),
  npwp: z.string().optional(),
  top_days: z.number().int().min(1, 'TOP minimal 1 hari').max(365, 'TOP maksimal 365 hari'),
  credit_limit: z.number().min(0, 'Credit limit tidak boleh negatif'),
  risk_rating: z.enum(['A', 'B', 'C']),
  status: z.enum(['aktif', 'nonaktif']).default('aktif'),
});

export const updateCompanySchema = createCompanySchema.partial();

export type CreateCompanyInput = z.infer<typeof createCompanySchema>;
export type UpdateCompanyInput = z.infer<typeof updateCompanySchema>;
