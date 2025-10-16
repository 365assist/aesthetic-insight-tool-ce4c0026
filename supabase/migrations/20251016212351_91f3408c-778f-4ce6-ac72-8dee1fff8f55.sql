-- Add DELETE policy for contact_submissions table
CREATE POLICY "Only admins can delete contact submissions"
ON public.contact_submissions
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));