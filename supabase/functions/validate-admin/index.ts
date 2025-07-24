import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { corsHeaders } from '../_shared/cors.ts'

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { username, password } = await req.json()

    // Get admin credentials from environment
    const adminUsername = Deno.env.get('ADMIN_USERNAME')
    const adminPassword = Deno.env.get('ADMIN_PASSWORD')

    // Validate credentials
    const valid = username === adminUsername && password === adminPassword

    return new Response(
      JSON.stringify({ valid }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message, valid: false }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})