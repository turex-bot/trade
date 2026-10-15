import { z } from 'zod';

export const createSupplierSchema = z.object({
  name: z.string().min(3, 'Nama minimal 3 karakter').max(100, 'Nama maksimal 100 karakter'),
  owner_name: z.string().min(3, 'Nama pemilik minimal 3 karakter').max(100, 'Nama pemilik maksimal 100 karakter'),
  phone: z.string().min(10, 'Nomor telepon minimal 10 karakter').max(15, 'Nomor telepon maksimal 15 karakter'),
  email: z.string().email('Format email tidak valid').optional().or(z.literal('')),
  address: z.string().min(10, 'Alamat minimal 10 karakter'),
  bank_account: z.string().min(10, 'No. rekening minimal 10 karakter'),
  bank_name: z.string().min(1, 'Bank wajib dipilih'),
  npwp: z.string().optional(),
  status: z.enum(['aktif', 'nonaktif']).default('aktif'),
});

export const updateSupplierSchema = createSupplierSchema.partial();

export type CreateSupplierInput = z.infer<typeof createSupplierSchema>;
export type UpdateSupplierInput = z.infer<typeof updateSupplierSchema>;
