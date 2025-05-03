'use client';

import { useState } from 'react';
import { ChatBubble } from './ChatBubble';
import Link from 'next/link';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const BRANDY_RESPONSES: Record<string, string> = {
  'projects': 'You can find my projects at <a href="/projects" class="text-blue-600 hover:underline">/projects</a>. I have a Todo app and a Movie Recommendation System there!',
  'about': 'Learn more about me at <a href="/about" class="text-blue-600 hover:underline">/about</a>. You\'ll find my skills and experience there.',
  'resources': 'Check out my learning resources at <a href="/resources" class="text-blue-600 hover:underline">/resources</a>. I have tutorials on ML, NLP, and more!',
  'blog': 'Read my latest articles at <a href="/blog" class="text-blue-600 hover:underline">/blog</a>. I write about tech and development.',
  'contact': 'Want to get in touch? Visit <a href="/contact" class="text-blue-600 hover:underline">/contact</a>.',
  'default': 'Hi! I\'m Brandy, your friendly fox assistant. I can help you navigate the site. Try asking about: projects, about, resources, blog, or contact.'
};

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      role: 'assistant' as const, 
      content: BRANDY_RESPONSES['default']
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const getBrandyResponse = (question: string): string => {
    const normalizedQuestion = question.toLowerCase().trim();
    
    // Check for keywords in the question
    if (normalizedQuestion.includes('project')) return BRANDY_RESPONSES['projects'];
    if (normalizedQuestion.includes('about') || normalizedQuestion.includes('who')) return BRANDY_RESPONSES['about'];
    if (normalizedQuestion.includes('resource') || normalizedQuestion.includes('learn')) return BRANDY_RESPONSES['resources'];
    if (normalizedQuestion.includes('blog') || normalizedQuestion.includes('article')) return BRANDY_RESPONSES['blog'];
    if (normalizedQuestion.includes('contact') || normalizedQuestion.includes('reach')) return BRANDY_RESPONSES['contact'];
    
    return BRANDY_RESPONSES['default'];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    const questionText = input.trim();
    setInput('');
    setIsLoading(true);
    
    // Add user message
    const newMessages: ChatMessage[] = [
      ...messages,
      { role: 'user' as const, content: questionText }
    ];
    setMessages(newMessages);
    
    // Simulate response delay
    setTimeout(() => {
      setMessages([
        ...newMessages,
        { role: 'assistant' as const, content: getBrandyResponse(questionText) }
      ]);
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-orange-500 text-white p-4 rounded-full shadow-lg hover:bg-orange-600 transition-colors"
          aria-label="Open chat"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-80 sm:w-96 flex flex-col max-h-[500px]">
          <div className="bg-orange-500 text-white p-4 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center gap-2">
              <h3 className="font-medium">Brandy</h3>
              <span className="text-xs bg-orange-600 px-2 py-1 rounded">Fox Assistant</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="text-white hover:text-gray-200 transition-colors"
              aria-label="Close chat"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => (
              <ChatBubble key={index} message={msg} />
            ))}
            {isLoading && (
              <div className="flex justify-center">
                <div className="animate-pulse text-gray-400">...</div>
              </div>
            )}
          </div>
          
          <form onSubmit={handleSubmit} className="border-t dark:border-gray-700 p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about projects, about, resources..."
                className="flex-1 px-4 py-2 border dark:border-gray-600 rounded-lg dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                disabled={isLoading}
              />
              <button 
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
