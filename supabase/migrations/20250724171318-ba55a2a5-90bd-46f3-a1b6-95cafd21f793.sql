-- First, let's create the two admin users
-- Note: We'll need to manually delete existing users through the Supabase dashboard
-- and then these users can be created through the sign-in process

-- Create a function to help identify admin users
CREATE OR REPLACE FUNCTION is_admin_user(user_email text)
RETURNS boolean AS $$
BEGIN
  RETURN user_email IN ('13manavpuri@gmail.com', 'manavpuri2013@gmail.com');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update RLS policies to only allow admin users access to admin functions
DROP POLICY IF EXISTS "Authenticated users can manage articles" ON articles;
DROP POLICY IF EXISTS "Authenticated users can manage blogs" ON blogs;
DROP POLICY IF EXISTS "Authenticated users can manage poems" ON poems;
DROP POLICY IF EXISTS "Authenticated users can manage genres" ON genres;
DROP POLICY IF EXISTS "Authenticated users can manage contact submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Authenticated users can manage article genres" ON article_genres;
DROP POLICY IF EXISTS "Authenticated users can manage blog genres" ON blog_genres;
DROP POLICY IF EXISTS "Authenticated users can manage poem genres" ON poem_genres;

-- Create new policies that only allow the two admin users
CREATE POLICY "Only admin users can manage articles" 
ON articles 
FOR ALL 
USING (is_admin_user(auth.jwt() ->> 'email'))
WITH CHECK (is_admin_user(auth.jwt() ->> 'email'));

CREATE POLICY "Only admin users can manage blogs" 
ON blogs 
FOR ALL 
USING (is_admin_user(auth.jwt() ->> 'email'))
WITH CHECK (is_admin_user(auth.jwt() ->> 'email'));

CREATE POLICY "Only admin users can manage poems" 
ON poems 
FOR ALL 
USING (is_admin_user(auth.jwt() ->> 'email'))
WITH CHECK (is_admin_user(auth.jwt() ->> 'email'));

CREATE POLICY "Only admin users can manage genres" 
ON genres 
FOR ALL 
USING (is_admin_user(auth.jwt() ->> 'email'))
WITH CHECK (is_admin_user(auth.jwt() ->> 'email'));

CREATE POLICY "Only admin users can manage contact submissions" 
ON contact_submissions 
FOR ALL 
USING (is_admin_user(auth.jwt() ->> 'email'))
WITH CHECK (is_admin_user(auth.jwt() ->> 'email'));

CREATE POLICY "Only admin users can manage article genres" 
ON article_genres 
FOR ALL 
USING (is_admin_user(auth.jwt() ->> 'email'))
WITH CHECK (is_admin_user(auth.jwt() ->> 'email'));

CREATE POLICY "Only admin users can manage blog genres" 
ON blog_genres 
FOR ALL 
USING (is_admin_user(auth.jwt() ->> 'email'))
WITH CHECK (is_admin_user(auth.jwt() ->> 'email'));

CREATE POLICY "Only admin users can manage poem genres" 
ON poem_genres 
FOR ALL 
USING (is_admin_user(auth.jwt() ->> 'email'))
WITH CHECK (is_admin_user(auth.jwt() ->> 'email'));