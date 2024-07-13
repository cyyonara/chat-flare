import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Email must be a valid email address' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

export const signupSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: 'Email is required' })
      .email({ message: 'Invalid email address' }),
    username: z
      .string()
      .min(4, { message: 'Username must have atleast 4 characters' })
      .max(24, {
        message: 'You have exceeded the maximum amount of characters for a username',
      }),
    password: z
      .string()
      .min(8, { message: 'Password must have atleast 8 characters' })
      .max(24, {
        message: 'You have exceeded the maximum amount for a password',
      }),
    confirmPassword: z.string().min(1, {
      message: 'Please confirm your password',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });
