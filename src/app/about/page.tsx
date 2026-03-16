"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Heart, Gem, Leaf, Award, Users } from 'lucide-react';
import Link from 'next/link';

const values = [
  {
    icon: <Shield className="w-7 h-7" strokeWidth={1.5} />,
    title: "Privacy First",
    description: "Your treatments are strictly confidential. We operate by appointment only, ensuring an intimate, unhurried experience."
  },
  {
    icon: <Heart className="w-7 h-7" strokeWidth={1.5} />,
    title: "Holistic Approach",
    description: "We treat the whole person — not just the skin. Every session is designed to restore both your outer glow and inner calm."
  },
  {
    icon: <Gem className="w-7 h-7" strokeWidth={1.5} />,
    title: "Premium Products",
    description: "We use only the finest skincare brands and medical-grade products, carefully selected for safety and efficacy."
  },
  {
    icon: <Leaf className="w-7 h-7" strokeWidth={1.5} />,
    title: "Sustainability",
    description: "From eco-conscious products to minimal-waste practices, we're committed to beauty that respects the planet."
  },
  {
    icon: <Award className="w-7 h-7" strokeWidth={1.5} />,
    title: "Certified Expertise",
    description: "Our aestheticians are internationally trained and continuously updated on the latest techniques and innovations."
  },
  {
    icon: <Users className="w-7 h-7" strokeWidth={1.5} />,
    title: "Client-Centered",
    description: "Every treatment plan begins with a thorough consultation. We listen first, then craft a programme uniquely for you."
  }
];

const milestones = [
  { year: "2020", event: "Founded in Ikoyi, Lagos", description: "Kadoshh was born from a passion for delivering world-class aesthetics in a warm, private setting." },
  { year: "2021", event: "Home Services Launched", description: "We extended our luxury treatments beyond the studio, bringing spa-quality experiences to clients' homes." },
  { year: "2022", event: "Advanced Skin Lab Added", description: "Introduction of LED therapy, microcurrent sculpting, and medical-grade skincare protocols." },
  { year: "2023", event: "Community of 1,000+ Clients", description: "Kadoshh became one of Ikoyi's most trusted wellness destinations through referrals and repeat visits." },
  { year: "2024", event: "The Kadoshh Signature Facial", description: "Our flagship multi-step facial quickly became the most requested treatment in our portfolio." },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 bg-sage-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/massage.png')] bg-cover bg-center opacity-15"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <h2 className="text-sm uppercase tracking-[0.3em] text-sage-300 font-medium mb-4">Our Story</h2>
            <h1 className="text-4xl md:text-6xl font-serif leading-tight mb-6">
              Where beauty meets <br className="hidden md:block" />intention.
            </h1>
            <p className="text-lg md:text-xl text-sage-100/80 font-light max-w-2xl mx-auto leading-relaxed">
              Kadoshh Aesthetics &amp; Wellness was created for those who understand that true beauty begins beneath the surface.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-sm uppercase tracking-[0.2em] text-sage-700 font-medium mb-4">The Kadoshh Philosophy</h2>
              <h3 className="text-3xl md:text-4xl font-serif text-stone-900 mb-6 leading-tight">
                Self-care is not indulgence. It is preservation.
              </h3>
              <p className="text-stone-600 font-light leading-relaxed mb-6">
                Nestled in the heart of Ikoyi, Kadoshh was founded on a simple but profound belief: that everyone deserves access to world-class aesthetics in an environment that feels safe, private, and deeply personal.
              </p>
              <p className="text-stone-600 font-light leading-relaxed mb-6">
                Our name, &quot;Kadoshh,&quot; is rooted in the concept of being set apart — elevated, intentional, and sacred. That ethos permeates everything we do, from the products we curate to the way we design each treatment journey.
              </p>
              <p className="text-stone-600 font-light leading-relaxed">
                We don&apos;t believe in one-size-fits-all skincare. Every client receives a bespoke consultation before any treatment begins. We listen to your concerns, study your skin, and craft a programme that evolves with you over time.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/about.png" alt="Spa treatment room" className="w-full h-60 object-cover" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/skincare.png" alt="Skincare products" className="w-full h-40 object-cover" />
                </div>
                <div className="space-y-4 mt-8">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/massage.png" alt="Relaxation space" className="w-full h-40 object-cover" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/facial.png" alt="Massage therapy" className="w-full h-60 object-cover" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-sm uppercase tracking-[0.2em] text-sage-700 font-medium mb-4">What We Stand For</h2>
            <h3 className="text-3xl md:text-5xl font-serif text-stone-900 leading-tight">
              Our core values guide every interaction.
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-stone-50 p-8 border border-stone-100 hover:shadow-md hover:border-sage-200 transition-all duration-300"
              >
                <div className="text-sage-600 mb-5">{value.icon}</div>
                <h4 className="text-xl font-serif text-stone-900 mb-3">{value.title}</h4>
                <p className="text-stone-500 font-light leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm uppercase tracking-[0.2em] text-sage-700 font-medium mb-4">Our Journey</h2>
            <h3 className="text-3xl md:text-5xl font-serif text-stone-900">A story of growth &amp; intention.</h3>
          </div>

          <div className="space-y-0">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex gap-6 md:gap-10 items-start py-8 border-b border-stone-200 last:border-b-0"
              >
                <div className="flex-shrink-0 w-20 text-right">
                  <span className="text-3xl font-serif text-sage-700">{milestone.year}</span>
                </div>
                <div className="flex-shrink-0 w-px bg-sage-300 self-stretch relative">
                  <div className="absolute top-2 -left-1.5 w-3 h-3 rounded-full bg-sage-600 border-2 border-white"></div>
                </div>
                <div className="flex-1 pb-2">
                  <h4 className="text-lg font-serif text-stone-900 mb-1">{milestone.event}</h4>
                  <p className="text-stone-500 font-light leading-relaxed">{milestone.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-16 bg-sage-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "1,000+", label: "Happy Clients" },
              { number: "5,000+", label: "Treatments Done" },
              { number: "4.9★", label: "Average Rating" },
              { number: "4+", label: "Years of Excellence" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <p className="text-3xl md:text-4xl font-serif text-white mb-2">{stat.number}</p>
                <p className="text-sage-300 text-sm uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-serif text-stone-900 mb-6">Ready to experience Kadoshh?</h2>
          <p className="text-stone-500 font-light text-lg mb-10 leading-relaxed">
            Your journey to radiant skin and deep relaxation starts with a single step.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/services" className="bg-stone-900 text-stone-50 px-10 py-4 uppercase tracking-[0.2em] text-sm hover:bg-sage-700 transition-colors">
              View Services
            </Link>
            <Link href="/contact" className="border border-stone-300 text-stone-900 px-10 py-4 uppercase tracking-[0.2em] text-sm hover:bg-stone-100 transition-colors">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
