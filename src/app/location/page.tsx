"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Phone, Mail, Car, Shield, CalendarCheck, Navigation } from 'lucide-react';
import Link from 'next/link';

const WHATSAPP_LINK = "https://wa.me/2349098914461";

const hours = [
  { day: "Monday – Friday", time: "9:00 AM – 7:00 PM" },
  { day: "Saturday", time: "10:00 AM – 6:00 PM" },
  { day: "Sunday", time: "By Appointment Only" },
];

const nearbyLandmarks = [
  "Ikoyi Club 1938",
  "Banana Island Road",
  "Civic Centre, Victoria Island",
  "Lekki-Ikoyi Link Bridge",
];

export default function LocationPage() {
  return (
    <main className="min-h-screen pt-20">
      {/* Hero */}
      <section className="relative py-24 md:py-32 bg-stone-100 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2940&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <h2 className="text-sm uppercase tracking-[0.3em] text-sage-700 font-medium mb-4">Find Us</h2>
            <h1 className="text-4xl md:text-6xl font-serif text-stone-900 leading-tight mb-6">
              Your sanctuary in <br className="hidden md:block" />the heart of Ikoyi.
            </h1>
            <p className="text-lg md:text-xl text-stone-600 font-light max-w-2xl mx-auto leading-relaxed">
              Located in one of Lagos&apos;s most serene neighborhoods, Kadoshh offers a tranquil escape from the city&apos;s energy.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Map + Details Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Map */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="w-full h-[400px] md:h-[500px] bg-stone-200 overflow-hidden border border-stone-100"
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.5!2d3.43!3d6.45!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sIkoyi%2C+Lagos!5e0!3m2!1sen!2sng!4v1!5m2!1sen!2sng"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Kadoshh location in Ikoyi, Lagos"
                ></iframe>
              </motion.div>
            </div>

            {/* Contact Details */}
            <div className="lg:col-span-2 space-y-8">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {/* Address */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-3">
                    <MapPin className="w-5 h-5 text-sage-600" strokeWidth={1.5} />
                    <h3 className="text-lg font-serif text-stone-900">Address</h3>
                  </div>
                  <p className="text-stone-600 font-light leading-relaxed pl-8">
                    Kadoshh Aesthetics &amp; Wellness<br />
                    Ikoyi, Lagos, Nigeria
                  </p>
                  <a
                    href="https://www.google.com/maps/search/Kadoshh+Aesthetics+Ikoyi+Lagos"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-sage-700 hover:text-stone-900 mt-3 pl-8 transition-colors"
                  >
                    <Navigation className="w-3.5 h-3.5" />Get Directions
                  </a>
                </div>

                {/* Hours */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-3">
                    <Clock className="w-5 h-5 text-sage-600" strokeWidth={1.5} />
                    <h3 className="text-lg font-serif text-stone-900">Opening Hours</h3>
                  </div>
                  <div className="pl-8 space-y-2">
                    {hours.map((h, i) => (
                      <div key={i} className="flex justify-between text-stone-600 font-light">
                        <span>{h.day}</span>
                        <span className="text-stone-900">{h.time}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact Info */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-3">
                    <Phone className="w-5 h-5 text-sage-600" strokeWidth={1.5} />
                    <h3 className="text-lg font-serif text-stone-900">Get in Touch</h3>
                  </div>
                  <div className="pl-8 space-y-2">
                    <a href="tel:+2349098914461" className="block text-stone-600 font-light hover:text-stone-900 transition-colors">
                      +234 909 891 4461
                    </a>
                    <a href="mailto:hello@kadoshhwellness.com" className="flex items-center gap-2 text-stone-600 font-light hover:text-stone-900 transition-colors">
                      <Mail className="w-3.5 h-3.5" />hello@kadoshhwellness.com
                    </a>
                  </div>
                </div>

                {/* Quick Book */}
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-stone-900 text-stone-50 py-4 text-center uppercase tracking-[0.2em] text-sm hover:bg-sage-700 transition-colors"
                >
                  Book Appointment
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Strip */}
      <section className="py-16 bg-stone-50 border-y border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Car className="w-6 h-6" strokeWidth={1.5} />, title: "Ample Parking", description: "Complimentary parking is available on-site for all clients during their appointment." },
              { icon: <Shield className="w-6 h-6" strokeWidth={1.5} />, title: "Private & Secure", description: "Our discreet entrance and appointment-only policy ensures complete privacy for every guest." },
              { icon: <CalendarCheck className="w-6 h-6" strokeWidth={1.5} />, title: "By Appointment Only", description: "We operate strictly by appointment to guarantee unhurried, personalized service." },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex gap-4 items-start"
              >
                <div className="text-sage-600 mt-1">{feature.icon}</div>
                <div>
                  <h4 className="font-serif text-stone-900 mb-1">{feature.title}</h4>
                  <p className="text-stone-500 font-light text-sm leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby Landmarks */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-sm uppercase tracking-[0.2em] text-sage-700 font-medium mb-4">The Neighbourhood</h2>
          <h3 className="text-3xl md:text-4xl font-serif text-stone-900 mb-6">In the heart of Ikoyi</h3>
          <p className="text-stone-500 font-light text-lg leading-relaxed mb-12 max-w-2xl mx-auto">
            Ikoyi is one of Lagos&apos;s most prestigious residential areas, known for its tree-lined streets, upscale dining, and serene ambiance — the perfect backdrop for your wellness journey.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {nearbyLandmarks.map((landmark, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-stone-50 border border-stone-100 p-5 text-center"
              >
                <MapPin className="w-4 h-4 text-sage-500 mx-auto mb-2" strokeWidth={1.5} />
                <p className="text-stone-700 text-sm font-medium">{landmark}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-sage-900 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-serif text-white mb-6">We can&apos;t wait to welcome you.</h2>
          <p className="text-sage-200 font-light text-lg mb-10 leading-relaxed">
            Come experience the Kadoshh difference. Schedule your first visit today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="bg-white text-stone-900 px-10 py-4 uppercase tracking-[0.2em] text-sm hover:bg-stone-100 transition-colors">
              Book via WhatsApp
            </a>
            <Link href="/contact" className="border border-sage-400 text-sage-100 px-10 py-4 uppercase tracking-[0.2em] text-sm hover:bg-sage-800 transition-colors">
              Send a Message
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
