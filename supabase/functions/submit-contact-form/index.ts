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
    console.log('Starting contact form submission...');
    
    const body = await req.text();
    console.log('Request body received:', body);
    
    const { name, email, phone, message } = body ? JSON.parse(body) : {};
    console.log('Parsed data:', { name, email, phone: phone ? 'provided' : 'empty', message: message ? 'provided' : 'empty' });

    // Validate required fields
    if (!name || !email || !message) {
      console.log('Validation failed - missing required fields');
      return new Response(
        JSON.stringify({ error: 'Name, email, and message are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log('Saving to Supabase database...');
    
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
      throw new Error('Failed to save to database: ' + dbError.message);
    }

    console.log('Successfully saved to database');

    // Try Google Sheets integration (but don't fail if it doesn't work)
    try {
      console.log('Attempting Google Sheets integration...');
      await appendToGoogleSheets(name, email, phone, message);
      console.log('Successfully synced to Google Sheets');
      
      // Update the record to mark as synced
      await supabase
        .from('contact_submissions')
        .update({ google_sheets_synced: true })
        .eq('email', email)
        .eq('name', name)
        .order('submitted_at', { ascending: false })
        .limit(1);
        
    } catch (sheetsError) {
      console.error('Google Sheets error (non-critical):', sheetsError);
      // Don't fail the whole request if Google Sheets fails
    }

    console.log('Contact form submission completed successfully');

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
    console.error('Critical error in submit-contact-form function:', error);
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

// Separate function for Google Sheets integration
async function appendToGoogleSheets(name: string, email: string, phone: string | null, message: string) {
  // Get Google Service Account credentials
  const credentialsJson = Deno.env.get('GOOGLE_SERVICE_ACCOUNT_CREDENTIALS');
  if (!credentialsJson) {
    throw new Error('Google Service Account credentials not configured');
  }

  const credentials = JSON.parse(credentialsJson);

  // Create JWT for Google API authentication
  const jwt = await createJWT(credentials);
  
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
    throw new Error(`Google token request failed: ${tokenResponse.status} - ${errorText}`);
  }

  const tokenData = await tokenResponse.json();
  
  if (!tokenData.access_token) {
    throw new Error('No access token received from Google');
  }

  // Append data to Google Sheets
  const spreadsheetId = '1dq2OElLgo9xLJymmlimegZfaSFp3I1tueadvEha5HSc';
  const range = 'Sheet1!A:E';

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
      body: JSON.stringify({ values }),
    }
  );

  if (!sheetsResponse.ok) {
    const error = await sheetsResponse.text();
    throw new Error(`Google Sheets API error: ${sheetsResponse.status} - ${error}`);
  }
}

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