import React from 'react';
import { CreditCard } from 'lucide-react';
import { format } from 'date-fns';
import { PaymentHistory as PaymentType } from '../../types';

interface PaymentHistoryProps {
  payments: PaymentType[];
}

const PaymentHistory: React.FC<PaymentHistoryProps> = ({ payments }) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="px-6 py-4 border-b">
        <h2 className="text-xl font-semibold">Payment History</h2>
      </div>
      <div className="divide-y">
        {payments.length > 0 ? (
          payments.map((payment) => (
            <div key={payment.id} className="px-6 py-4 flex justify-between items-center">
              <div className="flex items-center">
                <CreditCard className="h-6 w-6 mr-3 text-gray-400" />
                <div>
                  <p className="font-medium">${payment.amount.toFixed(2)}</p>
                  <p className="text-sm text-gray-500">
                    {format(new Date(payment.created_at), 'MMMM d, yyyy')}
                  </p>
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  payment.status === 'succeeded'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {payment.status}
              </span>
            </div>
          ))
        ) : (
          <div className="px-6 py-4 text-gray-500">No payment history available</div>
        )}
      </div>
    </div>
  );
}

export default PaymentHistory;