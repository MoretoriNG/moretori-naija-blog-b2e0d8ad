
import { Search, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface MediaToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  onUploadClick: () => void;
}

export function MediaToolbar({ search, onSearchChange, onUploadClick }: MediaToolbarProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
      <div className="relative w-full sm:w-64 md:w-80">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search media..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-8"
        />
      </div>
      
      <div className="flex gap-2">
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={onUploadClick}>
          <Upload className="h-4 w-4 mr-2" />
          Upload
        </Button>
      </div>
    </div>
  );
}
