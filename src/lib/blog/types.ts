
export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
}

export interface Post {
  id: string | number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  image_url?: string;
  category?: string;
  category_id?: number;
  author: string;
  publishedAt?: string;
  published_at?: string;
  featured?: boolean;
  video?: string;
  tags?: string[];
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image_url: string;
  category_id: number;
  author: string;
  published_at: string;
  featured: boolean;
  video?: string;
  tags?: string[];
}
