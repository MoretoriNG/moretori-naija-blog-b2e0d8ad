
import { Post } from "@/types/blog";

interface HeroDotsProps {
  posts: Post[];
  activeIndex: number;
  onDotClick: (index: number) => void;
}

export const HeroDots = ({ posts, activeIndex, onDotClick }: HeroDotsProps) => {
  return (
    <div className="absolute z-20 bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
      {posts.map((_, i) => (
        <button
          key={i}
          className={`h-2 transition-all duration-300 ${
            i === activeIndex ? "w-8 bg-blue-500" : "w-2 bg-white/50 hover:bg-white/70"
          } rounded-full`}
          onClick={() => onDotClick(i)}
        />
      ))}
    </div>
  );
};
