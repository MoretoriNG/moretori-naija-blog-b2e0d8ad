
export type PostCategory = 'tech' | 'auto' | 'health' | 'ent' | 'news' | 'bus' | 'sports' | 'lifestyle';

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  image_url?: string; // Support both formats
  category?: PostCategory;
  category_id?: number; // Support both formats
  author: string;
  publishedAt?: string;
  published_at?: string; // Support both formats
  featured?: boolean;
  video?: string;
  videoUrl?: string; // Enhanced video support
  tags?: string[];
  // Advanced features
  seoKeywords?: string[];
  metaTitle?: string;
  metaDescription?: string;
  readingTime?: string;
  isFeatured?: boolean;
  visibility?: 'public' | 'private' | 'scheduled';
  scheduledAt?: string;
  likesCount?: number;
  commentsCount?: number;
  sharesCount?: number;
}
