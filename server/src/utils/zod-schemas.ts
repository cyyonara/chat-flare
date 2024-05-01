import { z } from 'zod';

export const signupSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(4, { message: 'Username must have atleast 4 characters' })
      .max(24, {
        message: 'You have exceeded the maximum amount of characters for a username',
      }),
    email: z.string().email({ message: 'Email must be a valid email address' }),
    password: z
      .string()
      .trim()
      .min(8, { message: 'Password must have atleast 8 characters' })
      .max(24, { message: 'You have exceeded the maximum amount for a password' }),
    confirmPassword: z.string().trim(),
  })
  .strict()
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
  });

export const loginSchema = z
  .object({
    email: z.string().email({ message: 'Email must be a valid email address' }),
    password: z.string(),
  })
  .strict();
