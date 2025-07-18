
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

serve(async (req: Request) => {
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders, status: 204 });
  }

  // Check if this is an authorized request
  const authHeader = req.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const token = authHeader.split(' ')[1];
  
  try {
    // Create Supabase admin client
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false } }
    );
    
    // Free plan id for test users
    const freePlanId = '00000000-0000-0000-0000-000000000000';
    
    // Create test users
    const testUsers = [
      {
        email: 'fornecedor@imovan.com',
        password: 'fornecedor123',
        user_metadata: {
          first_name: 'Test',
          last_name: 'Fornecedor',
          user_type: 'provider'
        }
      },
      {
        email: 'frotista@imovan.com',
        password: 'frotista123',
        user_metadata: {
          first_name: 'Test',
          last_name: 'Frotista',
          user_type: 'client'
        }
      },
      {
        email: 'guimpel@imovan.com',
        password: '123456ag',
        user_metadata: {
          first_name: 'Admin',
          last_name: 'Root',
          user_type: 'integrator'
        }
      }
    ];

    const results = [];

    // Create each user
    for (const user of testUsers) {
      console.log(`Attempting to create or validate user: ${user.email}`);
      
      // Check if user already exists
      const { data: existingUser } = await supabaseAdmin.auth.admin.getUserByEmail(user.email);
      
      if (existingUser) {
        console.log(`User ${user.email} already exists with ID: ${existingUser.user.id}`);
        
        // Check if user profile exists
        const { data: userProfile } = await supabaseAdmin
          .from('user_profiles')
          .select('*')
          .eq('id', existingUser.user.id)
          .single();
          
        if (!userProfile) {
          console.log(`Creating missing user_profile for ${user.email}`);
          // Create user profile if it doesn't exist
          await supabaseAdmin
            .from('user_profiles')
            .insert({
              id: existingUser.user.id,
              user_type: user.user_metadata.user_type,
              first_name: user.user_metadata.first_name,
              last_name: user.user_metadata.last_name,
              plan_id: freePlanId
            });
        }
        
        results.push({
          email: user.email,
          success: true,
          message: 'User already exists',
          user_id: existingUser.user.id
        });
        continue;
      }

      // Create the user if they don't exist
      const { data, error } = await supabaseAdmin.auth.admin.createUser({
        email: user.email,
        password: user.password,
        email_confirm: true,
        user_metadata: user.user_metadata
      });

      if (error) {
        console.error(`Error creating user ${user.email}:`, error);
        results.push({
          email: user.email,
          success: false,
          error: error.message
        });
      } else {
        console.log(`User ${user.email} created successfully with ID: ${data.user.id}`);
        
        // Ensure user profile exists
        const { error: profileError } = await supabaseAdmin
          .from('user_profiles')
          .select()
          .eq('id', data.user.id)
          .single();
          
        if (profileError) {
          console.log(`Creating user_profile for ${user.email}`);
          // Create user profile manually if the trigger didn't work
          await supabaseAdmin
            .from('user_profiles')
            .insert({
              id: data.user.id,
              user_type: user.user_metadata.user_type,
              first_name: user.user_metadata.first_name,
              last_name: user.user_metadata.last_name,
              plan_id: freePlanId
            });
        }

        results.push({
          email: user.email,
          success: true,
          user_id: data.user.id
        });
      }
    }

    return new Response(JSON.stringify({ results }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in setup-test-users:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
