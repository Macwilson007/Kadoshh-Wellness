"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Flower2, Droplets, Home, Clock, Star, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const WHATSAPP_LINK = "https://wa.me/2349098914461";

const treatmentCategories = [
  {
    id: "skin",
    title: "Skin Treatments",
    tagline: "Reveal your natural radiance",
    icon: <Sparkles className="w-6 h-6" strokeWidth={1.5} />,
    image: "/images/skincare.png",
    treatments: [
      { name: "Classic Facial", duration: "60 min", price: "₦25,000", description: "A deep-cleansing facial that purifies pores, exfoliates dead skin cells, and leaves your skin visibly refreshed and glowing." },
      { name: "Hydrating Glow Facial", duration: "75 min", price: "₦35,000", description: "Intense hydration therapy using hyaluronic acid serums and collagen masks to plump, brighten, and restore moisture balance." },
      { name: "Anti-Aging Rejuvenation", duration: "90 min", price: "₦50,000", description: "Advanced treatment targeting fine lines, wrinkles, and age spots using peptide-rich formulations and LED light therapy." },
      { name: "Acne Correction Treatment", duration: "60 min", price: "₦30,000", description: "Targeted treatment for acne-prone skin combining salicylic acid peels, extractions, and soothing post-treatment care." },
    ]
  },
  {
    id: "massage",
    title: "Massage Therapy",
    tagline: "Restore balance and inner calm",
    icon: <Flower2 className="w-6 h-6" strokeWidth={1.5} />,
    image: "/images/massage.png",
    treatments: [
      { name: "Swedish Relaxation Massage", duration: "60 min", price: "₦20,000", description: "Long, flowing strokes designed to reduce stress, improve circulation, and promote deep relaxation throughout the body." },
      { name: "Deep Tissue Massage", duration: "60 min", price: "₦25,000", description: "Firm pressure targeting deep muscle layers to relieve chronic tension, knots, and postural misalignment." },
      { name: "Hot Stone Therapy", duration: "75 min", price: "₦35,000", description: "Heated basalt stones placed along energy meridians, melting away tension while the warmth penetrates deep into muscle tissue." },
      { name: "Aromatherapy Massage", duration: "90 min", price: "₦40,000", description: "A sensory journey combining essential oil blends with rhythmic massage techniques for holistic mind-body restoration." },
    ]
  },
  {
    id: "facials",
    title: "Luxury Facials",
    tagline: "High-touch, results-driven skincare",
    icon: <Droplets className="w-6 h-6" strokeWidth={1.5} />,
    image: "/images/facial.png",
    treatments: [
      { name: "The Kadoshh Signature Facial", duration: "90 min", price: "₦55,000", description: "Our flagship treatment — a multi-step luxury facial combining enzyme peels, microcurrent sculpting, LED therapy, and a 24K gold mask." },
      { name: "Vitamin C Brightening Facial", duration: "60 min", price: "₦30,000", description: "High-potency Vitamin C infusion to even out skin tone, reduce hyperpigmentation, and boost collagen production." },
      { name: "Sensitive Skin Soother", duration: "60 min", price: "₦28,000", description: "Gentle, fragrance-free treatment using chamomile and aloe vera to calm redness, irritation, and reactive skin conditions." },
      { name: "Men&apos;s Executive Facial", duration: "45 min", price: "₦22,000", description: "Specifically formulated for male skin — deep cleansing, exfoliation, and hydration to combat razor burn and dullness." },
    ]
  },
  {
    id: "home",
    title: "Home Services",
    tagline: "Luxury treatments at your doorstep",
    icon: <Home className="w-6 h-6" strokeWidth={1.5} />,
    image: "/images/about.png",
    treatments: [
      { name: "At-Home Signature Facial", duration: "90 min", price: "₦70,000", description: "Our full Kadoshh Signature Facial experience brought to the comfort of your home with our portable luxury setup." },
      { name: "At-Home Relaxation Massage", duration: "60 min", price: "₦30,000", description: "Professional massage therapy in your personal space — we bring everything including the premium massage table and linens." },
      { name: "At-Home Couples Package", duration: "120 min", price: "₦120,000", description: "A dual-therapist experience for two — synchronized massages followed by express facials in your home's most relaxing room." },
      { name: "Bridal / Event Prep Package", duration: "180 min", price: "₦150,000", description: "Complete pre-event pampering including facial, body scrub, massage, and express manicure — available at your venue or home." },
    ]
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen pt-20">
      {/* Hero Banner */}
      <section className="relative py-24 md:py-32 bg-stone-100 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/hero.png')] bg-cover bg-center opacity-10"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <h2 className="text-sm uppercase tracking-[0.3em] text-sage-700 font-medium mb-4">Our Offerings</h2>
            <h1 className="text-4xl md:text-6xl font-serif text-stone-900 leading-tight mb-6">
              Treatments crafted for <br className="hidden md:block" />your renewal.
            </h1>
            <p className="text-lg md:text-xl text-stone-600 font-light max-w-2xl mx-auto leading-relaxed">
              Every service is performed by trained aestheticians using premium products, in an environment designed for your utmost privacy and relaxation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="bg-white border-b border-stone-100 sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto py-4 gap-6 scrollbar-hide">
            {treatmentCategories.map((cat) => (
              <a key={cat.id} href={`#${cat.id}`} className="flex items-center gap-2 text-stone-500 hover:text-stone-900 transition-colors whitespace-nowrap text-sm uppercase tracking-wider group">
                <span className="text-sage-600">{cat.icon}</span>
                <span className="group-hover:text-stone-900">{cat.title}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Treatment Categories */}
      {treatmentCategories.map((category, catIndex) => (
        <section key={category.id} id={category.id} className={`py-20 ${catIndex % 2 === 0 ? 'bg-stone-50' : 'bg-white'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-12"
            >
              {/* Category Header */}
              <div className="lg:col-span-1">
                <div className="lg:sticky lg:top-40">
                  <div className="text-sage-600 mb-4">{category.icon}</div>
                  <h2 className="text-3xl md:text-4xl font-serif text-stone-900 mb-3">{category.title}</h2>
                  <p className="text-stone-500 font-light mb-6 italic">{category.tagline}</p>
                  <div className="relative h-48 md:h-64 overflow-hidden mt-6">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={category.image} alt={category.title} className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>

              {/* Treatment List */}
              <div className="lg:col-span-2 space-y-6">
                {category.treatments.map((treatment, tIndex) => (
                  <motion.div
                    key={tIndex}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: tIndex * 0.1 }}
                    className="bg-white p-8 border border-stone-100 hover:shadow-md hover:border-sage-200 transition-all duration-300 group"
                  >
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-xl font-serif text-stone-900 group-hover:text-sage-800 transition-colors">{treatment.name}</h3>
                        <div className="flex items-center gap-4 mt-2 text-sm text-stone-400">
                          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{treatment.duration}</span>
                          <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5" />Premium</span>
                        </div>
                      </div>
                      <span className="text-2xl font-serif text-sage-700 whitespace-nowrap">{treatment.price}</span>
                    </div>
                    <p className="text-stone-500 font-light leading-relaxed mb-4">{treatment.description}</p>
                    <a
                      href={WHATSAPP_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm uppercase tracking-wider text-sage-700 hover:text-stone-900 transition-colors font-medium"
                    >
                      Book this treatment <ChevronRight className="w-4 h-4" />
                    </a>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      ))}

      {/* Bottom CTA */}
      <section className="py-24 bg-sage-900 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-serif text-white mb-6">Not sure which treatment is right for you?</h2>
          <p className="text-sage-200 font-light text-lg mb-10 leading-relaxed">
            Our concierge can help you choose the perfect experience based on your skin type, goals, and preferences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="bg-white text-stone-900 px-10 py-4 uppercase tracking-[0.2em] text-sm hover:bg-stone-100 transition-colors">
              Chat on WhatsApp
            </a>
            <Link href="/contact" className="border border-sage-400 text-sage-100 px-10 py-4 uppercase tracking-[0.2em] text-sm hover:bg-sage-800 transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
