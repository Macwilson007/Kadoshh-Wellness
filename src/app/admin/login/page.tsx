"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, ShieldCheck, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In this demo, the password is 'kadoshh2024'
    if (password === "kadoshh2024") {
      // Set a cookie (simple version)
      document.cookie = "admin_session=true; path=/; max-age=3600";
      router.push('/admin');
    } else {
      setError("Invalid credential. Access denied.");
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sage-500/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-stone-800/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full relative z-10"
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-stone-900 border border-stone-800 mb-6 group">
             <ShieldCheck size={32} className="text-sage-400 group-hover:scale-110 transition-transform" />
          </div>
          <h1 className="text-3xl font-serif text-white tracking-widest uppercase">Kadoshh</h1>
          <p className="text-stone-500 text-xs font-bold uppercase tracking-[4px] mt-2">Internal Sanctuary Control</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Lock size={18} className="text-stone-600" />
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Authorization Key"
              className="w-full bg-stone-900 border border-stone-800 text-white pl-12 pr-4 py-4 rounded-sm focus:outline-none focus:border-sage-500/50 transition-all placeholder-stone-600"
              required
            />
          </div>

          {error && (
            <p className="text-red-400 text-[10px] uppercase tracking-widest text-center font-bold">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-stone-50 text-stone-900 py-4 rounded-sm font-bold uppercase tracking-[3px] text-xs flex items-center justify-center gap-3 hover:bg-sage-400 hover:text-white transition-all group"
          >
            Authenticate <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <p className="text-[9px] text-stone-700 text-center mt-12 uppercase tracking-widest font-bold">
          Restricted access. Unauthorized attempts are logged.
        </p>
      </motion.div>
    </div>
  );
}
