
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Post, PostCategory } from "@/types/blog";
import { toast } from "sonner";
import { AiPostGenerator } from "@/components/admin/AiPostGenerator";
import { AlertCircle, Image, Save, Send, Upload, X, FileText, Code } from "lucide-react";

interface PostFormProps {
  post?: Post;
  onSubmit: (post: Partial<Post>) => void;
}

export function PostForm({ post, onSubmit }: PostFormProps) {
  const navigate = useNavigate();
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const isEditing = !!post;
  
  const [title, setTitle] = useState(post?.title || "");
  const [content, setContent] = useState(post?.content || "");
  const [excerpt, setExcerpt] = useState(post?.excerpt || "");
  const [coverImage, setCoverImage] = useState(post?.coverImage || "");
  const [category, setCategory] = useState<PostCategory>(post?.category || "tech");
  const [author, setAuthor] = useState(post?.author || "");
  const [featured, setFeatured] = useState(post?.featured || false);
  const [video, setVideo] = useState(post?.video || "");
  const [isDraft, setIsDraft] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(post?.coverImage || null);
  const [activeTab, setActiveTab] = useState("content");
  
  const [errors, setErrors] = useState<{
    title?: string;
    content?: string;
    excerpt?: string;
    coverImage?: string;
    author?: string;
  }>({});

  const validate = () => {
    const newErrors: {
      title?: string;
      content?: string;
      excerpt?: string;
      coverImage?: string;
      author?: string;
    } = {};

    if (!title.trim()) newErrors.title = "Title is required";
    if (!content.trim()) newErrors.content = "Content is required";
    if (!excerpt.trim()) newErrors.excerpt = "Excerpt is required";
    if (!coverImage.trim()) newErrors.coverImage = "Cover image is required";
    if (!author.trim()) newErrors.author = "Author is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent, asDraft = false) => {
    e.preventDefault();
    
    if (!validate()) {
      toast.error("Please correct the errors below");
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
      formData.publishedAt = asDraft ? "" : new Date().toISOString();
    }
    
    onSubmit(formData);
    
    // Show appropriate toast message
    if (asDraft) {
      toast.success("Post saved as draft");
    } else {
      toast.success(isEditing ? "Post updated successfully" : "Post published successfully");
    }
  };
  
  const handleSaveAsDraft = (e: React.FormEvent) => {
    setIsDraft(true);
    handleSubmit(e, true);
  };
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, this would upload to a server and get a URL back
      // Here we'll create a local object URL for preview
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      setCoverImage(imageUrl);
      toast.success("Image uploaded successfully");
    }
  };
  
  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Similar to image upload, in a real app this would be uploaded to a server
      const videoUrl = URL.createObjectURL(file);
      setVideo(videoUrl);
      toast.success("Video uploaded successfully");
    }
  };
  
  const handleRemoveImage = () => {
    setCoverImage("");
    setPreviewImage(null);
    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  };
  
  const handleApplyAiContent = (aiContent: Partial<{ title: string; excerpt: string; content: string }>) => {
    if (aiContent.title) setTitle(aiContent.title);
    if (aiContent.excerpt) setExcerpt(aiContent.excerpt);
    if (aiContent.content) setContent(aiContent.content);
    setActiveTab("content");
  };
  
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid grid-cols-3 mb-6">
        <TabsTrigger value="content" className="flex items-center">
          <FileText className="h-4 w-4 mr-2" />
          Post Content
        </TabsTrigger>
        <TabsTrigger value="media" className="flex items-center">
          <Image className="h-4 w-4 mr-2" />
          Media
        </TabsTrigger>
        <TabsTrigger value="ai" className="flex items-center">
          <Code className="h-4 w-4 mr-2" />
          AI Generator
        </TabsTrigger>
      </TabsList>
      
      <form onSubmit={(e) => handleSubmit(e, isDraft)}>
        <TabsContent value="content" className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="title" className={errors.title ? "text-destructive" : ""}>
                Title {errors.title && <span className="text-xs">({errors.title})</span>}
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (errors.title) setErrors({ ...errors, title: undefined });
                }}
                placeholder="Enter post title"
                className={errors.title ? "border-destructive" : ""}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="author" className={errors.author ? "text-destructive" : ""}>
                  Author {errors.author && <span className="text-xs">({errors.author})</span>}
                </Label>
                <Input
                  id="author"
                  value={author}
                  onChange={(e) => {
                    setAuthor(e.target.value);
                    if (errors.author) setErrors({ ...errors, author: undefined });
                  }}
                  placeholder="Author name"
                  className={errors.author ? "border-destructive" : ""}
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
              <Label htmlFor="excerpt" className={errors.excerpt ? "text-destructive" : ""}>
                Excerpt {errors.excerpt && <span className="text-xs">({errors.excerpt})</span>}
              </Label>
              <Textarea
                id="excerpt"
                value={excerpt}
                onChange={(e) => {
                  setExcerpt(e.target.value);
                  if (errors.excerpt) setErrors({ ...errors, excerpt: undefined });
                }}
                placeholder="Brief summary of the post"
                rows={3}
                className={errors.excerpt ? "border-destructive" : ""}
              />
            </div>
            
            <div>
              <Label htmlFor="content" className={errors.content ? "text-destructive" : ""}>
                Content {errors.content && <span className="text-xs">({errors.content})</span>}
              </Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                  if (errors.content) setErrors({ ...errors, content: undefined });
                }}
                placeholder="Full content with HTML support"
                rows={15}
                className={errors.content ? "border-destructive" : ""}
              />
              <p className="text-xs text-muted-foreground mt-1">HTML formatting is supported</p>
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
        </TabsContent>
        
        <TabsContent value="media" className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="coverImage" className={errors.coverImage ? "text-destructive" : ""}>
                Cover Image {errors.coverImage && <span className="text-xs">({errors.coverImage})</span>}
              </Label>
              <div className="flex gap-2">
                <Input
                  id="coverImageUrl"
                  value={coverImage}
                  onChange={(e) => {
                    setCoverImage(e.target.value);
                    setPreviewImage(e.target.value);
                    if (errors.coverImage) setErrors({ ...errors, coverImage: undefined });
                  }}
                  placeholder="https://example.com/image.jpg"
                  className={`flex-1 ${errors.coverImage ? "border-destructive" : ""}`}
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => imageInputRef.current?.click()}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Browse
                </Button>
                <input
                  ref={imageInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </div>
            </div>
            
            {previewImage && (
              <div className="relative">
                <img 
                  src={previewImage} 
                  alt="Cover preview" 
                  className="w-full h-48 object-cover rounded-md" 
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8"
                  onClick={handleRemoveImage}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
            
            <div>
              <Label htmlFor="video">Video URL (optional)</Label>
              <div className="flex gap-2">
                <Input
                  id="video"
                  value={video}
                  onChange={(e) => setVideo(e.target.value)}
                  placeholder="https://example.com/video.mp4"
                  className="flex-1"
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => videoInputRef.current?.click()}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Browse
                </Button>
                <input
                  ref={videoInputRef}
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={handleVideoUpload}
                />
              </div>
            </div>
            
            {video && video.startsWith("blob:") && (
              <div>
                <video controls className="w-full rounded-md">
                  <source src={video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="ai" className="space-y-6">
          <AiPostGenerator onApply={handleApplyAiContent} />
        </TabsContent>
        
        <div className="flex flex-wrap items-center gap-3 mt-6 border-t pt-6">
          <Button 
            type="submit" 
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Send className="h-4 w-4 mr-2" />
            {isEditing ? "Update Post" : "Publish Post"}
          </Button>
          
          <Button
            type="button"
            variant="outline"
            onClick={handleSaveAsDraft}
            className="border-green-600/30 text-green-600 hover:bg-green-600 hover:text-white"
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
      </form>
    </Tabs>
  );
}
