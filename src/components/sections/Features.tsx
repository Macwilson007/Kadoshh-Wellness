"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function Features() {
  return (
    <section id="about" className="py-24 bg-sage-900 text-stone-50 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 bg-[url('https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=2787&auto=format&fit=crop')] bg-cover bg-center"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-xl"
          >
            <h2 className="text-sm uppercase tracking-[0.2em] text-sage-300 mb-4">The Kadoshh Philosophy</h2>
            <h3 className="text-4xl md:text-5xl font-serif mb-8 leading-tight text-white">
              An elevated, high-touch sanctuary in Ikoyi.
            </h3>
            <p className="text-lg text-sage-100/80 mb-6 font-light leading-relaxed">
              We believe that self-care is not just a luxury—it&apos;s an essential part of living your best life. Our treatments are meticulously designed to restore not just your skin, but your inner peace.
            </p>
            <p className="text-lg text-sage-100/80 mb-10 font-light leading-relaxed">
              From our signature facials to our bespoke home services, every detail is orchestrated to provide an atmosphere of utmost relaxation and privacy.
            </p>
            <div className="flex flex-col sm:flex-row gap-8 mt-12 border-t border-sage-800 pt-8">
              <div>
                <p className="font-serif text-3xl text-white mb-2">Strictly</p>
                <p className="text-sm uppercase tracking-wider text-sage-300">By Appointment</p>
              </div>
              <div>
                <p className="font-serif text-3xl text-white mb-2">Premium</p>
                <p className="text-sm uppercase tracking-wider text-sage-300">Aesthetics</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="hidden lg:block relative h-[600px] w-full bg-stone-800"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=2000&auto=format&fit=crop" 
              alt="Spa interior" 
              className="absolute inset-0 w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
