import z from 'zod';

export const signupSchema = z.object({
  firstName: z.string().min(1).trim(),
  lastName: z.string().min(1).trim(),
  email: z.string().trim().email().toLowerCase(),
  password: z.string().min(4).trim(),
});

export const signinSchema = z.object({
  email: z.string().trim().email().toLowerCase(),
  password: z.string().min(4).trim(),
});
