
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Code, Save } from "lucide-react";
import { toast } from "sonner";
import { PostCategory } from "@/types/blog";

interface AiPostGeneratorProps {
  onApply: (content: Partial<{ title: string; excerpt: string; content: string }>) => void;
}

export function AiPostGenerator({ onApply }: AiPostGeneratorProps) {
  const [topic, setTopic] = useState("");
  const [category, setCategory] = useState<PostCategory>("tech");
  const [tone, setTone] = useState("informative");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    title?: string;
    excerpt?: string;
    content?: string;
  } | null>(null);

  const generatePost = async () => {
    if (!topic) {
      toast.error("Please enter a topic");
      return;
    }

    setLoading(true);
    
    // Simulating AI generation - in a real app, this would call an AI API
    setTimeout(() => {
      // Generate demo content based on the topic and category
      const aiGeneratedTitle = `The Ultimate Guide to ${topic} in ${category.charAt(0).toUpperCase() + category.slice(1)}`;
      
      const aiGeneratedExcerpt = `Discover the latest trends and insights about ${topic} in the ${category} industry. This comprehensive guide covers everything you need to know.`;
      
      const aiGeneratedContent = `
<h2>Introduction to ${topic}</h2>
<p>The world of ${category} is constantly evolving, and staying updated with the latest developments in ${topic} is crucial for professionals and enthusiasts alike.</p>

<h2>Why ${topic} Matters</h2>
<p>${topic} has become increasingly important in recent years due to technological advancements and changing consumer preferences. Companies that fail to adapt to these changes risk falling behind their competitors.</p>

<h2>Key Trends in ${topic}</h2>
<ul>
  <li><strong>Innovation:</strong> New approaches to ${topic} are emerging every day</li>
  <li><strong>Efficiency:</strong> Modern solutions are making ${topic} more accessible</li>
  <li><strong>Integration:</strong> ${topic} is becoming part of larger ${category} ecosystems</li>
</ul>

<h2>Best Practices for ${topic}</h2>
<p>To make the most of ${topic}, consider implementing the following strategies:</p>
<ol>
  <li>Research the latest trends and innovations</li>
  <li>Analyze your current approach and identify areas for improvement</li>
  <li>Develop a comprehensive strategy that aligns with your goals</li>
  <li>Monitor results and adjust your approach as needed</li>
</ol>

<h2>Conclusion</h2>
<p>${topic} continues to transform the ${category} landscape, offering new opportunities for growth and innovation. By staying informed and adopting best practices, you can leverage ${topic} to achieve your objectives.</p>
      `;
      
      setResult({
        title: aiGeneratedTitle,
        excerpt: aiGeneratedExcerpt,
        content: aiGeneratedContent
      });
      
      setLoading(false);
      toast.success("AI content generated successfully");
    }, 2000);
  };

  const handleApply = () => {
    if (result) {
      onApply(result);
      toast.success("AI content applied to form");
    }
  };

  const toneOptions = [
    { value: "informative", label: "Informative" },
    { value: "conversational", label: "Conversational" },
    { value: "professional", label: "Professional" },
    { value: "casual", label: "Casual" },
    { value: "persuasive", label: "Persuasive" }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          <Code className="h-5 w-5 mr-2 text-blue-600" />
          AI Post Generator
        </CardTitle>
        <CardDescription>
          Generate blog post content with AI
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="topic">Topic or Keywords</Label>
          <Input
            id="topic"
            placeholder="e.g., Sustainable Energy Solutions"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={(value) => setCategory(value as PostCategory)}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
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

          <div className="space-y-2">
            <Label htmlFor="tone">Writing Tone</Label>
            <Select value={tone} onValueChange={setTone}>
              <SelectTrigger>
                <SelectValue placeholder="Select tone" />
              </SelectTrigger>
              <SelectContent>
                {toneOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button 
          onClick={generatePost} 
          className="w-full bg-blue-600 hover:bg-blue-700"
          disabled={loading || !topic}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            "Generate Content"
          )}
        </Button>

        {result && (
          <div className="space-y-4 pt-4 border-t">
            <div>
              <h4 className="font-medium mb-2">Generated Title</h4>
              <div className="bg-muted p-3 rounded-md text-sm">{result.title}</div>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Generated Excerpt</h4>
              <div className="bg-muted p-3 rounded-md text-sm">{result.excerpt}</div>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Generated Content</h4>
              <div className="bg-muted p-3 rounded-md text-sm max-h-60 overflow-y-auto">
                <div dangerouslySetInnerHTML={{ __html: result.content || "" }} />
              </div>
            </div>
          </div>
        )}
      </CardContent>
      {result && (
        <CardFooter>
          <Button 
            onClick={handleApply}
            className="w-full bg-green-600 hover:bg-green-700"
          >
            <Save className="h-4 w-4 mr-2" />
            Apply to Post Form
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
