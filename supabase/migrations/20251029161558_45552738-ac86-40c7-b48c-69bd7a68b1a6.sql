-- Drop the existing overly permissive SELECT policy
DROP POLICY IF EXISTS "Authenticated users can view emails" ON public.email_signups;

-- Create a restricted policy that only allows the specific admin email to view signups
CREATE POLICY "Only specific admin can view emails"
ON public.email_signups
FOR SELECT
TO authenticated
USING (
  (auth.jwt()->>'email') = 'mattering.club@gmail.com'
);