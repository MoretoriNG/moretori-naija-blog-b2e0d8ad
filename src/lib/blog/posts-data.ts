
import { Post, PostCategory } from "@/types/blog";
import { 
  techPosts, 
  healthPosts,
  entertainmentPosts,
  businessPosts,
  sportsPosts,
  lifestylePosts
} from './post-categories';

// Combine all post categories into a single array
export const posts = [
  ...techPosts,
  ...healthPosts,
  ...entertainmentPosts,
  ...businessPosts,
  ...sportsPosts,
  ...lifestylePosts
];

