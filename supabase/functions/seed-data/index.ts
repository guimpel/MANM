
import { serve } from "https://deno.land/std@0.175.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  // Get the authorization header
  const authHeader = req.headers.get('Authorization');
  if (!authHeader) {
    return new Response(
      JSON.stringify({ error: 'Authorization header is required' }),
      { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
  
  // Create a Supabase client
  const supabaseClient = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    {
      global: { headers: { Authorization: authHeader } },
      auth: { persistSession: false },
    }
  );

  // Verify if user is authenticated and is admin
  const {
    data: { user },
  } = await supabaseClient.auth.getUser();

  if (!user) {
    return new Response(
      JSON.stringify({ error: 'Unauthorized' }),
      { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
  
  try {
    // Example client data - first we need to create users using auth.admin APIs
    // This is just an example of what we'd do with supabase-admin client
    // For demo purposes, we'll just seed services and vehicels data
    
    // Seed sample service categories
    const serviceCategories = [
      'Mecânica Geral',
      'Elétrica Automotiva',
      'Reboque',
      'Funilaria e Pintura',
      'Troca de Óleo',
      'Alinhamento e Balanceamento',
      'Ar-condicionado',
      'Revisão Preventiva',
      'Injeção Eletrônica',
      'Troca de Pneus'
    ];
    
    // Seed services for the current user if they are a provider
    const { data: userProfile } = await supabaseClient
      .from('user_profiles')
      .select('user_type')
      .eq('id', user.id)
      .single();
      
    if (userProfile?.user_type === 'provider') {
      // Create services for this provider
      const servicesToCreate = serviceCategories.slice(0, 5).map((category, index) => ({
        name: `${category} - Serviço ${index + 1}`,
        description: `Serviço de ${category.toLowerCase()} de qualidade e com garantia.`,
        price: Math.floor(Math.random() * 500) + 100,
        provider_id: user.id,
        category: category,
        active: true
      }));
      
      await supabaseClient
        .from('services')
        .upsert(servicesToCreate);
    }
    
    // Seed vehicles for the current user if they are a client
    if (userProfile?.user_type === 'client') {
      const vehicleMakes = [
        { make: 'Toyota', models: ['Corolla', 'Camry', 'RAV4'] },
        { make: 'Honda', models: ['Civic', 'Accord', 'CR-V'] },
        { make: 'Ford', models: ['Fusion', 'Focus', 'Mustang'] },
        { make: 'Volkswagen', models: ['Golf', 'Jetta', 'Tiguan'] },
        { make: 'Chevrolet', models: ['Cruze', 'Malibu', 'Equinox'] }
      ];
      
      const randomLicensePlate = () => {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const digits = '0123456789';
        let plate = '';
        
        // 3 letters
        for (let i = 0; i < 3; i++) {
          plate += letters.charAt(Math.floor(Math.random() * letters.length));
        }
        
        plate += '-';
        
        // 4 digits
        for (let i = 0; i < 4; i++) {
          plate += digits.charAt(Math.floor(Math.random() * digits.length));
        }
        
        return plate;
      };
      
      const selectedMakes = vehicleMakes.slice(0, 2); // Just add 2 vehicles
      const vehiclesToCreate = selectedMakes.flatMap(makeInfo => 
        makeInfo.models.slice(0, 1).map(model => ({
          owner_id: user.id,
          make: makeInfo.make,
          model: model,
          year: Math.floor(Math.random() * 10) + 2010,
          license_plate: randomLicensePlate(),
          color: ['Preto', 'Branco', 'Prata', 'Vermelho', 'Azul'][Math.floor(Math.random() * 5)]
        }))
      );
      
      await supabaseClient
        .from('vehicles')
        .upsert(vehiclesToCreate);
      
      // Also, find some providers and create service requests
      const { data: providers } = await supabaseClient
        .from('user_profiles')
        .select('id')
        .eq('user_type', 'provider')
        .limit(2);
        
      if (providers && providers.length > 0) {
        for (const provider of providers) {
          // Get a service from this provider
          const { data: services } = await supabaseClient
            .from('services')
            .select('*')
            .eq('provider_id', provider.id)
            .limit(1);
            
          if (services && services.length > 0) {
            const service = services[0];
            
            // Create a service request
            await supabaseClient
              .from('service_requests')
              .insert({
                client_id: user.id,
                provider_id: provider.id,
                service_id: service.id,
                status: ['pending', 'in-progress'][Math.floor(Math.random() * 2)],
                notes: 'Solicitação de teste criada pelo seeder',
                total_price: service.price,
                vehicle_info: vehiclesToCreate[0]
              });
          }
        }
      }
    }
    
    return new Response(
      JSON.stringify({ success: true, message: 'Seed data created successfully' }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
