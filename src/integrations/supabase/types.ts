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
      cart_items: {
        Row: {
          created_at: string | null
          id: string
          menu_item_id: string | null
          quantity: number
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          menu_item_id?: string | null
          quantity?: number
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          menu_item_id?: string | null
          quantity?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cart_items_menu_item_id_fkey"
            columns: ["menu_item_id"]
            isOneToOne: false
            referencedRelation: "menu_items"
            referencedColumns: ["id"]
          },
        ]
      }
      demandes_carburant: {
        Row: {
          date_demande: string | null
          date_modification: string | null
          id: string
          id_utilisateur: string | null
          id_vehicule: string | null
          km_compteur: number
          mission: string
          quantite_demandee: number
          quantite_servie: number | null
          raison: string
          site: string
          statut: Database["public"]["Enums"]["statut_demande"] | null
        }
        Insert: {
          date_demande?: string | null
          date_modification?: string | null
          id?: string
          id_utilisateur?: string | null
          id_vehicule?: string | null
          km_compteur: number
          mission: string
          quantite_demandee: number
          quantite_servie?: number | null
          raison: string
          site: string
          statut?: Database["public"]["Enums"]["statut_demande"] | null
        }
        Update: {
          date_demande?: string | null
          date_modification?: string | null
          id?: string
          id_utilisateur?: string | null
          id_vehicule?: string | null
          km_compteur?: number
          mission?: string
          quantite_demandee?: number
          quantite_servie?: number | null
          raison?: string
          site?: string
          statut?: Database["public"]["Enums"]["statut_demande"] | null
        }
        Relationships: [
          {
            foreignKeyName: "demandes_carburant_id_utilisateur_fkey"
            columns: ["id_utilisateur"]
            isOneToOne: false
            referencedRelation: "utilisateurs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "demandes_carburant_id_vehicule_fkey"
            columns: ["id_vehicule"]
            isOneToOne: false
            referencedRelation: "vehicules"
            referencedColumns: ["id"]
          },
        ]
      }
      fuel_users: {
        Row: {
          auth_user_id: string | null
          created_at: string
          created_by: string | null
          email: string
          full_name: string
          id: string
          role: string
          updated_at: string
        }
        Insert: {
          auth_user_id?: string | null
          created_at?: string
          created_by?: string | null
          email: string
          full_name: string
          id?: string
          role: string
          updated_at?: string
        }
        Update: {
          auth_user_id?: string | null
          created_at?: string
          created_by?: string | null
          email?: string
          full_name?: string
          id?: string
          role?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fuel_users_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "fuel_users"
            referencedColumns: ["id"]
          },
        ]
      }
      justificatifs: {
        Row: {
          date_upload: string | null
          id: string
          id_demande: string | null
          nom_fichier: string
          taille_fichier: number | null
          type_fichier: string
          url_fichier: string
        }
        Insert: {
          date_upload?: string | null
          id?: string
          id_demande?: string | null
          nom_fichier: string
          taille_fichier?: number | null
          type_fichier: string
          url_fichier: string
        }
        Update: {
          date_upload?: string | null
          id?: string
          id_demande?: string | null
          nom_fichier?: string
          taille_fichier?: number | null
          type_fichier?: string
          url_fichier?: string
        }
        Relationships: [
          {
            foreignKeyName: "justificatifs_id_demande_fkey"
            columns: ["id_demande"]
            isOneToOne: false
            referencedRelation: "demandes_carburant"
            referencedColumns: ["id"]
          },
        ]
      }
      logs: {
        Row: {
          action: string
          date_action: string | null
          details: string | null
          id: string
          utilisateur_id: string | null
        }
        Insert: {
          action: string
          date_action?: string | null
          details?: string | null
          id?: string
          utilisateur_id?: string | null
        }
        Update: {
          action?: string
          date_action?: string | null
          details?: string | null
          id?: string
          utilisateur_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "logs_utilisateur_id_fkey"
            columns: ["utilisateur_id"]
            isOneToOne: false
            referencedRelation: "utilisateurs"
            referencedColumns: ["id"]
          },
        ]
      }
      menu_items: {
        Row: {
          category: string | null
          created_at: string | null
          description: string | null
          id: string
          image_url: string | null
          is_available: boolean | null
          name: string
          price: number
          restaurant_id: string | null
          updated_at: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          is_available?: boolean | null
          name: string
          price: number
          restaurant_id?: string | null
          updated_at?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          is_available?: boolean | null
          name?: string
          price?: number
          restaurant_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "menu_items_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string | null
          customer_email: string | null
          customer_name: string
          customer_phone: string
          delivery_address: string | null
          delivery_latitude: number | null
          delivery_longitude: number | null
          id: string
          items: Json
          restaurant_id: string | null
          status: string | null
          total_amount: number
          transaction_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          customer_email?: string | null
          customer_name: string
          customer_phone: string
          delivery_address?: string | null
          delivery_latitude?: number | null
          delivery_longitude?: number | null
          id?: string
          items: Json
          restaurant_id?: string | null
          status?: string | null
          total_amount: number
          transaction_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          customer_email?: string | null
          customer_name?: string
          customer_phone?: string
          delivery_address?: string | null
          delivery_latitude?: number | null
          delivery_longitude?: number | null
          id?: string
          items?: Json
          restaurant_id?: string | null
          status?: string | null
          total_amount?: number
          transaction_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string
          full_name: string | null
          id: string
          phone: string | null
          role: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email: string
          full_name?: string | null
          id: string
          phone?: string | null
          role?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          role?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      push_tokens: {
        Row: {
          created_at: string | null
          device_type: string | null
          id: string
          token: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          device_type?: string | null
          id?: string
          token: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          device_type?: string | null
          id?: string
          token?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      restaurants: {
        Row: {
          address: string
          created_at: string | null
          cuisine_type: string | null
          delivery_fee: number | null
          delivery_time: string | null
          description: string | null
          id: string
          image_url: string | null
          is_open: boolean | null
          latitude: number | null
          longitude: number | null
          name: string
          phone: string | null
          rating: number | null
          updated_at: string | null
        }
        Insert: {
          address: string
          created_at?: string | null
          cuisine_type?: string | null
          delivery_fee?: number | null
          delivery_time?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          is_open?: boolean | null
          latitude?: number | null
          longitude?: number | null
          name: string
          phone?: string | null
          rating?: number | null
          updated_at?: string | null
        }
        Update: {
          address?: string
          created_at?: string | null
          cuisine_type?: string | null
          delivery_fee?: number | null
          delivery_time?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          is_open?: boolean | null
          latitude?: number | null
          longitude?: number | null
          name?: string
          phone?: string | null
          rating?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      types_vehicules: {
        Row: {
          date_creation: string | null
          id: string
          libelle: string
          seuil_conso_par_km: number
        }
        Insert: {
          date_creation?: string | null
          id?: string
          libelle: string
          seuil_conso_par_km?: number
        }
        Update: {
          date_creation?: string | null
          id?: string
          libelle?: string
          seuil_conso_par_km?: number
        }
        Relationships: []
      }
      utilisateurs: {
        Row: {
          actif: boolean | null
          date_creation: string | null
          email: string
          id: string
          nom: string
          prenom: string | null
          role: Database["public"]["Enums"]["user_role"]
        }
        Insert: {
          actif?: boolean | null
          date_creation?: string | null
          email: string
          id: string
          nom: string
          prenom?: string | null
          role?: Database["public"]["Enums"]["user_role"]
        }
        Update: {
          actif?: boolean | null
          date_creation?: string | null
          email?: string
          id?: string
          nom?: string
          prenom?: string | null
          role?: Database["public"]["Enums"]["user_role"]
        }
        Relationships: []
      }
      validations: {
        Row: {
          commentaire: string | null
          date_validation: string | null
          id: string
          id_demande: string | null
          niveau_validation: number
          statut_validation: Database["public"]["Enums"]["statut_validation"]
          valide_par: string | null
        }
        Insert: {
          commentaire?: string | null
          date_validation?: string | null
          id?: string
          id_demande?: string | null
          niveau_validation: number
          statut_validation: Database["public"]["Enums"]["statut_validation"]
          valide_par?: string | null
        }
        Update: {
          commentaire?: string | null
          date_validation?: string | null
          id?: string
          id_demande?: string | null
          niveau_validation?: number
          statut_validation?: Database["public"]["Enums"]["statut_validation"]
          valide_par?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "validations_id_demande_fkey"
            columns: ["id_demande"]
            isOneToOne: false
            referencedRelation: "demandes_carburant"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "validations_valide_par_fkey"
            columns: ["valide_par"]
            isOneToOne: false
            referencedRelation: "utilisateurs"
            referencedColumns: ["id"]
          },
        ]
      }
      vehicules: {
        Row: {
          actif: boolean | null
          date_creation: string | null
          id: string
          id_type: string | null
          immatriculation: string
        }
        Insert: {
          actif?: boolean | null
          date_creation?: string | null
          id?: string
          id_type?: string | null
          immatriculation: string
        }
        Update: {
          actif?: boolean | null
          date_creation?: string | null
          id?: string
          id_type?: string | null
          immatriculation?: string
        }
        Relationships: [
          {
            foreignKeyName: "vehicules_id_type_fkey"
            columns: ["id_type"]
            isOneToOne: false
            referencedRelation: "types_vehicules"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_role: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      log_action: {
        Args: { user_id: string; action_text: string; details_text?: string }
        Returns: undefined
      }
    }
    Enums: {
      statut_demande:
        | "en_attente"
        | "valide_superviseur"
        | "valide_pompiste"
        | "valide_dg"
        | "rejete"
      statut_validation: "approuve" | "rejete"
      user_role:
        | "chauffeur"
        | "pompiste"
        | "superviseur"
        | "directeur"
        | "admin"
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
    Enums: {
      statut_demande: [
        "en_attente",
        "valide_superviseur",
        "valide_pompiste",
        "valide_dg",
        "rejete",
      ],
      statut_validation: ["approuve", "rejete"],
      user_role: ["chauffeur", "pompiste", "superviseur", "directeur", "admin"],
    },
  },
} as const
