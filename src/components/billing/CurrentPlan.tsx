import React from 'react';
import { format } from 'date-fns';
import { Subscription } from '../../types';
import { plans } from '../../constants/billing';

interface CurrentPlanProps {
  subscription: Subscription | null;
}

const CurrentPlan: React.FC<CurrentPlanProps> = ({ subscription }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">Current Plan</h2>
      {subscription ? (
        <div>
          <p className="text-lg font-medium">
            {plans.find((p) => p.id === subscription.plan_id)?.name || 'Unknown Plan'}
          </p>
          <p className="text-gray-600">
            Next billing date:{' '}
            {format(new Date(subscription.current_period_end), 'MMMM d, yyyy')}
          </p>
        </div>
      ) : (
        <p className="text-gray-600">No active subscription</p>
      )}
    </div>
  );
}

export default CurrentPlan;