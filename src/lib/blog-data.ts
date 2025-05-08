
// This file now re-exports from the new modular structure
// This maintains backward compatibility with existing imports

import { getCategoryBySlug, getCategoryById } from './blog/categories';
import { getPostsByCategory } from './blog/posts';
export * from './blog';

// Add this new function to get recent posts by category
export const getRecentPostsByCategory = (categorySlug: string, limit = 6) => {
  // Convert category slug to id
  const category = getCategoryBySlug(categorySlug);
  if (!category) return [];
  
  // Get all posts for this category
  const posts = getPostsByCategory(categorySlug);
  
  // Sort by published date (most recent first)
  const sortedPosts = [...posts].sort((a, b) => {
    const dateA = new Date(a.published_at).getTime();
    const dateB = new Date(b.published_at).getTime();
    return dateB - dateA;
  });
  
  // Return limited number of posts
  return sortedPosts.slice(0, limit);
};

// Add category color utility function
export const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    tech: "bg-blue-100 text-blue-800",
    auto: "bg-gray-100 text-gray-800",
    health: "bg-green-100 text-green-800",
    entertainment: "bg-purple-100 text-purple-800",
    news: "bg-red-100 text-red-800",
    business: "bg-amber-100 text-amber-800",
    sports: "bg-emerald-100 text-emerald-800",
    lifestyle: "bg-pink-100 text-pink-800"
  };
  
  return colors[category] || "bg-gray-100 text-gray-800";
};
