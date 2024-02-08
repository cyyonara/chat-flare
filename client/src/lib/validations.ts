import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "Please enter a valid email" })
    .refine((data) => data.length > 0, { message: "Email is required" }),
  password: z.string(),
});

export const signupSchema = z
  .object({
    email: z.string().email({ message: "Invalid email" }),
    username: z
      .string()
      .refine((data) => data.length > 0, { message: "Username is required" }),
    password: z
      .string()
      .min(6, { message: "Please create a stronger password" }),
    confirmPassword: z.string().refine((data) => data.length > 0, {
      message: "Please confirm your password",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });
