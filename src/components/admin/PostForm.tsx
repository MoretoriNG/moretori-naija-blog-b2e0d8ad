
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Post, PostCategory } from "@/types/blog";
import { toast } from "sonner";
import { Save, Send, FileText, Image, Code } from "lucide-react";
import { supabasePosts } from "@/lib/supabase/posts";
import { AiPostGenerator } from "@/components/admin/AiPostGenerator";
import { PostFormContent } from "./post-form/PostFormContent";
import { MediaUpload } from "./post-form/MediaUpload";

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
  const [tags, setTags] = useState(post?.tags?.join(', ') || "");
  const [isDraft, setIsDraft] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(post?.coverImage || null);
  const [activeTab, setActiveTab] = useState("content");
  const [loading, setLoading] = useState(false);
  
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

  const handleSubmit = async (e: React.FormEvent, asDraft = false) => {
    e.preventDefault();
    
    if (!validate()) {
      toast.error("Please correct the errors below");
      return;
    }
    
    setLoading(true);
    
    try {
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
        tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        ...(video && { video }),
      };
      
      if (!isEditing) {
        formData.publishedAt = asDraft ? "" : new Date().toISOString();
      }
      
      if (isEditing && post) {
        await supabasePosts.updatePost(String(post.id), formData);
      } else {
        await supabasePosts.createPost(formData as Omit<Post, 'id' | 'created_at' | 'updated_at'>);
      }
      
      onSubmit(formData);
      
      if (asDraft) {
        toast.success("Post saved as draft");
      } else {
        toast.success(isEditing ? "Post updated successfully" : "Post published successfully");
      }
      
      navigate("/admin");
    } catch (error) {
      console.error('Error saving post:', error);
      toast.error("Failed to save post");
    } finally {
      setLoading(false);
    }
  };
  
  const handleSaveAsDraft = (e: React.FormEvent) => {
    setIsDraft(true);
    handleSubmit(e, true);
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
          <PostFormContent
            title={title}
            setTitle={setTitle}
            author={author}
            setAuthor={setAuthor}
            category={category}
            setCategory={setCategory}
            excerpt={excerpt}
            setExcerpt={setExcerpt}
            tags={tags}
            setTags={setTags}
            content={content}
            setContent={setContent}
            featured={featured}
            setFeatured={setFeatured}
            errors={errors}
            setErrors={setErrors}
          />
        </TabsContent>
        
        <TabsContent value="media" className="space-y-6">
          <MediaUpload
            coverImage={coverImage}
            setCoverImage={setCoverImage}
            previewImage={previewImage}
            setPreviewImage={setPreviewImage}
            video={video}
            setVideo={setVideo}
            errors={errors}
            setErrors={setErrors}
          />
        </TabsContent>
        
        <TabsContent value="ai" className="space-y-6">
          <AiPostGenerator onApply={handleApplyAiContent} />
        </TabsContent>
        
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
            onClick={handleSaveAsDraft}
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
      </form>
    </Tabs>
  );
}
