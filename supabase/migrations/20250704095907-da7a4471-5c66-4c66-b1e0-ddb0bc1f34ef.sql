-- First, create posts without user_id constraint by temporarily disabling it
-- Insert sample posts to demonstrate HeroSlider functionality
INSERT INTO posts (
  title, 
  slug, 
  excerpt, 
  content, 
  cover_image, 
  category, 
  author, 
  featured, 
  published, 
  video_url, 
  tags
) VALUES 
(
  'Revolutionary AI Technology Transforms Modern Computing',
  'revolutionary-ai-technology-transforms-modern-computing',
  'Discover how artificial intelligence is reshaping the technological landscape with groundbreaking innovations.',
  '<p>Artificial Intelligence continues to evolve at an unprecedented pace, bringing revolutionary changes to how we interact with technology. From machine learning algorithms that can predict market trends to natural language processing systems that understand human emotions, AI is transforming every aspect of our digital lives.</p><p>The latest developments in neural networks and deep learning have opened new possibilities for automation, creativity, and problem-solving that were previously thought impossible.</p>',
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80',
  'tech',
  'Sarah Johnson',
  true,
  true,
  null,
  ARRAY['AI', 'Technology', 'Innovation', 'Computing']
),
(
  'Electric Vehicles: The Future of Transportation',
  'electric-vehicles-future-of-transportation',
  'Explore the latest developments in electric vehicle technology and their impact on the automotive industry.',
  '<p>The automotive industry is experiencing a monumental shift towards electric vehicles (EVs). With advancements in battery technology, charging infrastructure, and government incentives, EVs are becoming more accessible and practical for everyday use.</p><p>Major automakers are investing billions in electric technology, promising vehicles with longer range, faster charging, and more affordable prices.</p>',
  'https://images.unsplash.com/photo-1593941707882-a5bac6861d75?auto=format&fit=crop&w=1200&q=80',
  'auto',
  'Michael Chen',
  true,
  true,
  null,
  ARRAY['Electric Vehicles', 'Automotive', 'Sustainability', 'Technology']
),
(
  'Mental Health Awareness: Breaking the Stigma',
  'mental-health-awareness-breaking-stigma',
  'Understanding the importance of mental health and how society is working to remove stigma around mental wellness.',
  '<p>Mental health awareness has become increasingly important in our modern society. As we better understand the complexities of mental wellness, we are working to break down the barriers and stigma that prevent people from seeking help.</p><p>New approaches to therapy, meditation, and wellness practices are making mental health care more accessible and effective than ever before.</p>',
  'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=1200&q=80',
  'health',
  'Dr. Emily Rodriguez',
  true,
  true,
  null,
  ARRAY['Mental Health', 'Wellness', 'Healthcare', 'Society']
),
(
  'Latest Entertainment Trends Shaping Pop Culture',
  'latest-entertainment-trends-shaping-pop-culture',
  'From streaming services to social media influencers, discover what is driving today entertainment landscape.',
  '<p>The entertainment industry continues to evolve with new platforms, formats, and content creators emerging every day. Streaming services have revolutionized how we consume media, while social media has created new opportunities for artists and entertainers.</p><p>From virtual concerts to interactive gaming experiences, entertainment is becoming more immersive and personalized than ever before.</p>',
  'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&w=1200&q=80',
  'entertainment',
  'Alex Thompson',
  true,
  true,
  null,
  ARRAY['Entertainment', 'Pop Culture', 'Streaming', 'Social Media']
),
(
  'Sustainable Business Practices for Modern Companies',
  'sustainable-business-practices-modern-companies',
  'How businesses are adopting eco-friendly practices to create a more sustainable future while maintaining profitability.',
  '<p>Sustainability is no longer just a buzzword in the business world—it has become a crucial factor for long-term success. Companies across all industries are implementing eco-friendly practices, from reducing carbon footprints to adopting circular economy principles.</p><p>These sustainable practices are proving that environmental responsibility and business profitability can go hand in hand.</p>',
  'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80',
  'business',
  'James Wilson',
  true,
  true,
  null,
  ARRAY['Business', 'Sustainability', 'Environment', 'Corporate Responsibility']
),
(
  'Sports Technology: Enhancing Athletic Performance',
  'sports-technology-enhancing-athletic-performance',
  'Discover how cutting-edge technology is revolutionizing sports training and performance analysis.',
  '<p>The intersection of sports and technology has created exciting opportunities for athletes to enhance their performance. From wearable devices that track biometric data to AI-powered analysis of game footage, technology is providing unprecedented insights into athletic performance.</p><p>These innovations are helping athletes train smarter, recover faster, and compete at higher levels than ever before.</p>',
  'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=80',
  'sports',
  'Maria Garcia',
  true,
  true,
  null,
  ARRAY['Sports', 'Technology', 'Athletics', 'Performance']
);