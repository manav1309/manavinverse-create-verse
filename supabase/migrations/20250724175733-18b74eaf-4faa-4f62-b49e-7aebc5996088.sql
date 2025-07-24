-- Update the admin function to include the current user's email
CREATE OR REPLACE FUNCTION public.is_admin_user(user_email text)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
BEGIN
  RETURN user_email IN ('13manavpuri@gmail.com', 'manavpuri2013@gmail.com', 'tarun@gmail.com');
END;
$function$;