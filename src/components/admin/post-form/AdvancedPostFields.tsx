import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface AdvancedPostFieldsProps {
  metaTitle: string;
  setMetaTitle: (value: string) => void;
  metaDescription: string;
  setMetaDescription: (value: string) => void;
  seoKeywords: string[];
  setSeoKeywords: (keywords: string[]) => void;
  videoUrl: string;
  setVideoUrl: (url: string) => void;
  visibility: 'public' | 'private' | 'scheduled';
  setVisibility: (visibility: 'public' | 'private' | 'scheduled') => void;
  scheduledAt: string;
  setScheduledAt: (date: string) => void;
  isFeatured: boolean;
  setIsFeatured: (featured: boolean) => void;
}

export function AdvancedPostFields({
  metaTitle, setMetaTitle, metaDescription, setMetaDescription,
  seoKeywords, setSeoKeywords, videoUrl, setVideoUrl,
  visibility, setVisibility, scheduledAt, setScheduledAt,
  isFeatured, setIsFeatured
}: AdvancedPostFieldsProps) {
  const [newKeyword, setNewKeyword] = useState("");

  const addKeyword = () => {
    if (newKeyword.trim() && !seoKeywords.includes(newKeyword.trim())) {
      setSeoKeywords([...seoKeywords, newKeyword.trim()]);
      setNewKeyword("");
    }
  };

  const removeKeyword = (keyword: string) => {
    setSeoKeywords(seoKeywords.filter(k => k !== keyword));
  };

  return (
    <div className="space-y-6">
      {/* SEO Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">SEO Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="metaTitle">Meta Title</Label>
            <Input
              id="metaTitle"
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              placeholder="SEO optimized title (60 chars max)"
              maxLength={60}
            />
            <p className="text-xs text-muted-foreground mt-1">
              {metaTitle.length}/60 characters
            </p>
          </div>

          <div>
            <Label htmlFor="metaDescription">Meta Description</Label>
            <Textarea
              id="metaDescription"
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              placeholder="SEO description (160 chars max)"
              rows={3}
              maxLength={160}
            />
            <p className="text-xs text-muted-foreground mt-1">
              {metaDescription.length}/160 characters
            </p>
          </div>

          <div>
            <Label>SEO Keywords</Label>
            <div className="flex gap-2 mt-2">
              <Input
                value={newKeyword}
                onChange={(e) => setNewKeyword(e.target.value)}
                placeholder="Add keyword"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addKeyword())}
              />
              <Button type="button" onClick={addKeyword} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {seoKeywords.map((keyword, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {keyword}
                  <button
                    type="button"
                    onClick={() => removeKeyword(keyword)}
                    className="hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Media Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Media Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="videoUrl">Video URL (Optional)</Label>
            <Input
              id="videoUrl"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="https://youtube.com/watch?v=... or https://vimeo.com/..."
            />
            <p className="text-xs text-muted-foreground mt-1">
              Supports YouTube, Vimeo, and direct video links
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Publishing Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Publishing Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="featured"
              checked={isFeatured}
              onCheckedChange={setIsFeatured}
            />
            <Label htmlFor="featured">Featured Post</Label>
          </div>

          <div>
            <Label htmlFor="visibility">Visibility</Label>
            <Select value={visibility} onValueChange={(value: 'public' | 'private' | 'scheduled') => setVisibility(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select visibility" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">Public</SelectItem>
                <SelectItem value="private">Private</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {visibility === 'scheduled' && (
            <div>
              <Label htmlFor="scheduledAt">Schedule Date & Time</Label>
              <Input
                id="scheduledAt"
                type="datetime-local"
                value={scheduledAt}
                onChange={(e) => setScheduledAt(e.target.value)}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}