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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      gallery: {
        Row: {
          category: string
          created_at: string
          description: string | null
          id: string
          institution: Database["public"]["Enums"]["institution_type"] | null
          is_featured: boolean | null
          media_type: string
          media_url: string
          title: string
        }
        Insert: {
          category: string
          created_at?: string
          description?: string | null
          id?: string
          institution?: Database["public"]["Enums"]["institution_type"] | null
          is_featured?: boolean | null
          media_type: string
          media_url: string
          title: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          id?: string
          institution?: Database["public"]["Enums"]["institution_type"] | null
          is_featured?: boolean | null
          media_type?: string
          media_url?: string
          title?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          address: string | null
          avatar_url: string | null
          created_at: string
          full_name: string
          id: string
          phone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          address?: string | null
          avatar_url?: string | null
          created_at?: string
          full_name: string
          id?: string
          phone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          address?: string | null
          avatar_url?: string | null
          created_at?: string
          full_name?: string
          id?: string
          phone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      registrations: {
        Row: {
          birth_certificate_url: string | null
          created_at: string
          family_card_url: string | null
          id: string
          institution: Database["public"]["Enums"]["institution_type"]
          notes: string | null
          parent_address: string
          parent_email: string
          parent_name: string
          parent_occupation: string | null
          parent_phone: string
          payment_proof_url: string | null
          photo_url: string | null
          previous_school: string | null
          registration_number: string | null
          report_card_url: string | null
          status: Database["public"]["Enums"]["registration_status"]
          student_birth_date: string
          student_birth_place: string
          student_gender: string
          student_name: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          birth_certificate_url?: string | null
          created_at?: string
          family_card_url?: string | null
          id?: string
          institution: Database["public"]["Enums"]["institution_type"]
          notes?: string | null
          parent_address: string
          parent_email: string
          parent_name: string
          parent_occupation?: string | null
          parent_phone: string
          payment_proof_url?: string | null
          photo_url?: string | null
          previous_school?: string | null
          registration_number?: string | null
          report_card_url?: string | null
          status?: Database["public"]["Enums"]["registration_status"]
          student_birth_date: string
          student_birth_place: string
          student_gender: string
          student_name: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          birth_certificate_url?: string | null
          created_at?: string
          family_card_url?: string | null
          id?: string
          institution?: Database["public"]["Enums"]["institution_type"]
          notes?: string | null
          parent_address?: string
          parent_email?: string
          parent_name?: string
          parent_occupation?: string | null
          parent_phone?: string
          payment_proof_url?: string | null
          photo_url?: string | null
          previous_school?: string | null
          registration_number?: string | null
          report_card_url?: string | null
          status?: Database["public"]["Enums"]["registration_status"]
          student_birth_date?: string
          student_birth_place?: string
          student_gender?: string
          student_name?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      student_progress: {
        Row: {
          academic_year: string | null
          created_at: string
          id: string
          notes: string | null
          recorded_by: string | null
          score: number | null
          semester: string | null
          student_id: string
          subject: string
          type: string
        }
        Insert: {
          academic_year?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          recorded_by?: string | null
          score?: number | null
          semester?: string | null
          student_id: string
          subject: string
          type: string
        }
        Update: {
          academic_year?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          recorded_by?: string | null
          score?: number | null
          semester?: string | null
          student_id?: string
          subject?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "student_progress_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      students: {
        Row: {
          birth_date: string
          birth_place: string
          created_at: string
          full_name: string
          gender: string
          grade: string | null
          id: string
          institution: Database["public"]["Enums"]["institution_type"]
          nis: string | null
          parent_id: string | null
          photo_url: string | null
          updated_at: string
        }
        Insert: {
          birth_date: string
          birth_place: string
          created_at?: string
          full_name: string
          gender: string
          grade?: string | null
          id?: string
          institution: Database["public"]["Enums"]["institution_type"]
          nis?: string | null
          parent_id?: string | null
          photo_url?: string | null
          updated_at?: string
        }
        Update: {
          birth_date?: string
          birth_place?: string
          created_at?: string
          full_name?: string
          gender?: string
          grade?: string | null
          id?: string
          institution?: Database["public"]["Enums"]["institution_type"]
          nis?: string | null
          parent_id?: string | null
          photo_url?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "parent"
      institution_type: "dta" | "smp" | "sma" | "pesantren"
      registration_status: "pending" | "review" | "accepted" | "rejected"
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
    Enums: {
      app_role: ["admin", "parent"],
      institution_type: ["dta", "smp", "sma", "pesantren"],
      registration_status: ["pending", "review", "accepted", "rejected"],
    },
  },
} as const
