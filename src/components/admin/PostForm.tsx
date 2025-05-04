
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Post, PostCategory } from "@/types/blog";
import { toast } from "sonner";

interface PostFormProps {
  post?: Post;
  onSubmit: (post: Partial<Post>) => void;
}

export function PostForm({ post, onSubmit }: PostFormProps) {
  const navigate = useNavigate();
  const isEditing = !!post;
  
  const [title, setTitle] = useState(post?.title || "");
  const [content, setContent] = useState(post?.content || "");
  const [excerpt, setExcerpt] = useState(post?.excerpt || "");
  const [coverImage, setCoverImage] = useState(post?.coverImage || "");
  const [category, setCategory] = useState<PostCategory>(post?.category || "tech");
  const [author, setAuthor] = useState(post?.author || "");
  const [featured, setFeatured] = useState(post?.featured || false);
  const [video, setVideo] = useState(post?.video || "");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !content || !excerpt || !coverImage || !author) {
      toast.error("Please fill out all required fields");
      return;
    }
    
    const slug = title
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-');
    
    const formData: Partial<Post> = {
      title,
      slug,
      content,
      excerpt,
      coverImage,
      category,
      author,
      featured,
      ...(video && { video }),
    };
    
    if (!isEditing) {
      formData.publishedAt = new Date().toISOString();
    }
    
    onSubmit(formData);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title"
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="coverImage">Cover Image URL</Label>
            <Input
              id="coverImage"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              placeholder="https://example.com/image.jpg"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={(value) => setCategory(value as PostCategory)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tech">Tech</SelectItem>
                <SelectItem value="auto">Auto</SelectItem>
                <SelectItem value="health">Health</SelectItem>
                <SelectItem value="entertainment">Entertainment</SelectItem>
                <SelectItem value="news">News</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div>
          <Label htmlFor="author">Author</Label>
          <Input
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Author name"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="excerpt">Excerpt</Label>
          <Textarea
            id="excerpt"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Brief summary of the post"
            rows={3}
            required
          />
        </div>
        
        <div>
          <Label htmlFor="content">Content</Label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Full content with HTML support"
            rows={15}
            required
          />
        </div>
        
        <div>
          <Label htmlFor="video">Video URL (optional)</Label>
          <Input
            id="video"
            value={video}
            onChange={(e) => setVideo(e.target.value)}
            placeholder="https://example.com/video.mp4"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch
            id="featured"
            checked={featured}
            onCheckedChange={setFeatured}
          />
          <Label htmlFor="featured">Featured Post</Label>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Button type="submit">
          {isEditing ? "Update Post" : "Create Post"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate("/admin")}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
