'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, X, Send, Loader2, AlertCircle } from 'lucide-react';

interface ChatMessage {
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isStaticBuild, setIsStaticBuild] = useState(false);

  // Check if we're in a static build environment
  useEffect(() => {
    // Add a welcome message when the chat is first opened
    if (messages.length === 0) {
      setMessages([
        {
          type: 'assistant',
          content: 'Hi there! How can I help you today?',
          timestamp: new Date()
        }
      ]);
    }

    // Check if we're in a static build by making a test request
    const checkEnvironment = async () => {
      try {
        const res = await fetch('/api/ai-assistant', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ question: 'test' })
        });
        
        const data = await res.json();
        
        // If we get a static fallback message, we're in a static build
        if (data.answer && data.answer.includes('available only in the development environment')) {
          setIsStaticBuild(true);
        }
      } catch (error) {
        console.error('Error checking environment:', error);
        setIsStaticBuild(true); // Assume static build if there's an error
      }
    };
    
    checkEnvironment();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || loading) return;

    const userMessage: ChatMessage = {
      type: 'user',
      content: question.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setQuestion('');
    setLoading(true);
    setError(null);

    // If we're in a static build, show a message about limited functionality
    if (isStaticBuild) {
      setTimeout(() => {
        const assistantMessage: ChatMessage = {
          type: 'assistant',
          content: 'I\'m sorry, the AI assistant is only available in the development environment. This is a static build of the website.',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, assistantMessage]);
        setLoading(false);
      }, 1000);
      return;
    }

    try {
      const res = await fetch('/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: userMessage.content })
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      const assistantMessage: ChatMessage = {
        type: 'assistant',
        content: data.answer,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error: any) {
      setError(error.message || 'Failed to get response. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="absolute bottom-16 right-0 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden"
          >
            {/* Static build warning */}
            {isStaticBuild && (
              <div className="bg-yellow-100 dark:bg-yellow-800 p-2 text-yellow-800 dark:text-yellow-200 text-xs flex items-center">
                <AlertCircle size={16} className="mr-1" />
                Limited functionality in static build
              </div>
            )}
            
            {/* Chat messages */}
            <div className="h-96 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`${
                    msg.type === 'user' ? 'ml-auto bg-blue-500 text-white' : 'mr-auto bg-gray-100 dark:bg-gray-700'
                  } p-3 rounded-lg max-w-[80%] animate-fade-in`}
                >
                  {msg.content}
                </div>
              ))}
              {loading && (
                <div className="flex items-center justify-center">
                  <Loader2 className="animate-spin" size={24} />
                </div>
              )}
              {error && (
                <div className="p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 rounded-lg text-sm">
                  {error}
                </div>
              )}
            </div>

            {/* Input form */}
            <form onSubmit={handleSubmit} className="p-4 border-t dark:border-gray-700">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Ask me anything..."
                  className="flex-1 p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading || !question.trim()}
                  className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={20} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
