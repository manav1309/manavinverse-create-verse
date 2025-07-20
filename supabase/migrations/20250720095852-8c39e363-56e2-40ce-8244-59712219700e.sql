-- Create blogs table
CREATE TABLE public.blogs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  image TEXT,
  author TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('published', 'draft')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create articles table
CREATE TABLE public.articles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  image TEXT,
  author TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('published', 'draft')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create poems table
CREATE TABLE public.poems (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  preview TEXT NOT NULL,
  content TEXT NOT NULL,
  image TEXT,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.poems ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (no authentication required)
CREATE POLICY "Allow public read access to blogs" ON public.blogs FOR SELECT USING (true);
CREATE POLICY "Allow public insert access to blogs" ON public.blogs FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update access to blogs" ON public.blogs FOR UPDATE USING (true);
CREATE POLICY "Allow public delete access to blogs" ON public.blogs FOR DELETE USING (true);

CREATE POLICY "Allow public read access to articles" ON public.articles FOR SELECT USING (true);
CREATE POLICY "Allow public insert access to articles" ON public.articles FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update access to articles" ON public.articles FOR UPDATE USING (true);
CREATE POLICY "Allow public delete access to articles" ON public.articles FOR DELETE USING (true);

CREATE POLICY "Allow public read access to poems" ON public.poems FOR SELECT USING (true);
CREATE POLICY "Allow public insert access to poems" ON public.poems FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update access to poems" ON public.poems FOR UPDATE USING (true);
CREATE POLICY "Allow public delete access to poems" ON public.poems FOR DELETE USING (true);

-- Create function to automatically update updated_at column
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_blogs_updated_at
  BEFORE UPDATE ON public.blogs
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_articles_updated_at
  BEFORE UPDATE ON public.articles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_poems_updated_at
  BEFORE UPDATE ON public.poems
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();