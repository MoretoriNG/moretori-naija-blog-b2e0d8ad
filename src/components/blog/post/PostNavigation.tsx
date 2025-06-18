
import { Link } from "react-router-dom";
import { getCategoryById } from "@/lib/blog-data";

interface PostNavigationProps {
  postTitle: string;
  categoryId: number;
}

export function PostNavigation({ postTitle, categoryId }: PostNavigationProps) {
  const category = getCategoryById(categoryId);
  
  return (
    <div className="text-sm text-muted-foreground mb-8">
      <Link to="/" className="hover:text-blue-500">Home</Link>
      {category && (
        <>
          <span className="mx-2">/</span>
          <Link to={`/category/${category.slug}`} className="hover:text-blue-500">
            {category.name}
          </Link>
        </>
      )}
      <span className="mx-2">/</span>
      <span className="text-foreground">{postTitle}</span>
    </div>
  );
}
