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
      confirmPassword: z
         .string()
         .trim()
         .refine((data) => data.length > 1, { message: 'Please confirm your password' }),
   })
   .strict()
   .refine((data) => data.password === data.confirmPassword, {
      message: 'Passwords do not match',
      path: ['password', 'confirmPassword'],
   });

export const googleSignupSchema = z
   .object({
      email: z.string().email({ message: 'Email must be a valid email address' }),
      username: z
         .string()
         .trim()
         .min(4, { message: 'Username must have atleast 4 characters' })
         .max(24, {
            message: 'You have exceeded the maximum amount of characters for a username',
         }),
      profilePicture: z.string().url(),
   })
   .strict();

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
      users: z.array(z.string()),
   })
   .strict()
   .refine(
      (data) => {
         if (data.isGroupChat) {
            return data.users.length >= 1;
         }
         return true;
      },
      {
         message: 'Group chats need atleast 1 or more user at users field',
         path: ['users'],
      }
   )
   .refine(
      (data) => {
         if (!data.isGroupChat) {
            return data.users.length === 1;
         }
         return true;
      },
      {
         message: 'Chats can only have 2 users',
         path: ['users'],
      }
   );

export const addMessageSchema = z
   .object({
      content: z.string().min(1),
      isImage: z.boolean(),
   })
   .refine(
      (data) => {
         if (data.isImage) {
            const { error } = z.string().url().safeParse(data.content);
            return !error;
         } else {
            return true;
         }
      },
      { message: 'Image must have a url content', path: ['content', 'isImage'] }
   );
