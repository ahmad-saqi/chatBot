export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          is_active: boolean;
          created_at: string;
        };
      };
      messages: {
        Row: {
          id: string;
          user_id: string;
          content: string;
          is_bot: boolean;
          created_at: string;
        };
      };
      subscriptions: {
        Row: {
          id: string;
          user_id: string;
          plan_id: string;
          status: 'active' | 'canceled' | 'expired';
          current_period_end: string;
          created_at: string;
        };
      };
      payments: {
        Row: {
          id: string;
          user_id: string;
          amount: number;
          status: 'succeeded' | 'failed';
          created_at: string;
        };
      };
    };
  };
}