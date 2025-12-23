
import React, { useState, useRef, useEffect } from 'react';
import { getAIResponse } from '../services/geminiService';
import { ChatMessage } from '../types';

const AIConsultant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hi! I'm your DrewVerse Project Consultant. What kind of digital magic can we create for you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const templates = [
    "💰 Get a website quote",
    "🛍️ E-commerce store pricing",
    "📱 Mobile App Development",
    "✨ Branding for my startup"
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async (overrideInput?: string) => {
    const textToSend = typeof overrideInput === 'string' ? overrideInput : input;
    if (!textToSend.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', text: textToSend };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const aiResponseText = await getAIResponse([...messages, userMessage]);
    setMessages(prev => [...prev, { role: 'model', text: aiResponseText || "Sorry, I'm a bit lost. Can you rephrase?" }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[60]">
      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[350px] max-w-[90vw] h-[500px] bg-white dark:bg-surface-dark rounded-2xl shadow-2xl border border-subtle-light dark:border-subtle-dark flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          <div className="bg-primary p-4 text-white flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined">smart_toy</span>
              <div>
                <p className="font-bold text-sm">AI Consultant</p>
                <p className="text-[10px] opacity-80 uppercase tracking-widest">Always Active</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-background-dark/30">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-primary text-white rounded-tr-none' : 'bg-white dark:bg-subtle-dark shadow-sm border border-subtle-light dark:border-white/5 rounded-tl-none'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-subtle-dark p-3 rounded-2xl rounded-tl-none shadow-sm flex gap-1">
                  <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                </div>
              </div>
            )}

            {/* Message Templates - Only show when it's the start of convo */}
            {messages.length === 1 && !isLoading && (
               <div className="grid grid-cols-1 gap-2 mt-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1 ml-1">Suggested topics</p>
                  {templates.map((t, i) => (
                    <button 
                        key={i}
                        onClick={() => handleSend(t)}
                        className="text-left text-xs bg-white dark:bg-subtle-dark border border-subtle-light dark:border-white/5 p-3 rounded-xl hover:border-primary hover:text-primary transition-all shadow-sm hover:shadow-md active:scale-95"
                    >
                        {t}
                    </button>
                  ))}
               </div>
            )}
          </div>

          <div className="p-4 border-t border-subtle-light dark:border-white/5 flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Tell me about your project..."
              className="flex-1 bg-gray-100 dark:bg-subtle-dark border-none rounded-xl text-sm py-2 px-4 focus:ring-1 focus:ring-primary"
            />
            <button 
              onClick={() => handleSend()}
              className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center hover:bg-primary-hover transition-colors"
            >
              <span className="material-symbols-outlined text-lg">send</span>
            </button>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-primary hover:bg-primary-hover text-white rounded-full shadow-2xl flex items-center justify-center transition-all transform hover:scale-110 active:scale-95 group relative"
      >
        <span className="material-symbols-outlined text-3xl">{isOpen ? 'close' : 'chat_bubble'}</span>
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-white text-primary text-[10px] font-bold items-center justify-center">1</span>
          </span>
        )}
      </button>
    </div>
  );
};

export default AIConsultant;
