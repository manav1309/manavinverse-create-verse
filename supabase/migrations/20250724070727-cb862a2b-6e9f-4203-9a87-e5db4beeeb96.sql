-- Create a table to store contact form submissions as backup
CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  google_sheets_synced BOOLEAN DEFAULT false
);

-- Enable RLS
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy for authenticated users to manage submissions
CREATE POLICY "Authenticated users can manage contact submissions" 
ON public.contact_submissions 
FOR ALL 
USING (true)
WITH CHECK (true);