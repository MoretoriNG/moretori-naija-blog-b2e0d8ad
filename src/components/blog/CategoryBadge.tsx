
import { Link } from "react-router-dom";
import { PostCategory } from "@/types/blog";
import { getCategoryColor } from "@/lib/blog-data";

interface CategoryBadgeProps {
  category: PostCategory;
}

export function CategoryBadge({ category }: CategoryBadgeProps) {
  return (
    <Link
      to={`/category/${category}`}
      className={`category-badge inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getCategoryColor(category)}`}
    >
      {category.charAt(0).toUpperCase() + category.slice(1)}
    </Link>
  );
}

export default CategoryBadge;
