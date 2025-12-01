export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      bookings: {
        Row: {
          booking_status: string | null
          booking_type: string
          cab_id: string | null
          check_in_date: string | null
          check_out_date: string | null
          confirmation_number: string | null
          created_at: string | null
          dropoff_location: string | null
          event_id: string | null
          hotel_id: string | null
          id: string
          number_of_guests: number | null
          number_of_rooms: number | null
          payment_status: string | null
          pickup_date: string | null
          pickup_location: string | null
          pickup_time: string | null
          quantity: number | null
          special_requests: string | null
          total_price: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          booking_status?: string | null
          booking_type: string
          cab_id?: string | null
          check_in_date?: string | null
          check_out_date?: string | null
          confirmation_number?: string | null
          created_at?: string | null
          dropoff_location?: string | null
          event_id?: string | null
          hotel_id?: string | null
          id?: string
          number_of_guests?: number | null
          number_of_rooms?: number | null
          payment_status?: string | null
          pickup_date?: string | null
          pickup_location?: string | null
          pickup_time?: string | null
          quantity?: number | null
          special_requests?: string | null
          total_price: number
          updated_at?: string | null
          user_id: string
        }
        Update: {
          booking_status?: string | null
          booking_type?: string
          cab_id?: string | null
          check_in_date?: string | null
          check_out_date?: string | null
          confirmation_number?: string | null
          created_at?: string | null
          dropoff_location?: string | null
          event_id?: string | null
          hotel_id?: string | null
          id?: string
          number_of_guests?: number | null
          number_of_rooms?: number | null
          payment_status?: string | null
          pickup_date?: string | null
          pickup_location?: string | null
          pickup_time?: string | null
          quantity?: number | null
          special_requests?: string | null
          total_price?: number
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_cab_id_fkey"
            columns: ["cab_id"]
            isOneToOne: false
            referencedRelation: "cabs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_hotel_id_fkey"
            columns: ["hotel_id"]
            isOneToOne: false
            referencedRelation: "hotels"
            referencedColumns: ["id"]
          },
        ]
      }
      cabs: {
        Row: {
          available_vehicles: number | null
          created_at: string | null
          description: string | null
          id: string
          image_url: string | null
          name: string
          price_per_km: number
          rating: number | null
          total_vehicles: number | null
          updated_at: string | null
          vehicle_type: string | null
        }
        Insert: {
          available_vehicles?: number | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          name: string
          price_per_km: number
          rating?: number | null
          total_vehicles?: number | null
          updated_at?: string | null
          vehicle_type?: string | null
        }
        Update: {
          available_vehicles?: number | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          name?: string
          price_per_km?: number
          rating?: number | null
          total_vehicles?: number | null
          updated_at?: string | null
          vehicle_type?: string | null
        }
        Relationships: []
      }
      events: {
        Row: {
          available_tickets: number | null
          category: string | null
          city: string | null
          created_at: string | null
          description: string | null
          event_date: string
          event_time: string | null
          id: string
          images: Json | null
          name: string
          organizer_name: string | null
          organizer_phone: string | null
          price_per_ticket: number
          rating: number | null
          total_tickets: number | null
          updated_at: string | null
          venue: string | null
        }
        Insert: {
          available_tickets?: number | null
          category?: string | null
          city?: string | null
          created_at?: string | null
          description?: string | null
          event_date: string
          event_time?: string | null
          id?: string
          images?: Json | null
          name: string
          organizer_name?: string | null
          organizer_phone?: string | null
          price_per_ticket: number
          rating?: number | null
          total_tickets?: number | null
          updated_at?: string | null
          venue?: string | null
        }
        Update: {
          available_tickets?: number | null
          category?: string | null
          city?: string | null
          created_at?: string | null
          description?: string | null
          event_date?: string
          event_time?: string | null
          id?: string
          images?: Json | null
          name?: string
          organizer_name?: string | null
          organizer_phone?: string | null
          price_per_ticket?: number
          rating?: number | null
          total_tickets?: number | null
          updated_at?: string | null
          venue?: string | null
        }
        Relationships: []
      }
      hotels: {
        Row: {
          amenities: Json | null
          available_rooms: number | null
          city: string | null
          created_at: string | null
          description: string | null
          email: string | null
          id: string
          images: Json | null
          location: string
          name: string
          phone: string | null
          price_per_night: number
          rating: number | null
          total_rooms: number | null
          updated_at: string | null
        }
        Insert: {
          amenities?: Json | null
          available_rooms?: number | null
          city?: string | null
          created_at?: string | null
          description?: string | null
          email?: string | null
          id?: string
          images?: Json | null
          location: string
          name: string
          phone?: string | null
          price_per_night: number
          rating?: number | null
          total_rooms?: number | null
          updated_at?: string | null
        }
        Update: {
          amenities?: Json | null
          available_rooms?: number | null
          city?: string | null
          created_at?: string | null
          description?: string | null
          email?: string | null
          id?: string
          images?: Json | null
          location?: string
          name?: string
          phone?: string | null
          price_per_night?: number
          rating?: number | null
          total_rooms?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          booking_id: string
          created_at: string | null
          currency: string | null
          id: string
          payment_date: string | null
          payment_method: string | null
          receipt_url: string | null
          stripe_payment_id: string | null
          transaction_status: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          amount: number
          booking_id: string
          created_at?: string | null
          currency?: string | null
          id?: string
          payment_date?: string | null
          payment_method?: string | null
          receipt_url?: string | null
          stripe_payment_id?: string | null
          transaction_status?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          booking_id?: string
          created_at?: string | null
          currency?: string | null
          id?: string
          payment_date?: string | null
          payment_method?: string | null
          receipt_url?: string | null
          stripe_payment_id?: string | null
          transaction_status?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          address: string | null
          city: string | null
          created_at: string | null
          full_name: string | null
          id: string
          phone: string | null
          profile_picture_url: string | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          created_at?: string | null
          full_name?: string | null
          id: string
          phone?: string | null
          profile_picture_url?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          profile_picture_url?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
