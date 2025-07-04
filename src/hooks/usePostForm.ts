import { useState } from "react";
import { Post, PostCategory } from "@/types/blog";

export function usePostForm(post?: Post) {
  const [title, setTitle] = useState(post?.title || "");
  const [content, setContent] = useState(post?.content || "");
  const [excerpt, setExcerpt] = useState(post?.excerpt || "");
  const [coverImage, setCoverImage] = useState(post?.coverImage || "");
  const [category, setCategory] = useState<PostCategory>(post?.category || "tech");
  const [author, setAuthor] = useState(post?.author || "");
  const [featured, setFeatured] = useState(post?.featured || false);
  const [video, setVideo] = useState(post?.video || "");
  const [tags, setTags] = useState(post?.tags?.join(', ') || "");
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

  const getFormData = (): Partial<Post> => {
    const slug = title
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-');
    
    return {
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
  };

  const handleApplyAiContent = (aiContent: Partial<{ title: string; excerpt: string; content: string }>) => {
    if (aiContent.title) setTitle(aiContent.title);
    if (aiContent.excerpt) setExcerpt(aiContent.excerpt);
    if (aiContent.content) setContent(aiContent.content);
    setActiveTab("content");
  };

  return {
    // Form state
    title, setTitle,
    content, setContent,
    excerpt, setExcerpt,
    coverImage, setCoverImage,
    category, setCategory,
    author, setAuthor,
    featured, setFeatured,
    video, setVideo,
    tags, setTags,
    previewImage, setPreviewImage,
    activeTab, setActiveTab,
    errors, setErrors,
    
    // Form actions
    validate,
    getFormData,
    handleApplyAiContent,
  };
}