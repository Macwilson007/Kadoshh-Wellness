"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, MessageCircle, ChevronDown, ChevronUp } from 'lucide-react';

const WHATSAPP_LINK = "https://wa.me/2349098914461";

const faqs = [
  {
    question: "Do I need an appointment?",
    answer: "Yes – Kadoshh operates strictly by appointment to ensure every client receives an unhurried, personalized experience. Walk-ins are not accepted."
  },
  {
    question: "How do I book an appointment?",
    answer: "You can book through WhatsApp, by calling us directly, or by filling out the contact form on this page. Our concierge will confirm your appointment within 2 hours."
  },
  {
    question: "What is your cancellation policy?",
    answer: "We kindly request at least 24 hours' notice for cancellations or rescheduling. Late cancellations or no-shows may incur a 50% charge of the booked treatment."
  },
  {
    question: "Do you offer home services?",
    answer: "Absolutely. Our home service packages bring the full Kadoshh experience to your doorstep — including professional-grade equipment, linens, and products. A travel surcharge applies based on location."
  },
  {
    question: "Is there parking available?",
    answer: "Yes, complimentary parking is available on-site for all clients during their appointment."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept bank transfers, card payments (POS), and cash. Payment is due at the time of service."
  }
];

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  return (
    <main className="min-h-screen pt-20">
      {/* Hero */}
      <section className="relative py-24 md:py-32 bg-stone-100 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/hero.png')] bg-cover bg-center opacity-10"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <h2 className="text-sm uppercase tracking-[0.3em] text-sage-700 font-medium mb-4">Contact</h2>
            <h1 className="text-4xl md:text-6xl font-serif text-stone-900 leading-tight mb-6">
              Let&apos;s begin your <br className="hidden md:block" />wellness journey.
            </h1>
            <p className="text-lg md:text-xl text-stone-600 font-light max-w-2xl mx-auto leading-relaxed">
              Have a question, want to book, or need a custom treatment plan? We&apos;re here to help.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Channels */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1 space-y-8"
            >
              <div>
                <h3 className="text-2xl font-serif text-stone-900 mb-6">Get in touch</h3>
                <p className="text-stone-500 font-light leading-relaxed mb-8">
                  Reach out through any of the channels below. Our concierge team typically responds within 2 hours during business hours.
                </p>
              </div>

              {/* WhatsApp */}
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-5 bg-stone-50 border border-stone-100 hover:border-sage-200 hover:shadow-sm transition-all duration-300 group"
              >
                <MessageCircle className="w-5 h-5 text-sage-600 mt-0.5" strokeWidth={1.5} />
                <div>
                  <h4 className="font-serif text-stone-900 group-hover:text-sage-800 transition-colors mb-1">WhatsApp</h4>
                  <p className="text-sm text-stone-500 font-light">Fastest response · Usually within minutes</p>
                </div>
              </a>

              {/* Phone */}
              <a href="tel:+2349098914461" className="flex items-start gap-4 p-5 bg-stone-50 border border-stone-100 hover:border-sage-200 hover:shadow-sm transition-all duration-300 group">
                <Phone className="w-5 h-5 text-sage-600 mt-0.5" strokeWidth={1.5} />
                <div>
                  <h4 className="font-serif text-stone-900 group-hover:text-sage-800 transition-colors mb-1">Call Us</h4>
                  <p className="text-sm text-stone-500 font-light">+234 909 891 4461</p>
                </div>
              </a>

              {/* Email */}
              <a href="mailto:hello@kadoshhwellness.com" className="flex items-start gap-4 p-5 bg-stone-50 border border-stone-100 hover:border-sage-200 hover:shadow-sm transition-all duration-300 group">
                <Mail className="w-5 h-5 text-sage-600 mt-0.5" strokeWidth={1.5} />
                <div>
                  <h4 className="font-serif text-stone-900 group-hover:text-sage-800 transition-colors mb-1">Email</h4>
                  <p className="text-sm text-stone-500 font-light">hello@kadoshhwellness.com</p>
                </div>
              </a>

              {/* Address */}
              <div className="flex items-start gap-4 p-5 bg-stone-50 border border-stone-100">
                <MapPin className="w-5 h-5 text-sage-600 mt-0.5" strokeWidth={1.5} />
                <div>
                  <h4 className="font-serif text-stone-900 mb-1">Visit</h4>
                  <p className="text-sm text-stone-500 font-light">Ikoyi, Lagos, Nigeria</p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4 p-5 bg-stone-50 border border-stone-100">
                <Clock className="w-5 h-5 text-sage-600 mt-0.5" strokeWidth={1.5} />
                <div>
                  <h4 className="font-serif text-stone-900 mb-1">Hours</h4>
                  <p className="text-sm text-stone-500 font-light">Mon–Fri: 9AM–7PM</p>
                  <p className="text-sm text-stone-500 font-light">Sat: 10AM–6PM</p>
                  <p className="text-sm text-stone-500 font-light">Sun: By Appointment</p>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="bg-stone-50 p-8 md:p-12 border border-stone-100">
                <h3 className="text-2xl font-serif text-stone-900 mb-2">Send us a message</h3>
                <p className="text-stone-500 font-light mb-8">Fill out the form below and we&apos;ll get back to you within 2 hours.</p>

                {success ? (
                  <div className="text-center py-16">
                    <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Mail className="w-7 h-7 text-sage-700" />
                    </div>
                    <h3 className="font-serif text-2xl text-stone-900 mb-4">Message Sent Successfully</h3>
                    <p className="font-light text-stone-500 mb-6 max-w-md mx-auto">
                      Thank you for reaching out. Our concierge will review your message and contact you shortly.
                    </p>
                    <button onClick={() => setSuccess(false)} className="text-sm uppercase tracking-widest text-sage-700 hover:text-sage-900 border-b border-sage-700 pb-1">
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-medium text-stone-700 uppercase tracking-wider mb-2">First Name *</label>
                        <input required type="text" placeholder="Jane" className="w-full bg-white border border-stone-200 p-3.5 text-stone-900 placeholder:text-stone-300 focus:outline-none focus:border-sage-500 transition-colors" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-stone-700 uppercase tracking-wider mb-2">Last Name *</label>
                        <input required type="text" placeholder="Doe" className="w-full bg-white border border-stone-200 p-3.5 text-stone-900 placeholder:text-stone-300 focus:outline-none focus:border-sage-500 transition-colors" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-medium text-stone-700 uppercase tracking-wider mb-2">Email Address *</label>
                        <input required type="email" placeholder="jane@example.com" className="w-full bg-white border border-stone-200 p-3.5 text-stone-900 placeholder:text-stone-300 focus:outline-none focus:border-sage-500 transition-colors" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-stone-700 uppercase tracking-wider mb-2">Phone Number</label>
                        <input type="tel" placeholder="+234 800 000 0000" className="w-full bg-white border border-stone-200 p-3.5 text-stone-900 placeholder:text-stone-300 focus:outline-none focus:border-sage-500 transition-colors" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-stone-700 uppercase tracking-wider mb-2">Service of Interest</label>
                      <select className="w-full bg-white border border-stone-200 p-3.5 text-stone-900 focus:outline-none focus:border-sage-500 transition-colors appearance-none">
                        <option value="">Select a service...</option>
                        <option>Skin Treatments</option>
                        <option>Massage Therapy</option>
                        <option>Luxury Facials</option>
                        <option>Home Services</option>
                        <option>Bridal / Event Package</option>
                        <option>General Enquiry</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-stone-700 uppercase tracking-wider mb-2">Your Message *</label>
                      <textarea required rows={5} placeholder="Tell us about your needs, preferred dates, or any questions..." className="w-full bg-white border border-stone-200 p-3.5 text-stone-900 placeholder:text-stone-300 focus:outline-none focus:border-sage-500 transition-colors resize-none"></textarea>
                    </div>
                    <button type="submit" disabled={loading} className="w-full bg-stone-900 text-stone-50 py-4 uppercase tracking-[0.2em] text-sm hover:bg-sage-700 transition-colors duration-300 disabled:opacity-70">
                      {loading ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-sm uppercase tracking-[0.2em] text-sage-700 font-medium mb-4">FAQ</h2>
            <h3 className="text-3xl md:text-4xl font-serif text-stone-900">Common questions</h3>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-white border border-stone-100 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-stone-50 transition-colors"
                >
                  <span className="font-serif text-stone-900 pr-4">{faq.question}</span>
                  {openFaq === index
                    ? <ChevronUp className="w-4 h-4 text-sage-600 flex-shrink-0" />
                    : <ChevronDown className="w-4 h-4 text-stone-400 flex-shrink-0" />
                  }
                </button>
                {openFaq === index && (
                  <div className="px-5 pb-5">
                    <p className="text-stone-500 font-light leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
