'use client';

interface ChatBubbleProps {
  message: {
    role: 'user' | 'assistant';
    content: string;
  };
}

export function ChatBubble({ message }: ChatBubbleProps) {
  const isUser = message.role === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div 
        className={`max-w-[80%] rounded-lg px-4 py-2 ${
          isUser 
            ? 'bg-orange-500 text-white rounded-br-none' 
            : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none'
        }`}
        dangerouslySetInnerHTML={{ __html: message.content }}
      />
    </div>
  );
} 