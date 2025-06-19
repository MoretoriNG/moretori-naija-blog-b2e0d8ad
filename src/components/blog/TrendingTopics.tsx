
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { TrendingUp } from "lucide-react";

export function TrendingTopics() {
  const trendingTopics = [
    { name: "Politics", slug: "politics" },
    { name: "Music", slug: "music" },
    { name: "Fashion", slug: "fashion" },
    { name: "Sports", slug: "sports" },
    { name: "Afrobeats", slug: "afrobeats" },
    { name: "Nollywood", slug: "nollywood" }
  ];

  return (
    <section className="py-3 border-y border-border/30 bg-muted/20">
      <div className="container">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="flex items-center gap-1 font-medium text-sm text-foreground/70 whitespace-nowrap">
            <TrendingUp className="h-3 w-3 text-orange-500" /> Trending:
          </span>
          
          <div className="flex flex-wrap gap-1">
            {trendingTopics.map((topic) => (
              <Link key={topic.slug} to={`/category/${topic.slug}`}>
                <Badge variant="outline" className="bg-background/50 hover:bg-background text-xs py-0.5 px-2">
                  {topic.name}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
