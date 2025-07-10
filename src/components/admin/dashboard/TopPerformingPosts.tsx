
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp } from "lucide-react";
import { Post } from "@/types/blog";

interface TopPerformingPostsProps {
  posts: Post[];
}

export function TopPerformingPosts({ posts }: TopPerformingPostsProps) {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-green-500" />
          Top Performing Posts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {posts.slice(0, 5).map((post, index) => (
            <div key={post.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-full text-sm font-bold">
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">{post.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="text-xs px-2 py-0.5">
                    {post.category}
                  </Badge>
                  {post.featured && (
                    <Badge className="text-xs px-2 py-0.5 bg-yellow-500 hover:bg-yellow-600">
                      Featured
                    </Badge>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-green-600">1.2K views</p>
                <p className="text-xs text-muted-foreground">+12%</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
