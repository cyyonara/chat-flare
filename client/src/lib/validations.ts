import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "Please enter a valid email" })
    .refine((data) => data.length > 0, { message: "Email is required" }),
  password: z.string(),
});
