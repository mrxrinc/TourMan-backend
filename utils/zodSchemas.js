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

export const messageSchema = z
  .object({
    title: z.string(),
    text: z.string(),
    date: z.string(),
    archive: z.boolean(),
  })
  .optional();

const messagesSchema = z.array(messageSchema);

export const userSchema = z.object({
  firstName: z.string().min(1).trim().optional(),
  lastName: z.string().min(1).trim().optional(),
  email: z.string().trim().email().toLowerCase(),
  sex: z.enum(['male', 'female']).default('male'),
  location: z.string().optional(),
  mobile: z.string().optional(),
  avatar: z.string(),
  thumb: z.string(),
  about: z.string().optional(),
  job: z.string().optional(),
  education: z.string().optional(),
  languages: z.array(z.string()).optional(),
  verifiedInfo: z.string().optional(),
  verified: z.boolean().default(false),
  registerDate: z.string().optional(),
  reviewsCount: z.number().optional(),
  overallRate: z.number().optional(),
  likes: z.array(z.string()),
  trips: z.array(z.string()),
  messages: messagesSchema,
});

export const privacySchema = z
  .object({
    text: z.string().min(1).trim(),
  })
  .optional();
