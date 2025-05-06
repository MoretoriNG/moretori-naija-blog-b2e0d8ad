
import { PostCategory } from "@/types/blog";
import { Category } from "./types";

// Categories data
export const categories: Category[] = [
  { id: 1, name: 'Technology', slug: 'tech', description: 'Latest in tech and innovation' },
  { id: 2, name: 'Health', slug: 'health', description: 'Wellness and medical insights' },
  { id: 3, name: 'Entertainment', slug: 'entertainment', description: 'Movies, music, and celebrity news' },
  { id: 4, name: 'Business', slug: 'business', description: 'Finance, entrepreneurship, and market trends' },
  { id: 5, name: 'Sports', slug: 'sports', description: 'Latest in sports news and events' },
  { id: 6, name: 'Lifestyle', slug: 'lifestyle', description: 'Fashion, food, travel, and personal development' },
];

// Category helper functions
export const getCategoryBySlug = (slug: string): Category | undefined => {
  return categories.find(category => category.slug === slug);
};

export const getCategoryById = (id: number): Category | undefined => {
  return categories.find(category => category.id === id);
};

// Helper function to get category color
export const getCategoryColor = (category: PostCategory | string): string => {
  const categoryMap: Record<string, string> = {
    tech: 'bg-cyan-100 text-cyan-800',
    health: 'bg-green-100 text-green-800',
    entertainment: 'bg-purple-100 text-purple-800',
    business: 'bg-blue-100 text-blue-800',
    sports: 'bg-orange-100 text-orange-800',
    lifestyle: 'bg-pink-100 text-pink-800',
    news: 'bg-yellow-100 text-yellow-800',
    auto: 'bg-red-100 text-red-800'
  };
  
  return categoryMap[category as string] || 'bg-gray-100 text-gray-800';
};
