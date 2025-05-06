
import { PostCategory } from "@/types/blog";

export interface Category {
  id: number;
  name: string;
  slug: PostCategory | string;
  description: string;
}
