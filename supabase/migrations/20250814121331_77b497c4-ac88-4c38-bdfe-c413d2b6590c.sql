-- Check if published_at column exists and add it if missing
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'posts' 
    AND column_name = 'published_at'
  ) THEN
    ALTER TABLE posts ADD COLUMN published_at TIMESTAMP WITH TIME ZONE;
  END IF;
END $$;

-- Migrate existing posts to have proper published_at values
-- If a post has status = 'published' but no published_at, set it to created_at
UPDATE posts 
SET published_at = created_at 
WHERE status = 'published' AND published_at IS NULL;

-- Set published_at to NULL for draft posts
UPDATE posts 
SET published_at = NULL 
WHERE status = 'draft';