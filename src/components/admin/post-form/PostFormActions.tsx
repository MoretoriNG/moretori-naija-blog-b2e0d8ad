import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Save, Send } from "lucide-react";

interface PostFormActionsProps {
  loading: boolean;
  isEditing: boolean;
  onSaveAsDraft: (e: React.FormEvent) => void;
}

export function PostFormActions({ loading, isEditing, onSaveAsDraft }: PostFormActionsProps) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-wrap items-center gap-3 mt-6 border-t pt-6">
      <Button 
        type="submit" 
        className="bg-blue-600 hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? (
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
        ) : (
          <Send className="h-4 w-4 mr-2" />
        )}
        {isEditing ? "Update Post" : "Publish Post"}
      </Button>
      
      <Button
        type="button"
        variant="outline"
        onClick={onSaveAsDraft}
        className="border-green-600/30 text-green-600 hover:bg-green-600 hover:text-white"
        disabled={loading}
      >
        <Save className="h-4 w-4 mr-2" />
        Save as Draft
      </Button>
      
      <Button
        type="button"
        variant="ghost"
        onClick={() => navigate("/admin")}
        className="ml-auto sm:ml-0"
      >
        Cancel
      </Button>
    </div>
  );
}