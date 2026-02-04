import { z } from 'zod';

export const CoffeeInFormSchema = z.object({
  product_id: z.number().int().positive('Product required'),
  quantity_box: z.number().int().positive('Quantity must be greater than 0'),
  receiver: z.string().min(1, 'Receiver required'),
  po_no: z.string().optional(),
  note: z.string().optional(),
});

export const CoffeeOutFormSchema = z.object({
  product_id: z.number().int().positive('Product required'),
  quantity_pack: z.number().int().min(0, 'Quantity must be >= 0'),
  quantity_box: z.number().int().min(0, 'Quantity must be >= 0'),
  supplier: z.string().min(1, 'Supplier required'),
  note: z.string().optional(),
});

export type CoffeeInForm = z.infer<typeof CoffeeInFormSchema>;
export type CoffeeOutForm = z.infer<typeof CoffeeOutFormSchema>;
