-- Create email_signups table
CREATE TABLE public.email_signups (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.email_signups ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert emails (public form)
CREATE POLICY "Anyone can submit emails"
ON public.email_signups
FOR INSERT
TO anon
WITH CHECK (true);

-- Only authenticated users can view emails (admin)
CREATE POLICY "Authenticated users can view emails"
ON public.email_signups
FOR SELECT
TO authenticated
USING (true);