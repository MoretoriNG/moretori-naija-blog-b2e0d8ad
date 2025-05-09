
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Comment {
  id: number;
  author: string;
  text: string;
  date: Date;
}

interface PostCommentsProps {
  comments: Comment[];
  showCommentForm: boolean;
  onAddComment: (text: string) => void;
  onShowCommentForm: () => void;
  onHideCommentForm: () => void;
}

export function PostComments({
  comments,
  showCommentForm,
  onAddComment,
  onShowCommentForm,
  onHideCommentForm
}: PostCommentsProps) {
  const [newComment, setNewComment] = useState('');

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment('');
    }
  };

  return (
    <div className="mb-12">
      <h3 className="text-xl font-bold mb-6">Comments ({comments.length})</h3>
      
      {showCommentForm && (
        <div className="bg-white p-6 rounded-lg border mb-6">
          <form onSubmit={handleSubmitComment}>
            <label htmlFor="comment" className="block mb-2 font-medium">
              Leave a comment
            </label>
            <textarea 
              id="comment"
              className="w-full border rounded-md p-3 min-h-32 mb-3"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your thoughts..."
              required
            />
            <div className="flex justify-end gap-2">
              <Button 
                type="button" 
                variant="ghost" 
                onClick={onHideCommentForm}
              >
                Cancel
              </Button>
              <Button type="submit">Post Comment</Button>
            </div>
          </form>
        </div>
      )}
      
      {comments.length > 0 ? (
        <div className="space-y-4">
          {comments.map(comment => (
            <div key={comment.id} className="bg-white p-4 rounded-lg border">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    {comment.author[0]}
                  </div>
                  <span className="font-medium">{comment.author}</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {formatDistanceToNow(comment.date, { addSuffix: true })}
                </span>
              </div>
              <p className="text-sm">{comment.text}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-muted-foreground">Be the first to comment</p>
        </div>
      )}
      
      {!showCommentForm && comments.length > 0 && (
        <Button 
          variant="outline" 
          className="w-full mt-4"
          onClick={onShowCommentForm}
        >
          Add Your Comment
        </Button>
      )}
    </div>
  );
}
