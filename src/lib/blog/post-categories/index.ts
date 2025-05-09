
import { autoPosts } from './auto-posts';
import { businessPosts } from './business-posts';
import { entertainmentPosts } from './entertainment-posts';
import { healthPosts } from './health-posts';
import { lifestylePosts } from './lifestyle-posts';
import { newsPosts } from './news-posts';
import { sportsPosts } from './sports-posts';
import { techPosts } from './tech-posts';
import { Post } from '@/types/blog';

// Re-export types for easier access
export type { Post };

export {
  autoPosts,
  businessPosts,
  entertainmentPosts,
  healthPosts,
  lifestylePosts,
  newsPosts,
  sportsPosts,
  techPosts
};
