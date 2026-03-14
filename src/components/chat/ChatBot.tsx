"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Mic, Square, Loader2 } from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [siteData, setSiteData] = useState<any>(null);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    fetch('/api/content')
      .then(res => res.json())
      .then(data => {
        setSiteData(data);
        setMessages([
          { id: '1', sender: 'ai', text: data.chatbot?.welcomeMessage || "Welcome to Kadoshh Wellness. How may I assist you with a booking or inquiry today?" }
        ]);
      });
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        recognitionRef.current.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          handleSend(transcript);
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = siteData?.chatbot?.voiceRate || 0.95;
      utterance.pitch = siteData?.chatbot?.voicePitch || 1.05;
      
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(v => (v.name.includes('Female') || v.name.includes('Samantha') || v.name.includes('Google UK English Female')) && v.lang.includes('en'));
      if (preferredVoice) utterance.voice = preferredVoice;
      
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSend = (text: string = input) => {
    if (!text.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), sender: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // AI Logic for bookings and orders
    setTimeout(() => {
      let aiText = "I'd be happy to assist you with that. Our concierge will be in touch shortly.";
      const lower = text.toLowerCase();
      
      if (lower.includes('book') || lower.includes('appointment') || lower.includes('massage') || lower.includes('facial') || lower.includes('treatment')) {
        aiText = "Excellent selection. I can help you secure a booking for your treatment at our Ikoyi sanctuary. Do you have a preferred date and time in mind?";
      } else if (lower.includes('price') || lower.includes('cost') || lower.includes('how much') || lower.includes('fee')) {
        aiText = "Our signature treatments start at ₦50,000. We also offer bespoke home services for an additional premium. Would you like me to send our full brochure to your WhatsApp?";
      } else if (lower.includes('monday') || lower.includes('tuesday') || lower.includes('wednesday') || lower.includes('thursday') || lower.includes('friday') || lower.includes('saturday') || lower.includes('sunday') || lower.includes('tomorrow') || lower.includes('today')) {
         aiText = "I've noted your availability. To finalize this reservation, may I have your contact phone number? Our concierge will call you momentarily.";
      } else if (/\d{4,}/.test(lower)) {
         aiText = "Thank you. Your request has been flagged as high priority. Our team is notifying a therapist now. You'll receive a confirmation call or message on this number shortly. Is there anything else I can assist with?";
      } else if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
         aiText = "Hello! I am your Kadoshh digital concierge. I can help you book treatments, check pricing, or locate our Ikoyi facility. What's on your mind today?";
      }

      const aiMsg: Message = { id: (Date.now() + 1).toString(), sender: 'ai', text: aiText };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
      speak(aiText);
    }, 1500);
  };

  const toggleListen = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      try {
        recognitionRef.current?.start();
        setIsListening(true);
      } catch (e) {
        console.error("Speech recognition error", e);
      }
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            className="fixed bottom-24 right-4 sm:right-8 w-[360px] max-h-[600px] shadow-2xl rounded-2xl overflow-hidden bg-white border border-stone-100 z-50 flex flex-col"
          >
            {/* Header */}
            <div className="bg-stone-900 text-stone-50 p-6 flex justify-between items-center relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-sage-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
              <div className="z-10">
                <h3 className="font-serif text-xl tracking-wide">Digital Concierge</h3>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-sage-400 rounded-full animate-pulse" />
                  <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">Active & Ready</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-stone-400 hover:text-white transition-colors z-10 p-2"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 h-[400px] overflow-y-auto p-6 space-y-6 bg-stone-50/30 scrollbar-hide">
              {messages.map((msg) => (
                <motion.div
                  initial={{ opacity: 0, x: msg.sender === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[85%] p-4 rounded-2xl text-[13px] leading-relaxed ${
                      msg.sender === 'user' 
                        ? 'bg-stone-800 text-stone-50 rounded-br-none shadow-lg' 
                        : 'bg-white border border-stone-100 text-stone-800 rounded-bl-none shadow-sm font-light'
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-stone-100 p-4 rounded-2xl rounded-bl-none shadow-sm flex gap-1">
                    <span className="w-1.5 h-1.5 bg-stone-300 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 bg-stone-300 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 bg-stone-300 rounded-full animate-bounce" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-stone-50">
              <div className="flex items-center gap-3 bg-stone-50 rounded-full px-4 py-2 border border-stone-100 outline-none focus-within:border-stone-300 transition-all">
                <button
                  onClick={toggleListen}
                  className={`p-2 rounded-full transition-all flex-shrink-0 ${
                    isListening 
                      ? 'bg-red-500 text-white animate-pulse' 
                      : 'bg-stone-200 text-stone-600 hover:bg-stone-300'
                  }`}
                  title={isListening ? "Stop listening" : "Speak to Concierge"}
                >
                  {isListening ? <Square size={16} /> : <Mic size={16} />}
                </button>
                
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSend();
                  }}
                  placeholder="Type your request..."
                  className="flex-1 text-sm bg-transparent border-none focus:outline-none text-stone-800 placeholder-stone-400"
                />
                
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim()}
                  className="p-2 bg-stone-900 text-white rounded-full hover:bg-sage-800 transition-all active:scale-90 disabled:opacity-20 disabled:scale-100 flex-shrink-0"
                >
                  <Send size={16} />
                </button>
              </div>
              <p className="text-[9px] text-center text-stone-400 mt-3 font-medium uppercase tracking-widest">Powered by Kadoshh AI Intelligence</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 w-16 h-16 bg-stone-900 text-white rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.3)] flex items-center justify-center z-50 hover:bg-sage-800 transition-colors group"
      >
        {isOpen ? <X size={28} /> : (
          <div className="relative">
            <MessageCircle size={28} />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-sage-400 border-2 border-stone-900 rounded-full" />
          </div>
        )}
        <div className="absolute -top-12 right-0 bg-stone-900 text-white text-[10px] px-3 py-1.5 rounded-full whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none uppercase tracking-widest font-bold border border-stone-700">
           Chat with Us
        </div>
      </motion.button>
    </>
  );
}
