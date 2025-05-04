
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Fire, Zap } from "lucide-react";

export function TrendingTopics() {
  const trendingTopics = [
    { name: "Politics", slug: "politics", icon: <TrendingUp className="h-3 w-3" /> },
    { name: "Music", slug: "music", icon: <Fire className="h-3 w-3" /> },
    { name: "Fashion", slug: "fashion", icon: <Zap className="h-3 w-3" /> },
    { name: "Sports", slug: "sports", icon: <Fire className="h-3 w-3" /> },
    { name: "Afrobeats", slug: "afrobeats", icon: <TrendingUp className="h-3 w-3" /> },
    { name: "Nollywood", slug: "nollywood", icon: <Zap className="h-3 w-3" /> }
  ];

  return (
    <section className="py-4 border-y border-border/50 bg-muted/30 backdrop-blur-sm">
      <div className="container">
        <div className="flex items-center gap-3 overflow-x-auto py-2 scrollbar-none">
          <span className="flex items-center gap-1 font-medium text-sm text-foreground/70 whitespace-nowrap">
            <TrendingUp className="h-4 w-4 text-vibehub-purple" /> Trending:
          </span>
          
          {trendingTopics.map((topic) => (
            <Link key={topic.slug} to={`/category/${topic.slug}`}>
              <Badge variant="outline" className="bg-background/60 hover:bg-background flex items-center gap-1 py-1.5">
                {topic.icon}
                <span>{topic.name}</span>
              </Badge>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
