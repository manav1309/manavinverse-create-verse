-- Fix the search path vulnerability in is_admin_user function
CREATE OR REPLACE FUNCTION public.is_admin_user(user_email text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  RETURN user_email IN ('13manavpuri@gmail.com', 'manavpuri2013@gmail.com');
END;
$$;