
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { PostCategory } from "@/types/blog";

interface PostFormContentProps {
  title: string;
  setTitle: (title: string) => void;
  author: string;
  setAuthor: (author: string) => void;
  category: PostCategory;
  setCategory: (category: PostCategory) => void;
  excerpt: string;
  setExcerpt: (excerpt: string) => void;
  tags: string;
  setTags: (tags: string) => void;
  content: string;
  setContent: (content: string) => void;
  featured: boolean;
  setFeatured: (featured: boolean) => void;
  errors: any;
  setErrors: (errors: any) => void;
}

const PREDEFINED_CATEGORIES = [
  { name: 'Tech', slug: 'tech' },
  { name: 'Auto', slug: 'auto' },
  { name: 'Health', slug: 'health' },
  { name: 'Entertainment', slug: 'ent' },
  { name: 'Business', slug: 'bus' },
  { name: 'Sports', slug: 'sports' },
  { name: 'Lifestyle', slug: 'lifestyle' },
];

export function PostFormContent({
  title, setTitle, author, setAuthor, category, setCategory,
  excerpt, setExcerpt, tags, setTags, content, setContent,
  featured, setFeatured, errors, setErrors
}: PostFormContentProps) {
  return (
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
      
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
        <div>
          <Label htmlFor="category">Category</Label>
          <Select value={category} onValueChange={(value) => setCategory(value as PostCategory)}>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {PREDEFINED_CATEGORIES.map((cat) => (
                <SelectItem key={cat.slug} value={cat.slug}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="bg-muted/50 p-3 rounded-lg">
        <p className="text-sm text-muted-foreground">
          <strong>Note:</strong> The author will be automatically set to your profile when the post is created.
        </p>
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
        <Label htmlFor="tags">Tags (comma-separated)</Label>
        <Input
          id="tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="tech, review, cars, etc."
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
  );
}
