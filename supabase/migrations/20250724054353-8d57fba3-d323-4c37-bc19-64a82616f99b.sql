-- Create genres table
CREATE TABLE public.genres (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create blog_genres junction table
CREATE TABLE public.blog_genres (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  blog_id UUID NOT NULL REFERENCES public.blogs(id) ON DELETE CASCADE,
  genre_id UUID NOT NULL REFERENCES public.genres(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(blog_id, genre_id)
);

-- Create article_genres junction table
CREATE TABLE public.article_genres (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  article_id UUID NOT NULL REFERENCES public.articles(id) ON DELETE CASCADE,
  genre_id UUID NOT NULL REFERENCES public.genres(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(article_id, genre_id)
);

-- Create poem_genres junction table
CREATE TABLE public.poem_genres (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  poem_id UUID NOT NULL REFERENCES public.poems(id) ON DELETE CASCADE,
  genre_id UUID NOT NULL REFERENCES public.genres(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(poem_id, genre_id)
);

-- Enable RLS on all new tables
ALTER TABLE public.genres ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_genres ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.article_genres ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.poem_genres ENABLE ROW LEVEL SECURITY;

-- RLS policies for genres
CREATE POLICY "Anyone can read genres" 
ON public.genres 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can manage genres" 
ON public.genres 
FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);

-- RLS policies for blog_genres
CREATE POLICY "Anyone can read blog genres" 
ON public.blog_genres 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can manage blog genres" 
ON public.blog_genres 
FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);

-- RLS policies for article_genres
CREATE POLICY "Anyone can read article genres" 
ON public.article_genres 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can manage article genres" 
ON public.article_genres 
FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);

-- RLS policies for poem_genres
CREATE POLICY "Anyone can read poem genres" 
ON public.poem_genres 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can manage poem genres" 
ON public.poem_genres 
FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);

-- Add triggers for updated_at
CREATE TRIGGER update_genres_updated_at
BEFORE UPDATE ON public.genres
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some default genres
INSERT INTO public.genres (name, description, display_order) VALUES
('Love Poetry', 'Romantic and emotional poetry', 1),
('Tech Blogs', 'Technology and development articles', 2),
('Lifestyle', 'General lifestyle content', 3),
('Tutorial', 'Educational and how-to content', 4),
('Opinion', 'Personal thoughts and opinions', 5);