"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const WHATSAPP_LINK = "https://wa.me/2349098914461";

export default function Hero() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch('/api/content').then(res => res.json()).then(resData => setData(resData?.hero));
  }, []);

  const bgImage = data?.backgroundImage || "/images/hero.png";

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-stone-100 pt-20">
      <div className="absolute inset-0 bg-sage-900/5 z-0"></div>
      
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0 opacity-[0.15] transition-all duration-1000"
        style={{ backgroundImage: `url('${bgImage}')` }}
      ></div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="block text-sage-700 uppercase tracking-[0.3em] text-xs md:text-sm mb-6 font-medium"
        >
          Aesthetics & Wellness in Ikoyi
        </motion.span>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-serif text-stone-900 mb-8 leading-[1.1]"
          dangerouslySetInnerHTML={{
             __html: data?.title || "Restore your <br/> <span class='italic font-light'>inner glow.</span>"
          }}
        />
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-stone-600 mb-12 max-w-2xl mx-auto font-light leading-relaxed"
        >
          {data?.subtitle || "Experience luxury skin treatments, massage, and facials. Strictly by appointment to guarantee your utmost privacy and relaxation."}
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <a 
            href="/book"
            className="inline-block bg-stone-900 text-stone-50 px-10 py-4 uppercase tracking-[0.2em] text-sm hover:bg-sage-700 transition-colors duration-300"
          >
            Schedule Sanctuary Session
          </a>
        </motion.div>
      </div>
    </section>
  );
}
