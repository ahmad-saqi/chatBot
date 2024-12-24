import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { PaymentHistory as PaymentType, Subscription } from '../types';
import toast from 'react-hot-toast';
import CurrentPlan from '../components/billing/CurrentPlan';
import PlanCard from '../components/billing/PlanCard';
import PaymentHistory from '../components/billing/PaymentHistory';
import { plans } from '../constants/billing';

const Billing = () => {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [payments, setPayments] = useState<PaymentType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBillingInfo();
  }, []);

  const loadBillingInfo = async () => {
    try {
      const { data: authUser } = await supabase.auth.getUser();
      if (!authUser.user) return;

      // Load subscription
      const { data: sub, error: subError } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', authUser.user.id)
        .single();

      if (subError && subError.code !== 'PGRST116') throw subError;
      setSubscription(sub);

      // Load payment history
      const { data: paymentData, error: paymentError } = await supabase
        .from('payments')
        .select('*')
        .eq('user_id', authUser.user.id)
        .order('created_at', { ascending: false });

      if (paymentError) throw paymentError;
      setPayments(paymentData || []);
    } catch (error) {
      toast.error('Error loading billing information');
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async (planId: string) => {
    // In a real implementation, this would integrate with Stripe
    toast.success('Subscription feature coming soon!');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8">Billing & Subscription</h1>

      <CurrentPlan subscription={subscription} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-8">
        {plans.map((plan) => (
          <PlanCard
            key={plan.id}
            {...plan}
            onSubscribe={handleSubscribe}
          />
        ))}
      </div>

      <PaymentHistory payments={payments} />
    </div>
  );
};

export default Billing;