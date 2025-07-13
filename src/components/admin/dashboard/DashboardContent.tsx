import { Post } from "@/types/blog";
import { Card, CardContent } from "@/components/ui/card";
import { PostList } from "@/components/admin/PostList";

interface DashboardContentProps {
  posts: Post[];
  onDelete: (id: string) => void;
  onBulkDelete: (ids: string[]) => void;
  onRefresh: () => void;
}

export function DashboardContent({ posts, onDelete, onBulkDelete, onRefresh }: DashboardContentProps) {
  return (
    <Card className="shadow-sm">
      <CardContent className="p-6">
        <PostList 
          posts={posts} 
          onDelete={onDelete}
          onBulkDelete={onBulkDelete}
          onRefresh={onRefresh}
        />
      </CardContent>
    </Card>
  );
}