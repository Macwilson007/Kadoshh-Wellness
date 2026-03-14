"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Flower2, Droplets, Home } from 'lucide-react';

const services = [
  {
    title: "Skin Treatments",
    description: "Advanced skincare solutions tailored to your unique complexion needs, promoting lasting radiance.",
    icon: <Sparkles className="w-8 h-8 text-sage-600 mb-6" strokeWidth={1} />,
  },
  {
    title: "Massage Therapy",
    description: "Release tension and restore balance with our signature massages, designed for ultimate relaxation.",
    icon: <Flower2 className="w-8 h-8 text-sage-600 mb-6" strokeWidth={1} />,
  },
  {
    title: "Luxury Facials",
    description: "Deep cleansing and rejuvenating facial treatments using premium, high-touch products.",
    icon: <Droplets className="w-8 h-8 text-sage-600 mb-6" strokeWidth={1} />,
  },
  {
    title: "Home Services",
    description: "Experience our luxury treatments in the comfort of your own home. Available upon request.",
    icon: <Home className="w-8 h-8 text-sage-600 mb-6" strokeWidth={1} />,
  }
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm uppercase tracking-[0.2em] text-sage-700 font-medium mb-4">Our Offerings</h2>
          <h3 className="text-4xl md:text-5xl font-serif text-stone-900 leading-tight">
            Curated wellness for <br className="hidden md:block" />body & soul.
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white p-10 shadow-sm border border-stone-100 hover:shadow-md transition-shadow duration-300 group"
            >
              <div className="transform group-hover:-translate-y-2 transition-transform duration-300">
                {service.icon}
                <h4 className="text-xl font-serif text-stone-900 mb-4">{service.title}</h4>
                <p className="text-stone-600 font-light leading-relaxed">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
