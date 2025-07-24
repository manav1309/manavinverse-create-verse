import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.text();
    const { name, email, phone, message } = body ? JSON.parse(body) : {};

    // Validate required fields
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: 'Name, email, and message are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Save to Supabase as backup
    const { error: dbError } = await supabase
      .from('contact_submissions')
      .insert({
        name,
        email,
        phone: phone || null,
        message,
        google_sheets_synced: false
      });

    if (dbError) {
      console.error('Database error:', dbError);
    }

    // Get Google Service Account credentials
    const credentialsJson = Deno.env.get('GOOGLE_SERVICE_ACCOUNT_CREDENTIALS');
    if (!credentialsJson) {
      console.error('Google Service Account credentials not configured');
      throw new Error('Google Service Account credentials not configured');
    }

    let credentials;
    try {
      credentials = JSON.parse(credentialsJson);
    } catch (parseError) {
      console.error('Failed to parse Google credentials:', parseError);
      throw new Error('Invalid Google Service Account credentials format');
    }

    // Create JWT for Google API authentication
    let jwt;
    try {
      jwt = await createJWT(credentials);
    } catch (jwtError) {
      console.error('Failed to create JWT:', jwtError);
      throw new Error('Failed to create authentication token');
    }
    
    // Get access token from Google
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion: jwt,
      }),
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error('Google token request failed:', tokenResponse.status, errorText);
      throw new Error(`Failed to get Google access token: ${tokenResponse.status}`);
    }

    const tokenData = await tokenResponse.json();
    
    if (!tokenData.access_token) {
      console.error('No access token in response:', tokenData);
      throw new Error('Failed to get Google access token: ' + JSON.stringify(tokenData));
    }

    // Append data to Google Sheets
    const spreadsheetId = '1dq2OElLgo9xLJymmlimegZfaSFp3I1tueadvEha5HSc';
    const range = 'Sheet1!A:E'; // Assuming columns: Name, Email, Phone, Message, Timestamp

    const timestamp = new Date().toISOString();
    const values = [[name, email, phone || '', message, timestamp]];

    const sheetsResponse = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append?valueInputOption=RAW`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${tokenData.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          values,
        }),
      }
    );

    if (!sheetsResponse.ok) {
      const error = await sheetsResponse.text();
      console.error('Google Sheets API error:', sheetsResponse.status, error);
      throw new Error(`Failed to append to Google Sheets: ${sheetsResponse.status} - ${error}`);
    }

    console.log('Successfully appended to Google Sheets');

    // Update the database record to mark as synced
    if (!dbError) {
      await supabase
        .from('contact_submissions')
        .update({ google_sheets_synced: true })
        .eq('email', email)
        .eq('name', name)
        .order('submitted_at', { ascending: false })
        .limit(1);
    }

    console.log('Contact form submitted successfully:', { name, email });

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Contact form submitted successfully!' 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error in submit-contact-form function:', error);
    
    // Save to database even if Google Sheets fails
    if (req.method === 'POST') {
      try {
        const body = await req.text();
        const { name, email, phone, message } = body ? JSON.parse(body) : {};
        
        if (name && email && message) {
          const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
          const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
          const supabase = createClient(supabaseUrl, supabaseServiceKey);
          
          await supabase.from('contact_submissions').insert({
            name, email, phone: phone || null, message, google_sheets_synced: false
          });
          
          console.log('Saved to database despite Google Sheets error');
        }
      } catch (dbError) {
        console.error('Failed to save to database as fallback:', dbError);
      }
    }
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to submit contact form',
        details: error.message 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

// Helper function to create JWT for Google API
async function createJWT(credentials: any): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  
  const header = {
    alg: 'RS256',
    typ: 'JWT',
  };

  const payload = {
    iss: credentials.client_email,
    scope: 'https://www.googleapis.com/auth/spreadsheets',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now,
  };

  // Encode header and payload
  const encodedHeader = btoa(JSON.stringify(header)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  const encodedPayload = btoa(JSON.stringify(payload)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');

  // Create signature using Web Crypto API
  const data = new TextEncoder().encode(`${encodedHeader}.${encodedPayload}`);
  
  // Import the private key
  const privateKey = await crypto.subtle.importKey(
    'pkcs8',
    str2ab(credentials.private_key.replace(/-----BEGIN PRIVATE KEY-----\n?/, '').replace(/\n?-----END PRIVATE KEY-----/, '').replace(/\n/g, '')),
    {
      name: 'RSASSA-PKCS1-v1_5',
      hash: 'SHA-256',
    },
    false,
    ['sign']
  );

  // Sign the data
  const signature = await crypto.subtle.sign('RSASSA-PKCS1-v1_5', privateKey, data);
  
  // Encode signature
  const encodedSignature = btoa(String.fromCharCode(...new Uint8Array(signature)))
    .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');

  return `${encodedHeader}.${encodedPayload}.${encodedSignature}`;
}

// Helper function to convert string to ArrayBuffer
function str2ab(str: string): ArrayBuffer {
  const bytes = atob(str);
  const buffer = new ArrayBuffer(bytes.length);
  const view = new Uint8Array(buffer);
  for (let i = 0; i < bytes.length; i++) {
    view[i] = bytes.charCodeAt(i);
  }
  return buffer;
}