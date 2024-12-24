export interface User {
  id: string;
  email: string;
  full_name: string;
  avatar_url: string;
  created_at: string;
  is_active: boolean;
}

export interface ChatMessage {
  id: string;
  user_id: string;
  content: string;
  is_bot: boolean;
  created_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  plan_id: string;
  status: 'active' | 'canceled' | 'expired';
  current_period_end: string;
}

export interface PaymentHistory {
  id: string;
  user_id: string;
  amount: number;
  status: 'succeeded' | 'failed';
  created_at: string;
}