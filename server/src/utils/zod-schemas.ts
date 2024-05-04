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
    path: ['password', 'confirmPassword'],
  });

export const loginSchema = z
  .object({
    email: z.string().email({ message: 'Email must be a valid email address' }),
    password: z.string(),
  })
  .strict();

export const createChatSchema = z
  .object({
    chatName: z.string(),
    isGroupChat: z.boolean(),
    people: z.array(z.object({ user: z.string(), isLeaved: z.boolean() })),
  })
  .strict()
  .refine(
    (data) => {
      if (data.isGroupChat) {
        return data.people.length >= 1;
      }
      return true;
    },
    { message: 'Group chats need atleast 2 or more people', path: ['people'] }
  )
  .refine(
    (data) => {
      if (!data.isGroupChat) {
        return data.people.length === 1;
      }
      return true;
    },
    {
      message: 'Chats can only have 2 users',
      path: ['people'],
    }
  );
