import { z } from 'zod';

// Post validation schema
export const postSchema = z.object({
  title: z.string()
    .trim()
    .min(1, 'Title is required')
    .max(200, 'Title must be less than 200 characters'),
  content: z.string()
    .trim()
    .min(10, 'Content must be at least 10 characters')
    .max(100000, 'Content must be less than 100,000 characters'),
  excerpt: z.string()
    .trim()
    .min(10, 'Excerpt must be at least 10 characters')
    .max(500, 'Excerpt must be less than 500 characters')
    .optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  seo_keywords: z.array(z.string()).optional(),
  slug: z.string().optional(),
  cover_image: z.string().url().optional().or(z.literal('')),
  video_url: z.string().url().optional().or(z.literal('')),
  visibility: z.enum(['public', 'private', 'unlisted']).optional(),
  status: z.enum(['published', 'draft']).optional(),
});

// Comment validation schema
export const commentSchema = z.object({
  content: z.string()
    .trim()
    .min(1, 'Comment is required')
    .max(2000, 'Comment must be less than 2000 characters'),
  post_id: z.string().uuid(),
  parent_id: z.number().optional(),
});

// Auth validation schemas
export const emailSchema = z.string()
  .trim()
  .email('Invalid email address')
  .max(255, 'Email must be less than 255 characters');

export const passwordSchema = z.string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number');

export const authSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

// Search validation schema
export const searchSchema = z.object({
  query: z.string()
    .trim()
    .min(1, 'Search query is required')
    .max(200, 'Search query must be less than 200 characters'),
  filters: z.record(z.any()).optional(),
});

// Username validation
export const usernameSchema = z.string()
  .trim()
  .min(3, 'Username must be at least 3 characters')
  .max(30, 'Username must be less than 30 characters')
  .regex(/^[a-zA-Z0-9_-]+$/, 'Username can only contain letters, numbers, underscores, and hyphens');
