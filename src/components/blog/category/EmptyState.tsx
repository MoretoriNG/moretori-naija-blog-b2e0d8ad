
import { Hash } from "lucide-react";
import { PostCategory } from "@/types/blog";

interface EmptyStateProps {
  category: PostCategory;
}

export function EmptyState({ category }: EmptyStateProps) {
  return (
    <div className="col-span-full py-16 text-center">
      <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center bg-muted mb-4">
        <Hash className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold mb-2">No recent posts found</h3>
      <p className="text-muted-foreground max-w-md mx-auto text-sm">
        We couldn't find any recent posts in the {category} category. Check back later for updates.
      </p>
    </div>
  );
}
