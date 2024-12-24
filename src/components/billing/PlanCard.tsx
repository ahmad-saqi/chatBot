import React from 'react';
import { Check } from 'lucide-react';

interface PlanProps {
  id: string;
  name: string;
  price: number;
  features: string[];
  onSubscribe: (planId: string) => void;
}

const PlanCard: React.FC<PlanProps> = ({ id, name, price, features, onSubscribe }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 flex flex-col">
      <h3 className="text-xl font-semibold mb-2">{name}</h3>
      <p className="text-3xl font-bold mb-4">${price}/mo</p>
      <ul className="space-y-2 mb-6 flex-1">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <Check size={20} className="text-green-500 mr-2" />
            {feature}
          </li>
        ))}
      </ul>
      <button
        onClick={() => onSubscribe(id)}
        className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
      >
        Subscribe
      </button>
    </div>
  );
}

export default PlanCard;