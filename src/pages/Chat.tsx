import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { Send } from 'lucide-react';
import { ChatMessage } from '../types';
import toast from 'react-hot-toast';

const Chat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadMessages();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadMessages = async () => {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) return;

      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('user_id', user.user.id)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      toast.error('Error loading messages');
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) throw new Error('Not authenticated');

      // Save user message
      const { data: userMessage, error: userError } = await supabase
        .from('messages')
        .insert([
          {
            user_id: user.user.id,
            content: input,
            is_bot: false,
          },
        ])
        .select()
        .single();

      if (userError) throw userError;

      setMessages((prev) => [...prev, userMessage]);
      setInput('');

      // Simulate AI response (replace with actual AI integration)
      const botResponse = "I'm an AI assistant. This is a simulated response. In a real implementation, this would be integrated with an AI service.";
      
      const { data: botMessage, error: botError } = await supabase
        .from('messages')
        .insert([
          {
            user_id: user.user.id,
            content: botResponse,
            is_bot: true,
          },
        ])
        .select()
        .single();

      if (botError) throw botError;

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      toast.error('Error sending message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.is_bot ? 'justify-start' : 'justify-end'}`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-4 ${
                message.is_bot
                  ? 'bg-white text-gray-800'
                  : 'bg-black text-white'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 bg-white border-t">
        <div className="flex space-x-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white p-2 rounded-lg hover:bg-gray-800 disabled:opacity-50"
          >
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;