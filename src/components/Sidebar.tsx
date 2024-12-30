import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  MessageSquare,
  User,
  CreditCard,
  LogOut,
  Plus,
  ChevronDown,
  ChevronUp,
  Trash2,
  LogOutIcon,
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

const Sidebar = () => {
  const navigate = useNavigate();
  const [showChatHistory, setShowChatHistory] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Mock data for previous chats
  const previousChats = [
    { id: 1, name: 'Chat with John' },
    { id: 2, name: 'Project Discussion' },
    { id: 3, name: 'Team Meeting' },
    { id: 4, name: 'Chat with Sarah' },
    { id: 5, name: 'Design Review' },
    { id: 6, name: 'Daily Standup' },
  ];

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/login');
    } catch (error) {
      toast.error('Error signing out');
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="w-64 h-full bg-white border-r border-gray-200 p-4">
      <div className="flex flex-col h-full">
        <Link
          to="/new-chat"
          className="flex items-center justify-center gap-2 bg-black text-white rounded-lg p-4 mb-4 hover:bg-gray-800"
        >
          <Plus size={20} />
          <span>New Chat</span>
        </Link>

        <nav className="space-y-2 flex-1">
          <div>
            <button
              onClick={() => setShowChatHistory(!showChatHistory)}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 w-full"
            >
              <MessageSquare size={20} />
              <span>Chats</span>
              {showChatHistory ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            {showChatHistory && (
              <ul className="mt-4 bg-gray-100 rounded-lg max-h-[calc(100vh-200px)] overflow-y-auto">
                {previousChats.map((chat) => (
                  <li key={chat.id}>
                    <div className="flex items-center justify-between gap-1 py-2 px-4 text-sm rounded-lg hover:bg-gray-100">
                      <Link to="/chat" className="flex-1">
                        {chat.name}
                      </Link>
                      <button>
                        <Trash2 size={16} className="text-red-500" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </nav>

        <div className="relative mt-auto" ref={dropdownRef}>
          <button
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 w-full"
          >
            <User size={20} />
            <span>Profile</span>
            {showProfileDropdown ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
          </button>
          {showProfileDropdown && (
            <ul className="absolute left-10 -top-32 w-44 bg-white border border-gray-200 rounded-lg mt-2 shadow-lg">
              <li>
                <Link
                  to="/profile"
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100"
                >
                  <User size={20} />
                  <span>Profile</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/billing"
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100"
                >
                  <CreditCard size={20} />
                  <span>Billing</span>
                </Link>
              </li>
              <li>
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 text-red-500"
                >
                  <LogOutIcon />
                  <span>Logout</span>
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
