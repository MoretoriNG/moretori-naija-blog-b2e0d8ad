-- ============================================
-- CRITICAL SECURITY FIX: Separate User Roles Table
-- ============================================

-- 1. Create role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- 2. Create user_roles table
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  UNIQUE (user_id, role)
);

-- 3. Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 4. Migrate existing roles from profiles table
INSERT INTO public.user_roles (user_id, role)
SELECT id, role::app_role
FROM public.profiles
WHERE role IS NOT NULL
ON CONFLICT (user_id, role) DO NOTHING;

-- 5. Create security definer function to check roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- 6. Create function to get user role
CREATE OR REPLACE FUNCTION public.get_user_role(_user_id uuid DEFAULT auth.uid())
RETURNS app_role
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role
  FROM public.user_roles
  WHERE user_id = _user_id
  ORDER BY 
    CASE role
      WHEN 'admin' THEN 1
      WHEN 'moderator' THEN 2
      WHEN 'user' THEN 3
    END
  LIMIT 1
$$;

-- 7. RLS Policies for user_roles table
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles"
ON public.user_roles
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can insert roles"
ON public.user_roles
FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can update roles"
ON public.user_roles
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can delete roles"
ON public.user_roles
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- 8. Update existing RLS policies to use has_role function

-- Update profiles policies
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile"
ON public.profiles
FOR UPDATE
USING (auth.uid() = id OR public.has_role(auth.uid(), 'admin'));

-- Restrict profiles SELECT to authenticated users only (fix public exposure)
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
CREATE POLICY "Users can view own profile"
ON public.profiles
FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Authenticated users view basic profiles"
ON public.profiles
FOR SELECT
TO authenticated
USING (true);

-- Update posts policies
DROP POLICY IF EXISTS "Admins can view all posts" ON public.posts;
CREATE POLICY "Admins can view all posts"
ON public.posts
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Authors can update their own posts" ON public.posts;
CREATE POLICY "Authors can update their own posts"
ON public.posts
FOR UPDATE
USING (
  auth.uid() = author_id 
  OR auth.uid() = user_id 
  OR public.has_role(auth.uid(), 'admin')
);

DROP POLICY IF EXISTS "Authors can delete their own posts" ON public.posts;
CREATE POLICY "Authors can delete their own posts"
ON public.posts
FOR DELETE
USING (
  auth.uid() = author_id 
  OR auth.uid() = user_id 
  OR public.has_role(auth.uid(), 'admin')
);

-- Update comments policies
DROP POLICY IF EXISTS "Admins can view all comments" ON public.comments;
CREATE POLICY "Admins can view all comments"
ON public.comments
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Users can delete their own comments" ON public.comments;
CREATE POLICY "Users can delete their own comments"
ON public.comments
FOR DELETE
USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Users can update their own comments" ON public.comments;
CREATE POLICY "Users can update their own comments"
ON public.comments
FOR UPDATE
USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

-- Update categories policies
DROP POLICY IF EXISTS "Admins can manage categories" ON public.categories;
CREATE POLICY "Admins can manage categories"
ON public.categories
FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Update tags policies
DROP POLICY IF EXISTS "Admins can manage tags" ON public.tags;
CREATE POLICY "Admins can manage tags"
ON public.tags
FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Update authors policies
DROP POLICY IF EXISTS "Authors can update their own profile" ON public.authors;
CREATE POLICY "Authors can update their own profile"
ON public.authors
FOR UPDATE
USING (
  (auth.uid())::text = (id)::text 
  OR public.has_role(auth.uid(), 'admin')
);

DROP POLICY IF EXISTS "Authors can delete their own profile" ON public.authors;
CREATE POLICY "Authors can delete their own profile"
ON public.authors
FOR DELETE
USING (
  (auth.uid())::text = (id)::text 
  OR public.has_role(auth.uid(), 'admin')
);

-- Update post_tags policies
DROP POLICY IF EXISTS "Post authors can manage their post tags" ON public.post_tags;
CREATE POLICY "Post authors can manage their post tags"
ON public.post_tags
FOR INSERT
WITH CHECK (
  (EXISTS (
    SELECT 1 FROM posts
    WHERE posts.id = post_tags.post_id 
    AND (posts.author_id = auth.uid() OR posts.user_id = auth.uid())
  )) 
  OR public.has_role(auth.uid(), 'admin')
);

DROP POLICY IF EXISTS "Post authors can delete their post tags" ON public.post_tags;
CREATE POLICY "Post authors can delete their post tags"
ON public.post_tags
FOR DELETE
USING (
  (EXISTS (
    SELECT 1 FROM posts
    WHERE posts.id = post_tags.post_id 
    AND (posts.author_id = auth.uid() OR posts.user_id = auth.uid())
  )) 
  OR public.has_role(auth.uid(), 'admin')
);

-- Update search_analytics policies (require authentication)
DROP POLICY IF EXISTS "Anyone can insert search analytics" ON public.search_analytics;
CREATE POLICY "Authenticated users can insert analytics"
ON public.search_analytics
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

DROP POLICY IF EXISTS "Admins can view all search analytics" ON public.search_analytics;
CREATE POLICY "Admins can view all search analytics"
ON public.search_analytics
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- 9. Update handle_new_user trigger to create user_roles entry
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Insert into profiles table
  INSERT INTO public.profiles (
    id, 
    username, 
    avatar_url
  )
  VALUES (
    new.id,
    COALESCE(
      new.raw_user_meta_data->>'full_name',
      new.raw_user_meta_data->>'name',
      new.raw_user_meta_data->>'username',
      split_part(new.email, '@', 1)
    ),
    new.raw_user_meta_data->>'avatar_url'
  );
  
  -- Insert default user role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (new.id, 'user');
  
  RETURN new;
END;
$$;