
// This file now re-exports from the new modular structure
// This maintains backward compatibility with existing imports

import { getCategoryBySlug, getPostsByCategory, getCategoryById } from './blog/categories';
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
