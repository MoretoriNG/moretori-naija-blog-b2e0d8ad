
export type PostCategory = 'tech' | 'auto' | 'health' | 'entertainment' | 'news';

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: PostCategory;
  author: string;
  publishedAt: string;
  featured?: boolean;
  video?: string;
}
