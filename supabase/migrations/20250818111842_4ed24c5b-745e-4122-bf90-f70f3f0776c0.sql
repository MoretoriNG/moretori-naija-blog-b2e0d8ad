-- Create RLS policies for authors table
CREATE POLICY "Authors are viewable by everyone" 
ON public.authors 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can create authors" 
ON public.authors 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authors can update their own profile" 
ON public.authors 
FOR UPDATE 
USING (auth.uid()::text = id::text);

CREATE POLICY "Authors can delete their own profile" 
ON public.authors 
FOR DELETE 
USING (auth.uid()::text = id::text);