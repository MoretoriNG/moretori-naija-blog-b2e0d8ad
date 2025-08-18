
import { supabase } from "@/integrations/supabase/client";
import { Post } from "@/types/blog";

// Transform database post to frontend Post type
function transformPost(dbPost: any): Post {
  return {
    id: dbPost.id,
    title: dbPost.title,
    slug: dbPost.slug,
    excerpt: dbPost.excerpt,
    content: dbPost.content,
    coverImage: dbPost.featured_image,
    image_url: dbPost.featured_image, // Support both formats
    category: dbPost.category_id,
    category_id: dbPost.category_id, // Support both formats
    author: dbPost.author_id,
    publishedAt: dbPost.published_at,
    published_at: dbPost.published_at, // Support both formats
    featured: dbPost.status === 'published',
    video: dbPost.video_url,
    videoUrl: dbPost.video_url, // Enhanced video support
    tags: dbPost.tags || [],
    // Advanced features
    seoKeywords: dbPost.seo_keywords || [],
    metaTitle: dbPost.meta_title,
    metaDescription: dbPost.meta_description,
    readingTime: dbPost.reading_time,
    isFeatured: dbPost.is_featured || false,
    visibility: dbPost.visibility || 'public',
    scheduledAt: dbPost.scheduled_at,
    likesCount: dbPost.likes_count || 0,
    commentsCount: dbPost.comments_count || 0,
    sharesCount: dbPost.shares_count || 0,
  };
}

export const supabasePosts = {
  // Get all posts with optional filtering
  async getAllPosts(filters?: { category?: string; featured?: boolean; published?: boolean }) {
    let query = supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (filters?.category) {
      query = query.eq('category_id', filters.category);
    }
    if (filters?.featured !== undefined) {
      query = query.eq('status', 'published');
    }
    if (filters?.published !== undefined) {
      if (filters.published) {
        query = query.eq('status', 'published');
      } else {
        query = query.eq('status', 'draft');
      }
    }

    const { data, error } = await query;
    if (error) throw error;
    return (data || []).map(transformPost);
  },

  // Get post by slug
  async getPostBySlug(slug: string) {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single();

    if (error) throw error;
    return transformPost(data);
  },

  // Get post by ID
  async getPostById(id: string) {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return transformPost(data);
  },

  // Create new post
  async createPost(post: Omit<Post, 'id' | 'created_at' | 'updated_at'>) {
    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      throw new Error('User must be authenticated to create posts');
    }

    // Get category UUID from slug
    let categoryId = null;
    if (post.category) {
      const { data: categoryData, error: categoryError } = await supabase
        .from('categories')
        .select('id')
        .eq('slug', post.category)
        .single();
      
      if (!categoryError && categoryData) {
        categoryId = categoryData.id;
      }
    }

    const { data, error } = await supabase
      .from('posts')
      .insert({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        featured_image: post.coverImage,
        category_id: categoryId,
        author_id: user.id, // Use authenticated user's ID
        status: post.publishedAt ? 'published' : 'draft',
        published_at: post.publishedAt || null,
        tags: post.tags || [],
        // Advanced features
        video_url: post.videoUrl || post.video,
        seo_keywords: post.seoKeywords || [],
        meta_title: post.metaTitle,
        meta_description: post.metaDescription,
        is_featured: post.isFeatured || false,
        visibility: post.visibility || 'public',
        scheduled_at: post.scheduledAt || null,
        likes_count: 0,
        comments_count: 0,
        shares_count: 0
      })
      .select()
      .single();

    if (error) throw error;
    return transformPost(data);
  },

  // Update post
  async updatePost(id: string, post: Partial<Post>) {
    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      throw new Error('User must be authenticated to update posts');
    }

    // Get category UUID from slug if category is provided
    let categoryId = null;
    if (post.category) {
      const { data: categoryData, error: categoryError } = await supabase
        .from('categories')
        .select('id')
        .eq('slug', post.category)
        .single();
      
      if (!categoryError && categoryData) {
        categoryId = categoryData.id;
      }
    }

    const updateData: any = {
      updated_at: new Date().toISOString()
    };

    // Only update fields that are provided
    if (post.title !== undefined) updateData.title = post.title;
    if (post.slug !== undefined) updateData.slug = post.slug;
    if (post.excerpt !== undefined) updateData.excerpt = post.excerpt;
    if (post.content !== undefined) updateData.content = post.content;
    if (post.coverImage !== undefined) updateData.featured_image = post.coverImage;
    if (categoryId !== null) updateData.category_id = categoryId;
    if (post.publishedAt !== undefined) {
      updateData.status = post.publishedAt ? 'published' : 'draft';
      updateData.published_at = post.publishedAt || null;
    }
    if (post.tags !== undefined) updateData.tags = post.tags;

    // Advanced features
    if (post.videoUrl !== undefined || post.video !== undefined) {
      updateData.video_url = post.videoUrl || post.video;
    }
    if (post.seoKeywords !== undefined) updateData.seo_keywords = post.seoKeywords;
    if (post.metaTitle !== undefined) updateData.meta_title = post.metaTitle;
    if (post.metaDescription !== undefined) updateData.meta_description = post.metaDescription;
    if (post.isFeatured !== undefined) updateData.is_featured = post.isFeatured;
    if (post.visibility !== undefined) updateData.visibility = post.visibility;
    if (post.scheduledAt !== undefined) updateData.scheduled_at = post.scheduledAt || null;

    const { data, error } = await supabase
      .from('posts')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return transformPost(data);
  },

  // Delete post
  async deletePost(id: string) {
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  // Bulk delete posts
  async bulkDeletePosts(ids: string[]) {
    const { error } = await supabase
      .from('posts')
      .delete()
      .in('id', ids);

    if (error) throw error;
  },

  // Toggle post status
  async togglePostStatus(id: string, published: boolean) {
    const { data, error } = await supabase
      .from('posts')
      .update({ 
        published_at: published ? new Date().toISOString() : null,
        status: published ? 'published' : 'draft',
        updated_at: new Date().toISOString() 
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return transformPost(data);
  },

  // Get categories
  async getCategories() {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');

    if (error) throw error;
    return data || [];
  },

  // Create category
  async createCategory(category: { name: string; slug: string; description?: string; color?: string }) {
    const { data, error } = await supabase
      .from('categories')
      .insert(category)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Get dashboard stats
  async getDashboardStats() {
    try {
      const [postsData, categoriesData] = await Promise.all([
        supabase.from('posts').select('id, published_at, status, created_at'),
        supabase.from('categories').select('id')
      ]);

      const posts = postsData.data || [];
      const categories = categoriesData.data || [];

      const now = new Date();
      const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      const lastMonth = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

      const recentPosts = posts.filter(post => 
        post && post.created_at && new Date(post.created_at) >= lastWeek
      );
      const monthlyPosts = posts.filter(post => 
        post && post.created_at && new Date(post.created_at) >= lastMonth
      );

      return {
        totalPosts: posts.length,
        publishedPosts: posts.filter(post => 
          post && post.status === 'published'
        ).length,
        draftPosts: posts.filter(post => 
          post && post.status === 'draft'
        ).length,
        featuredPosts: posts.filter(post => 
          post && post.status === 'published'
        ).length,
        totalCategories: categories.length,
        recentPosts: recentPosts.length,
        monthlyPosts: monthlyPosts.length,
        growthRate: monthlyPosts.length > 0 ? ((recentPosts.length / monthlyPosts.length) * 100) : 0
      };
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      throw error;
    }
  },

  // Create sample posts from internet-like data
  async createSamplePosts() {
    const samplePosts = [
      {
        title: "The Future of Artificial Intelligence in 2024",
        slug: "future-ai-2024",
        excerpt: "Exploring the latest developments and trends in AI technology that will shape our future.",
        content: `# The Future of Artificial Intelligence in 2024

Artificial Intelligence continues to evolve at an unprecedented pace, with 2024 marking significant milestones in machine learning, natural language processing, and autonomous systems.

## Key Developments

### Machine Learning Advances
The integration of advanced neural networks has revolutionized how we approach complex problem-solving...

### Natural Language Processing
Large language models have become more sophisticated, enabling better human-computer interactions...

## Industry Impact
AI is transforming industries from healthcare to finance, creating new opportunities and challenges...`,
        coverImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
        category: "tech",
        author: "Dr. Sarah Chen",
        featured: true,
        tags: ["AI", "Technology", "Future", "Innovation"]
      },
      {
        title: "Sustainable Living: Simple Changes for a Better Planet",
        slug: "sustainable-living-guide",
        excerpt: "Practical tips and strategies for adopting eco-friendly practices in your daily life.",
        content: `# Sustainable Living: Simple Changes for a Better Planet

Making sustainable choices doesn't have to be overwhelming. Here are practical steps you can take today.

## Energy Conservation
- Switch to LED lighting
- Unplug devices when not in use
- Use programmable thermostats

## Waste Reduction
- Implement the 3 R's: Reduce, Reuse, Recycle
- Compost organic waste
- Choose products with minimal packaging`,
        coverImage: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=400&fit=crop",
        category: "lifestyle",
        author: "Emma Rodriguez",
        featured: false,
        tags: ["Sustainability", "Environment", "Lifestyle", "Green Living"]
      },
      {
        title: "Breaking: Major Scientific Discovery Reshapes Physics",
        slug: "physics-discovery-breakthrough",
        excerpt: "Scientists announce groundbreaking findings that could revolutionize our understanding of quantum mechanics.",
        content: `# Breaking: Major Scientific Discovery Reshapes Physics

In a unprecedented breakthrough, researchers at leading institutions have made discoveries that challenge fundamental assumptions in quantum physics.

## The Discovery
The research team has identified new quantum phenomena that suggest...

## Implications
This discovery could lead to revolutionary advances in:
- Quantum computing
- Energy storage
- Telecommunications`,
        coverImage: "https://images.unsplash.com/photo-1636953056323-9c09fdd74fa6?w=800&h=400&fit=crop",
        category: "news",
        author: "Prof. Michael Thompson",
        featured: true,
        tags: ["Science", "Physics", "Research", "Discovery"]
      },
      {
        title: "Global Markets React to Economic Policy Changes",
        slug: "global-markets-economic-policy",
        excerpt: "Analysis of market movements following recent economic policy announcements.",
        content: `# Global Markets React to Economic Policy Changes

Financial markets worldwide are responding to significant policy shifts announced by major economies.

## Market Overview
- Asian markets showed mixed results
- European indices gained momentum
- US futures indicate positive opening

## Key Factors
Several factors are driving current market movements...`,
        coverImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop",
        category: "business",
        author: "James Wilson",
        featured: false,
        tags: ["Finance", "Markets", "Economy", "Business"]
      },
      {
        title: "Championship Finals: Historic Match Breaks Records",
        slug: "championship-finals-historic-match",
        excerpt: "An unforgettable championship final that set new attendance and viewership records.",
        content: `# Championship Finals: Historic Match Breaks Records

Last night's championship final will be remembered as one of the greatest matches in sports history.

## Match Highlights
- Record-breaking attendance of 95,000 spectators
- Over 2.5 billion global viewers
- Dramatic finish with overtime victory

## Player Performances
Outstanding individual performances highlighted the evening...`,
        coverImage: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=400&fit=crop",
        category: "sports",
        author: "Maria Garcia",
        featured: true,
        tags: ["Sports", "Championship", "Records", "Competition"]
      },
      {
        title: "Mental Health Awareness: Breaking the Stigma",
        slug: "mental-health-awareness-stigma",
        excerpt: "Understanding the importance of mental health awareness and support in our communities.",
        content: `# Mental Health Awareness: Breaking the Stigma

Mental health is as important as physical health, yet stigma continues to prevent many from seeking help.

## Understanding Mental Health
Mental health encompasses our emotional, psychological, and social well-being...

## Breaking Down Barriers
- Education and awareness campaigns
- Open conversations about mental health
- Accessible support services

## Resources and Support
If you or someone you know needs support...`,
        coverImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop",
        category: "health",
        author: "Dr. Lisa Park",
        featured: false,
        
        tags: ["Mental Health", "Wellness", "Support", "Awareness"]
      }
    ];

    const results = [];
    for (const post of samplePosts) {
      try {
        const result = await this.createPost({
          ...post,
          publishedAt: new Date().toISOString()
        });
        results.push(result);
      } catch (error) {
        console.error(`Error creating post ${post.title}:`, error);
      }
    }
    return results;
  }
};
