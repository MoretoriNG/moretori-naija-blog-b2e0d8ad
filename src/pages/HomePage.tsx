
import { HeroSlider } from "@/components/blog/HeroSlider";
import { FeaturedPosts } from "@/components/blog/FeaturedPosts";
import { CategoryPosts } from "@/components/blog/CategoryPosts";
import { getFeaturedPosts, getRecentPosts } from "@/lib/blog-data";

export default function HomePage() {
  const sliderPosts = getRecentPosts(3);
  const featuredPosts = getFeaturedPosts();
  
  return (
    <>
      <HeroSlider posts={sliderPosts} />
      <FeaturedPosts posts={featuredPosts} />
      <CategoryPosts initialCategory="tech" />
    </>
  );
}
