-- Fix function search path issues only
CREATE OR REPLACE FUNCTION public.get_profile_by_id(user_id uuid)
RETURNS SETOF profiles
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $function$
  SELECT * FROM public.profiles WHERE id = user_id;
$function$;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  INSERT INTO public.profiles (id, username, avatar_url)
  VALUES (new.id, COALESCE(new.raw_user_meta_data->>'username', new.email), new.raw_user_meta_data->>'avatar_url');
  RETURN new;
END;
$function$;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $function$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.update_post_stats()
RETURNS TRIGGER 
LANGUAGE plpgsql 
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Update comments count when a comment is added/removed
  IF TG_TABLE_NAME = 'comments' THEN
    IF TG_OP = 'INSERT' THEN
      UPDATE public.posts 
      SET comments_count = comments_count + 1 
      WHERE id = NEW.post_id;
    ELSIF TG_OP = 'DELETE' THEN
      UPDATE public.posts 
      SET comments_count = GREATEST(comments_count - 1, 0) 
      WHERE id = OLD.post_id;
    END IF;
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$$;

-- Create RLS policies for categories table only (if missing)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'categories' 
    AND policyname = 'Categories are viewable by everyone'
  ) THEN
    CREATE POLICY "Categories are viewable by everyone" 
    ON public.categories 
    FOR SELECT 
    USING (true);
  END IF;
END
$$;