
import { Trash2, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MediaItem } from "@/types/media";

interface MediaItemProps {
  item: MediaItem;
  onDelete: (id: string) => void;
  formatDate: (date: string) => string;
}

export function MediaItemComponent({ item, onDelete, formatDate }: MediaItemProps) {
  return (
    <div className="group relative bg-muted rounded-md overflow-hidden border">
      {item.type === "image" ? (
        <img
          src={item.url}
          alt={item.name}
          className="w-full h-32 object-cover"
        />
      ) : (
        <div className="w-full h-32 bg-black flex items-center justify-center">
          <Video className="h-8 w-8 text-gray-500" />
        </div>
      )}
      
      <div className="p-2">
        <p className="text-xs truncate font-medium">{item.name}</p>
        <p className="text-xs text-muted-foreground">{formatDate(item.uploadedAt)}</p>
      </div>
      
      <Button
        variant="destructive"
        size="icon"
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-7 w-7"
        onClick={() => onDelete(item.id)}
      >
        <Trash2 className="h-3 w-3" />
      </Button>
    </div>
  );
}
