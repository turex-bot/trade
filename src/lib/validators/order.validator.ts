import { z } from 'zod';

export const orderItemSchema = z.object({
  wood_spec_id: z.string().min(1, 'Jenis kayu wajib dipilih'),
  number_of_logs: z.number().int().min(1, 'Jumlah batang minimal 1'),
  volume: z.number().min(0.001, 'Kubikasi minimal 0.001 m³'),
});

export const createOrderSchema = z.object({
  company_id: z.string().min(1, 'Perusahaan wajib dipilih'),
  supplier_id: z.string().min(1, 'Supplier wajib dipilih'),
  no_kedatangan: z.string().min(1, 'No. kedatangan wajib diisi'),
  no_kendaraan: z.string().min(1, 'No. kendaraan wajib diisi'),
  order_date: z.string().min(1, 'Tanggal wajib diisi'),
  items: z.array(orderItemSchema).min(1, 'Minimal 1 item kayu'),
  notes: z.string().optional(),
});

export const updateOrderSchema = createOrderSchema.partial();

export type OrderItemInput = z.infer<typeof orderItemSchema>;
export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type UpdateOrderInput = z.infer<typeof updateOrderSchema>;
