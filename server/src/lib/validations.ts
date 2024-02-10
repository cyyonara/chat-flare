import { z } from "zod";

export const signUpSchema = z
  .object({
    username: z
      .string()
      .refine((data) => data.length > 0, { message: "Username is required" }),
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

export const googleSignUpSchema = z
  .object({
    username: z
      .string()
      .refine((data) => data.length > 0, { message: "Username is required" }),
    avatar: z.string().url(),
    email: z.string().email(),
    password: z.string().min(6, { message: "Please create a stronger password" }),
  })
  .strict();

export const googleLoginSchema = googleSignUpSchema.pick({ email: true }).strict();

export const setupSchema = googleSignUpSchema.pick({ avatar: true }).strict();

export const createChatSchema = z
  .object({
    people: z.array(z.string().refine((data) => data.length > 0)).min(1),
    isGroupChat: z.boolean(),
  })
  .strict()
  .refine(
    (data) => {
      if (!data.isGroupChat) {
        return data.people.length === 1;
      }

      return true;
    },
    {
      message:
        "Only 2 users are allowed when creating a new chat that is not a group chat",
      path: ["people"],
    }
  );
