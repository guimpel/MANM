export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      accounts_payable: {
        Row: {
          category: string | null
          created_at: string | null
          description: string
          due_date: string
          id: string
          payment_date: string | null
          status: string
          supplier: string | null
          updated_at: string | null
          user_id: string
          value: number
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description: string
          due_date: string
          id?: string
          payment_date?: string | null
          status?: string
          supplier?: string | null
          updated_at?: string | null
          user_id: string
          value: number
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string
          due_date?: string
          id?: string
          payment_date?: string | null
          status?: string
          supplier?: string | null
          updated_at?: string | null
          user_id?: string
          value?: number
        }
        Relationships: []
      }
      cities: {
        Row: {
          active: boolean | null
          created_at: string | null
          id: string
          name: string
          state: string
          state_code: string
        }
        Insert: {
          active?: boolean | null
          created_at?: string | null
          id?: string
          name: string
          state: string
          state_code: string
        }
        Update: {
          active?: boolean | null
          created_at?: string | null
          id?: string
          name?: string
          state?: string
          state_code?: string
        }
        Relationships: []
      }
      fleet_requests: {
        Row: {
          client_id: string
          created_at: string
          deadline: string | null
          description: string
          id: string
          location_city_id: string | null
          priority: string | null
          service_type: string
          service_type_id: string | null
          status: string
          vehicle_id: string
        }
        Insert: {
          client_id: string
          created_at?: string
          deadline?: string | null
          description: string
          id?: string
          location_city_id?: string | null
          priority?: string | null
          service_type: string
          service_type_id?: string | null
          status?: string
          vehicle_id: string
        }
        Update: {
          client_id?: string
          created_at?: string
          deadline?: string | null
          description?: string
          id?: string
          location_city_id?: string | null
          priority?: string | null
          service_type?: string
          service_type_id?: string | null
          status?: string
          vehicle_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fleet_requests_location_city_id_fkey"
            columns: ["location_city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fleet_requests_service_type_id_fkey"
            columns: ["service_type_id"]
            isOneToOne: false
            referencedRelation: "service_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fleet_requests_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      integrator_users: {
        Row: {
          active: boolean
          cpf: string
          created_at: string | null
          email: string
          id: string
          name: string
          password: string
          role: string
          updated_at: string | null
        }
        Insert: {
          active?: boolean
          cpf: string
          created_at?: string | null
          email: string
          id?: string
          name: string
          password: string
          role?: string
          updated_at?: string | null
        }
        Update: {
          active?: boolean
          cpf?: string
          created_at?: string | null
          email?: string
          id?: string
          name?: string
          password?: string
          role?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      plans: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          max_fleet: number | null
          max_quotes: number | null
          name: string
          price: number
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          max_fleet?: number | null
          max_quotes?: number | null
          name: string
          price: number
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          max_fleet?: number | null
          max_quotes?: number | null
          name?: string
          price?: number
        }
        Relationships: []
      }
      provider_profiles: {
        Row: {
          address: string | null
          business_area: string | null
          city: string | null
          city_id: string | null
          cnpj: string
          company_name: string
          created_at: string | null
          email: string | null
          id: string
          phone: string | null
          phone_formatted: string | null
          pix_key: string | null
          pix_type: string | null
          rating: number | null
          service_types: string[] | null
          services: Json | null
          state: string | null
          total_services: number | null
          updated_at: string | null
          user_id: string
          verified_email: boolean | null
          verified_phone: boolean | null
          whatsapp: string | null
          whatsapp_formatted: string | null
          zip_code: string | null
        }
        Insert: {
          address?: string | null
          business_area?: string | null
          city?: string | null
          city_id?: string | null
          cnpj: string
          company_name: string
          created_at?: string | null
          email?: string | null
          id?: string
          phone?: string | null
          phone_formatted?: string | null
          pix_key?: string | null
          pix_type?: string | null
          rating?: number | null
          service_types?: string[] | null
          services?: Json | null
          state?: string | null
          total_services?: number | null
          updated_at?: string | null
          user_id: string
          verified_email?: boolean | null
          verified_phone?: boolean | null
          whatsapp?: string | null
          whatsapp_formatted?: string | null
          zip_code?: string | null
        }
        Update: {
          address?: string | null
          business_area?: string | null
          city?: string | null
          city_id?: string | null
          cnpj?: string
          company_name?: string
          created_at?: string | null
          email?: string | null
          id?: string
          phone?: string | null
          phone_formatted?: string | null
          pix_key?: string | null
          pix_type?: string | null
          rating?: number | null
          service_types?: string[] | null
          services?: Json | null
          state?: string | null
          total_services?: number | null
          updated_at?: string | null
          user_id?: string
          verified_email?: boolean | null
          verified_phone?: boolean | null
          whatsapp?: string | null
          whatsapp_formatted?: string | null
          zip_code?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "provider_profiles_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
        ]
      }
      providers: {
        Row: {
          city: string | null
          company_name: string
          created_at: string
          id: string
          profile_completed: boolean | null
          services_offered: string[] | null
        }
        Insert: {
          city?: string | null
          company_name: string
          created_at?: string
          id: string
          profile_completed?: boolean | null
          services_offered?: string[] | null
        }
        Update: {
          city?: string | null
          company_name?: string
          created_at?: string
          id?: string
          profile_completed?: boolean | null
          services_offered?: string[] | null
        }
        Relationships: []
      }
      quote_items: {
        Row: {
          created_at: string | null
          description: string
          id: string
          quantity: number | null
          quote_id: string
          service_type_id: string | null
          total_price: number | null
          unit_price: number
        }
        Insert: {
          created_at?: string | null
          description: string
          id?: string
          quantity?: number | null
          quote_id: string
          service_type_id?: string | null
          total_price?: number | null
          unit_price: number
        }
        Update: {
          created_at?: string | null
          description?: string
          id?: string
          quantity?: number | null
          quote_id?: string
          service_type_id?: string | null
          total_price?: number | null
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "quote_items_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: false
            referencedRelation: "quotes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quote_items_service_type_id_fkey"
            columns: ["service_type_id"]
            isOneToOne: false
            referencedRelation: "service_types"
            referencedColumns: ["id"]
          },
        ]
      }
      quotes: {
        Row: {
          created_at: string
          id: string
          message: string | null
          price: number
          provider_id: string
          request_id: string
          status: string
        }
        Insert: {
          created_at?: string
          id?: string
          message?: string | null
          price: number
          provider_id: string
          request_id: string
          status?: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: string | null
          price?: number
          provider_id?: string
          request_id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "quotes_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "providers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quotes_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "fleet_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      service_orders: {
        Row: {
          created_at: string
          finished_at: string | null
          id: string
          paid_at: string | null
          payment_required: boolean | null
          quote_id: string
          started_at: string | null
          status: string
        }
        Insert: {
          created_at?: string
          finished_at?: string | null
          id?: string
          paid_at?: string | null
          payment_required?: boolean | null
          quote_id: string
          started_at?: string | null
          status?: string
        }
        Update: {
          created_at?: string
          finished_at?: string | null
          id?: string
          paid_at?: string | null
          payment_required?: boolean | null
          quote_id?: string
          started_at?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "service_orders_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: false
            referencedRelation: "quotes"
            referencedColumns: ["id"]
          },
        ]
      }
      service_requests: {
        Row: {
          client_id: string
          created_at: string | null
          description: string
          estimated_cost: number | null
          final_cost: number | null
          id: string
          provider_id: string | null
          service_type: string
          status: string
          updated_at: string | null
          vehicle: string
        }
        Insert: {
          client_id: string
          created_at?: string | null
          description: string
          estimated_cost?: number | null
          final_cost?: number | null
          id?: string
          provider_id?: string | null
          service_type: string
          status?: string
          updated_at?: string | null
          vehicle: string
        }
        Update: {
          client_id?: string
          created_at?: string | null
          description?: string
          estimated_cost?: number | null
          final_cost?: number | null
          id?: string
          provider_id?: string | null
          service_type?: string
          status?: string
          updated_at?: string | null
          vehicle?: string
        }
        Relationships: []
      }
      service_types: {
        Row: {
          active: boolean | null
          category: string
          created_at: string | null
          description: string | null
          id: string
          name: string
        }
        Insert: {
          active?: boolean | null
          category: string
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          active?: boolean | null
          category?: string
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          created_at: string
          first_name: string | null
          id: string
          last_name: string | null
          plan_id: string | null
          user_type: string
        }
        Insert: {
          created_at?: string
          first_name?: string | null
          id: string
          last_name?: string | null
          plan_id?: string | null
          user_type?: string
        }
        Update: {
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          plan_id?: string | null
          user_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_user_plan"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "plans"
            referencedColumns: ["id"]
          },
        ]
      }
      vehicles: {
        Row: {
          client_id: string
          created_at: string
          id: string
          model: string
          plate: string
          year: number
        }
        Insert: {
          client_id: string
          created_at?: string
          id?: string
          model: string
          plate: string
          year: number
        }
        Update: {
          client_id?: string
          created_at?: string
          id?: string
          model?: string
          plate?: string
          year?: number
        }
        Relationships: []
      }
    }
    Views: {
      provider_financial_summary: {
        Row: {
          provider_id: string | null
          total_approved: number | null
          total_quotes: number | null
          total_revenue: number | null
        }
        Relationships: [
          {
            foreignKeyName: "quotes_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "providers"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      approve_quote: {
        Args: { quote_id: string }
        Returns: string
      }
      create_fleet_request: {
        Args: {
          vehicle_id: string
          description: string
          service_type: string
          deadline?: string
        }
        Returns: string
      }
      finalize_service: {
        Args: { service_order_id: string }
        Returns: undefined
      }
      format_brazilian_phone: {
        Args: { phone_input: string }
        Returns: string
      }
      is_client: {
        Args: { user_id: string }
        Returns: boolean
      }
      is_integrator: {
        Args: { user_id: string }
        Returns: boolean
      }
      is_provider: {
        Args: { user_id: string }
        Returns: boolean
      }
      send_quote: {
        Args: { request_id: string; price: number; message?: string }
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
