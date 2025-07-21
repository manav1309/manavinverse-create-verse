-- Fix RLS policies to require authentication instead of allowing public access

-- Drop existing overly permissive policies
DROP POLICY IF EXISTS "Allow public delete access to blogs" ON public.blogs;
DROP POLICY IF EXISTS "Allow public insert access to blogs" ON public.blogs;
DROP POLICY IF EXISTS "Allow public update access to blogs" ON public.blogs;
DROP POLICY IF EXISTS "Allow public read access to blogs" ON public.blogs;

DROP POLICY IF EXISTS "Allow public delete access to articles" ON public.articles;
DROP POLICY IF EXISTS "Allow public insert access to articles" ON public.articles;
DROP POLICY IF EXISTS "Allow public update access to articles" ON public.articles;
DROP POLICY IF EXISTS "Allow public read access to articles" ON public.articles;

DROP POLICY IF EXISTS "Allow public delete access to poems" ON public.poems;
DROP POLICY IF EXISTS "Allow public insert access to poems" ON public.poems;
DROP POLICY IF EXISTS "Allow public update access to poems" ON public.poems;
DROP POLICY IF EXISTS "Allow public read access to poems" ON public.poems;

-- Create secure RLS policies

-- Blogs policies: Public can read published content, only authenticated users can modify
CREATE POLICY "Anyone can read published blogs" 
ON public.blogs 
FOR SELECT 
USING (status = 'published');

CREATE POLICY "Authenticated users can manage blogs" 
ON public.blogs 
FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);

-- Articles policies: Public can read published content, only authenticated users can modify
CREATE POLICY "Anyone can read published articles" 
ON public.articles 
FOR SELECT 
USING (status = 'published');

CREATE POLICY "Authenticated users can manage articles" 
ON public.articles 
FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);

-- Poems policies: Public can read all poems, only authenticated users can modify
CREATE POLICY "Anyone can read poems" 
ON public.poems 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can manage poems" 
ON public.poems 
FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);

-- Fix the database function security issue
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER 
LANGUAGE plpgsql 
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;