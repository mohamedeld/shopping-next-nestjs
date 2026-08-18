import z from "zod";

export const createProductSchema = z.object({
  name: z
    .string()
    .min(1, "Product name is required")
    .min(3, "Product name must be at least 3 characters"),

  description: z
    .string()
    .min(1, "Description is required")
    .min(10, "Description must be at least 10 characters"),

  price: z.coerce.number().positive("Price must be greater than 0"),
});

export type CreateProductSchema = z.infer<typeof createProductSchema>;
