"use client";
import React from 'react';
import { motion } from 'framer-motion';

const WHATSAPP_LINK = "https://wa.me/2349098914461";

export default function LocationCTA() {
  return (
    <section id="location" className="py-24 bg-stone-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-sm uppercase tracking-[0.2em] text-sage-700 font-medium mb-6">Visit Us</h2>
          <h3 className="text-4xl md:text-6xl font-serif text-stone-900 mb-8">
            Located in the heart of Ikoyi.
          </h3>
          <p className="text-xl text-stone-600 mb-12 font-light max-w-2xl mx-auto leading-relaxed">
            Ready to begin your journey to rejuvenation? Connect with our concierge to schedule your exclusive appointment.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <a 
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer" 
              className="w-full sm:w-auto bg-stone-900 text-stone-50 px-10 py-4 uppercase tracking-[0.2em] text-sm hover:bg-sage-700 transition-colors duration-300 text-center"
            >
              Book via WhatsApp
            </a>
            <a 
              href="mailto:hello@kadoshhwellness.com"
              className="w-full sm:w-auto border border-stone-300 text-stone-900 px-10 py-4 uppercase tracking-[0.2em] text-sm hover:bg-stone-200 transition-colors duration-300 text-center"
            >
              Email Us
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
