import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MessageSquare, User, CreditCard, LogOut, Plus } from 'lucide-react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/login');
    } catch (error) {
      toast.error('Error signing out');
    }
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4">
      <div className="flex flex-col h-full">
        <Link to="/new-chat" className="flex items-center justify-center gap-2 bg-black text-white rounded-lg p-4 mb-4 hover:bg-gray-800">
          <Plus size={20} />
          <span>New Chat</span>
        </Link>
        
        <nav className="space-y-2 flex-1">
          <Link to="/chat" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100">
            <MessageSquare size={20} />
            <span>Chats</span>
          </Link>
          <Link to="/profile" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100">
            <User size={20} />
            <span>Profile</span>
          </Link>
          <Link to="/billing" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100">
            <CreditCard size={20} />
            <span>Billing</span>
          </Link>
        </nav>

        <button
          onClick={handleSignOut}
          className="flex items-center gap-2 p-2 text-red-600 hover:bg-red-50 rounded-lg mt-auto"
        >
          <LogOut size={20} />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;