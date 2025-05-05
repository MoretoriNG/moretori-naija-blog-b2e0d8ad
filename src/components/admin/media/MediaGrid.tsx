
import { MediaItem } from "@/types/media";
import { MediaItemComponent } from "./MediaItem";

interface MediaGridProps {
  items: MediaItem[];
  onDelete: (id: string) => void;
  formatDate: (date: string) => string;
}

export function MediaGrid({ items, onDelete, formatDate }: MediaGridProps) {
  if (items.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No media found. Upload some files to get started.
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {items.map((item) => (
        <MediaItemComponent 
          key={item.id} 
          item={item} 
          onDelete={onDelete} 
          formatDate={formatDate} 
        />
      ))}
    </div>
  );
}
