
import { HeroSlider } from "@/components/blog/HeroSlider";
import { FeaturedPosts } from "@/components/blog/FeaturedPosts";
import { CategoryPosts } from "@/components/blog/CategoryPosts";
import { getFeaturedPosts, getAllPosts, getRecentPosts } from "@/lib/blog-data";

export default function HomePage() {
  const sliderPosts = getRecentPosts(3);
  const featuredPosts = getFeaturedPosts();
  const allPosts = getAllPosts().slice(0, 12); // Get 12 posts for the featured carousel
  
  return (
    <>
      <HeroSlider posts={sliderPosts} />
      <FeaturedPosts posts={allPosts} />
      <CategoryPosts initialCategory="tech" />
    </>
  );
}
