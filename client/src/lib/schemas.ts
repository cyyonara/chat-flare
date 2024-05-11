import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Email must be a valid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});
