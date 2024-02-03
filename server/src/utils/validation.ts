import { z } from "zod";

export const signUpSchema = z
  .object({
    username: z.string().refine((data) => data.length > 0),
    email: z.string().email(),
    password: z.string().min(6, { message: "Please create a stronger password" }),
    confirmPassword: z
      .string()
      .refine((data) => data.length > 0, { message: "Please confirm your password" }),
  })
  .strict()
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export const loginSchema = z
  .object({
    email: z.string().email({ message: "Email must be a valid email" }),
    password: z.string(),
  })
  .strict();
