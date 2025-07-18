-- Create tables for blogs, articles, and poems
CREATE TABLE public.blogs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  status TEXT NOT NULL DEFAULT 'published',
  slug TEXT NOT NULL UNIQUE,
  image_url TEXT,
  date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.articles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  status TEXT NOT NULL DEFAULT 'published',
  slug TEXT NOT NULL UNIQUE,
  image_url TEXT,
  date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.poems (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  status TEXT NOT NULL DEFAULT 'published',
  slug TEXT NOT NULL UNIQUE,
  image_url TEXT,
  date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.poems ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public read access and allow all operations for now
-- (You may want to restrict write operations to authenticated admin users later)
CREATE POLICY "Anyone can view published blogs" 
ON public.blogs 
FOR SELECT 
USING (status = 'published');

CREATE POLICY "Allow all operations on blogs" 
ON public.blogs 
FOR ALL 
USING (true) 
WITH CHECK (true);

CREATE POLICY "Anyone can view published articles" 
ON public.articles 
FOR SELECT 
USING (status = 'published');

CREATE POLICY "Allow all operations on articles" 
ON public.articles 
FOR ALL 
USING (true) 
WITH CHECK (true);

CREATE POLICY "Anyone can view published poems" 
ON public.poems 
FOR SELECT 
USING (status = 'published');

CREATE POLICY "Allow all operations on poems" 
ON public.poems 
FOR ALL 
USING (true) 
WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
NEW.updated_at = now();
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
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

-- Insert some initial data from mock data
INSERT INTO public.blogs (title, author, content, excerpt, slug, image_url) VALUES
('The Art of Minimalism', 'John Doe', 'Minimalism is more than just a design aesthetic; it''s a way of life that emphasizes simplicity and intentionality.', 'Exploring the principles and benefits of minimalist living in our modern world.', 'the-art-of-minimalism', 'https://images.unsplash.com/photo-1586474133269-d8b8e0f24b26'),
('Digital Detox: Reclaiming Your Time', 'Jane Smith', 'In our hyper-connected world, taking time to disconnect from digital devices has become essential for mental health.', 'Learn how to implement a successful digital detox and improve your well-being.', 'digital-detox-reclaiming-your-time', 'https://images.unsplash.com/photo-1612831455740-9e4ec03dbbc6');

INSERT INTO public.articles (title, author, content, excerpt, slug, image_url) VALUES
('Climate Change Solutions', 'Dr. Sarah Wilson', 'Climate change represents one of the most pressing challenges of our time, requiring immediate and sustained action.', 'Examining practical solutions and innovations in the fight against climate change.', 'climate-change-solutions', 'https://images.unsplash.com/photo-1569163139394-de44aa53cb3b'),
('The Future of Remote Work', 'Michael Chen', 'The pandemic has fundamentally changed how we work, accelerating the adoption of remote work practices.', 'Analyzing the long-term implications of remote work on productivity and culture.', 'the-future-of-remote-work', 'https://images.unsplash.com/photo-1587614382346-4ec70e388b28');

INSERT INTO public.poems (title, author, content, excerpt, slug, image_url) VALUES
('Whispers of Dawn', 'Emily Rivers', 'Morning light breaks through the misty veil,\nPainting the world in golden hues...", 'A gentle reflection on the beauty of early morning and new beginnings.', 'whispers-of-dawn', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4'),
('Urban Symphony', 'Marcus Thompson', 'City streets hum with endless motion,\nA symphony of life in concrete halls...', 'An ode to the rhythm and energy of metropolitan life.', 'urban-symphony', 'https://images.unsplash.com/photo-1514565131-fce0801e5785');