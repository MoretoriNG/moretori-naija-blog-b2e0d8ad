
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Post } from "@/types/blog";
import { FileText, Image, Code } from "lucide-react";
import { AiPostGenerator } from "@/components/admin/AiPostGenerator";
import { PostFormContent } from "./post-form/PostFormContent";
import { MediaUpload } from "./post-form/MediaUpload";
import { PostFormActions } from "./post-form/PostFormActions";
import { usePostForm } from "@/hooks/usePostForm";
import { usePostSubmission } from "@/hooks/usePostSubmission";

interface PostFormProps {
  post?: Post;
  onSubmit: (post: Partial<Post>) => void;
}

export function PostForm({ post, onSubmit }: PostFormProps) {
  const formState = usePostForm(post);
  const submission = usePostSubmission(post, onSubmit, formState.validate, formState.getFormData);
  return (
    <Tabs value={formState.activeTab} onValueChange={formState.setActiveTab} className="w-full">
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
      
      <form onSubmit={submission.handleSubmit}>
        <TabsContent value="content" className="space-y-6">
          <PostFormContent
            title={formState.title}
            setTitle={formState.setTitle}
            author={formState.author}
            setAuthor={formState.setAuthor}
            category={formState.category}
            setCategory={formState.setCategory}
            excerpt={formState.excerpt}
            setExcerpt={formState.setExcerpt}
            tags={formState.tags}
            setTags={formState.setTags}
            content={formState.content}
            setContent={formState.setContent}
            featured={formState.featured}
            setFeatured={formState.setFeatured}
            errors={formState.errors}
            setErrors={formState.setErrors}
          />
        </TabsContent>
        
        <TabsContent value="media" className="space-y-6">
          <MediaUpload
            coverImage={formState.coverImage}
            setCoverImage={formState.setCoverImage}
            previewImage={formState.previewImage}
            setPreviewImage={formState.setPreviewImage}
            video={formState.video}
            setVideo={formState.setVideo}
            errors={formState.errors}
            setErrors={formState.setErrors}
          />
        </TabsContent>
        
        <TabsContent value="ai" className="space-y-6">
          <AiPostGenerator onApply={formState.handleApplyAiContent} />
        </TabsContent>
        
        <PostFormActions
          loading={submission.loading}
          isEditing={submission.isEditing}
          onSaveAsDraft={submission.handleSaveAsDraft}
        />
      </form>
    </Tabs>
  );
}
