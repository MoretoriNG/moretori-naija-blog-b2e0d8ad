
-- Add missing columns to existing posts table
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS slug TEXT;
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS excerpt TEXT;
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS cover_image TEXT;
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS category TEXT;
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS author TEXT;
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT false;
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS published BOOLEAN DEFAULT false;
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS video_url TEXT;
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS tags TEXT[];
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT now();

-- Create unique constraint on slug if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'posts_slug_key'
    ) THEN
        ALTER TABLE public.posts ADD CONSTRAINT posts_slug_key UNIQUE (slug);
    END IF;
END $$;

-- Create categories table
CREATE TABLE IF NOT EXISTS public.categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  color TEXT DEFAULT '#6B7280',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert default categories (ignore if they already exist)
INSERT INTO public.categories (name, slug, description, color) VALUES
  ('Technology', 'tech', 'Latest technology news and updates', '#3B82F6'),
  ('Automotive', 'auto', 'Car reviews, news, and automotive insights', '#EF4444'),
  ('Health', 'health', 'Health tips, medical news, and wellness', '#10B981'),
  ('Entertainment', 'entertainment', 'Movies, music, and entertainment news', '#8B5CF6'),
  ('Business', 'business', 'Business news, finance, and economics', '#6366F1'),
  ('Sports', 'sports', 'Sports news, updates, and analysis', '#F59E0B'),
  ('Lifestyle', 'lifestyle', 'Lifestyle tips, travel, and culture', '#EC4899')
ON CONFLICT (slug) DO NOTHING;

-- Add role column to profiles if it doesn't exist
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'user';

-- Update RLS policies for posts
DROP POLICY IF EXISTS "Admins can manage all posts" ON public.posts;
DROP POLICY IF EXISTS "Public can view published posts" ON public.posts;

CREATE POLICY "Admins can manage all posts" 
  ON public.posts 
  FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Public can view published posts" 
  ON public.posts 
  FOR SELECT 
  USING (published = true OR published IS NULL);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for posts updated_at
DROP TRIGGER IF EXISTS update_posts_updated_at ON public.posts;
CREATE TRIGGER update_posts_updated_at BEFORE UPDATE ON public.posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Update existing posts to have proper categories and slugs
UPDATE public.posts SET 
  category = 'tech',
  author = COALESCE(author, 'Admin'),
  published = COALESCE(published, true),
  featured = COALESCE(featured, false),
  slug = COALESCE(slug, LOWER(REPLACE(REPLACE(title, ' ', '-'), '''', ''))),
  excerpt = COALESCE(excerpt, LEFT(content, 150) || '...')
WHERE category IS NULL OR slug IS NULL;

-- Insert sample auto posts with detailed specifications
INSERT INTO public.posts (title, slug, excerpt, content, cover_image, category, author, featured, published, tags, user_id) VALUES
(
  'Toyota Camry 2024: Complete Review and Specifications',
  'toyota-camry-2024-complete-review-specifications',
  'A comprehensive look at the 2024 Toyota Camry featuring advanced safety features, improved fuel efficiency, and premium interior design.',
  '<div class="auto-specs"><h2>2024 Toyota Camry: Excellence Redefined</h2><p>The 2024 Toyota Camry continues to set the standard in the midsize sedan segment with its blend of reliability, performance, and advanced technology.</p><h3>Engine Specifications</h3><div class="specs-grid"><div class="spec-item"><strong>Engine Type:</strong> 2.5L 4-Cylinder Dynamic Force</div><div class="spec-item"><strong>Horsepower:</strong> 203 hp @ 6,600 rpm</div><div class="spec-item"><strong>Torque:</strong> 184 lb-ft @ 5,000 rpm</div><div class="spec-item"><strong>Transmission:</strong> 8-Speed Automatic</div><div class="spec-item"><strong>Drivetrain:</strong> Front-Wheel Drive</div></div><h3>Fuel Economy</h3><ul><li>City: 28 MPG</li><li>Highway: 39 MPG</li><li>Combined: 32 MPG</li><li>Fuel Tank Capacity: 14.3 gallons</li></ul><h3>Safety Features</h3><ul><li>Toyota Safety Sense 2.0 (Standard)</li><li>Pre-Collision System with Pedestrian Detection</li><li>Dynamic Radar Cruise Control</li><li>Lane Departure Alert with Steering Assist</li></ul></div>',
  'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=800&q=80',
  'auto',
  'David Automotive',
  true,
  true,
  ARRAY['Toyota', 'Camry', 'Sedan', 'Review', 'Specifications', '2024'],
  (SELECT id FROM auth.users LIMIT 1)
),
(
  'BMW X5 2024: Luxury SUV Performance Analysis',
  'bmw-x5-2024-luxury-suv-performance-analysis',
  'Explore the 2024 BMW X5 luxury SUV with detailed performance metrics, advanced technology features, and comprehensive specifications.',
  '<div class="auto-specs"><h2>2024 BMW X5: The Ultimate Luxury SUV Experience</h2><p>The 2024 BMW X5 continues to lead the luxury SUV segment with its perfect balance of performance, comfort, and cutting-edge technology.</p><h3>Engine Options</h3><div class="engine-options"><div class="engine-option"><h4>xDrive40i (Base Engine)</h4><ul><li>3.0L Twin-Turbo Inline-6</li><li>375 horsepower</li><li>383 lb-ft of torque</li><li>0-60 mph: 5.3 seconds</li></ul></div></div><h3>Advanced Technology</h3><ul><li>BMW iDrive 8 Operating System</li><li>12.3-inch Digital Instrument Cluster</li><li>14.9-inch Central Touchscreen</li></ul></div>',
  'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80',
  'auto',
  'Michael Roberts',
  true,
  true,
  ARRAY['BMW', 'X5', 'SUV', 'Luxury', '2024', 'Performance'],
  (SELECT id FROM auth.users LIMIT 1)
)
ON CONFLICT (slug) DO NOTHING;
