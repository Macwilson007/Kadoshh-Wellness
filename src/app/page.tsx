"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Clock, ShieldCheck } from 'lucide-react';

export default function Home() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/content')
      .then(res => res.json())
      .then(resData => {
        setData(resData);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-stone-200 border-t-stone-800 rounded-full animate-spin" />
    </div>
  );

  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-stone-900">
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={data.hero?.backgroundImage}
            alt="Wellness Sanctuary"
            className="w-full h-full object-cover scale-105 animate-slow-zoom opacity-60"
          />
          <div className="absolute inset-0 bg-stone-900/40" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 
              className="font-serif text-5xl md:text-7xl lg:text-8xl text-stone-50 mb-6 leading-[1.1]"
              dangerouslySetInnerHTML={{ __html: data.hero?.title }}
            />
            <p className="font-sans text-stone-200 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light leading-relaxed">
              {data.hero?.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/services" className="bg-stone-50 text-stone-900 px-8 py-4 rounded-sm transition-all hover:bg-stone-200 uppercase tracking-widest text-xs font-bold shadow-xl">
                Explore Treatments
              </Link>
              <Link href="/contact" className="border border-stone-100/30 text-stone-50 px-8 py-4 rounded-sm transition-all hover:bg-white/10 backdrop-blur-sm uppercase tracking-widest text-xs font-bold">
                Book Appointment
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
           <span className="text-stone-300 text-[10px] uppercase tracking-[4px] font-bold">Scroll</span>
           <div className="w-[1px] h-12 bg-gradient-to-b from-stone-400 to-transparent" />
        </div>
      </section>

      {/* Services Grid Section */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-[10px] font-bold text-sage-600 uppercase tracking-[5px] mb-4">The Selection</h2>
            <h3 className="font-serif text-4xl md:text-5xl text-stone-900 mb-6">Our Core Treatments</h3>
            <div className="w-20 h-[1px] bg-stone-200 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            {data.services?.map((service: any, index: number) => (
              <motion.div 
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group flex flex-col items-center text-center"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden mb-8 shadow-2xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-stone-900/0 transition-colors" />
                </div>
                <h4 className="font-serif text-2xl text-stone-900 mb-4">{service.title}</h4>
                <p className="text-stone-500 font-light text-sm leading-relaxed mb-6 px-4">
                  {service.description}
                </p>
                <Link href={`/services#${service.id}`} className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-stone-900 hover:gap-4 transition-all">
                  Details <ArrowRight size={14} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 bg-stone-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="lg:w-1/2 relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-sage-100 opacity-50 blur-3xl rounded-full" />
              <div className="relative z-10 rounded-sm overflow-hidden shadow-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={data.about?.image} 
                  alt="Spa Sanctuary" 
                  className="w-full aspect-[4/5] object-cover" 
                />
              </div>
              <div className="absolute -bottom-10 -right-10 bg-white p-8 border border-stone-100 shadow-xl hidden md:block">
                 <div className="flex items-center gap-4 mb-2">
                   <div className="flex">
                     {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-stone-900 text-stone-900" />)}
                   </div>
                   <span className="text-[10px] uppercase font-bold tracking-widest text-stone-500">Service Rating</span>
                 </div>
                 <p className="font-serif text-xl italic text-stone-800">"The absolute pinnacle of luxury in Lagos."</p>
              </div>
            </div>
            
            <div className="lg:w-1/2 space-y-8">
              <h2 className="text-[10px] font-bold text-sage-600 uppercase tracking-[5px]">The Philosophy</h2>
              <h3 className="font-serif text-4xl md:text-5xl text-stone-900 leading-[1.2]">
                {data.about?.title}
              </h3>
              <div className="space-y-6 text-stone-600 font-light leading-relaxed">
                <p>{data.about?.paragraph1}</p>
                <p>{data.about?.paragraph2}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-8 pt-8 border-t border-stone-200">
                {data.about?.stats?.map((stat: any, index: number) => (
                  <div key={index}>
                    <div className="font-serif text-3xl text-stone-900 mb-1">{stat.value}</div>
                    <div className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="pt-8">
                <Link href="/about" className="inline-flex items-center gap-3 bg-stone-900 text-stone-50 px-8 py-4 rounded-sm text-[10px] font-bold uppercase tracking-widest hover:bg-sage-800 transition-colors shadow-lg">
                  Learn Our Story <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Pills */}
      <section className="bg-white py-12 border-y border-stone-100">
        <div className="max-w-7xl mx-auto px-4">
           <div className="flex flex-wrap justify-center gap-10 md:gap-20">
             {[
               { icon: ShieldCheck, text: "Medical Grade Quality" },
               { icon: Clock, text: "Strictly by Appointment" },
               { icon: Star, text: "Premium Aftercare" }
             ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <item.icon size={20} className="text-stone-400" />
                  <span className="text-[10px] uppercase tracking-[2px] font-bold text-stone-500">{item.text}</span>
                </div>
             ))}
           </div>
        </div>
      </section>

      {/* Signature Home Experience */}
      <section className="py-24 relative overflow-hidden bg-stone-900">
         <div className="absolute inset-0 opacity-20">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/home_service.png" alt="Bg" className="w-full h-full object-cover" />
         </div>
         <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
            <h2 className="font-serif text-4xl md:text-6xl text-stone-50 mb-8 leading-tight">Can't make it to Ikoyi?<br/><span className="italic font-light opacity-80">We'll bring the sanctuary to you.</span></h2>
            <p className="text-stone-300 font-light text-lg mb-10 max-w-2xl mx-auto">Our exclusive Home Service program brings the full luxury experience to your doorstep. Same premium products, same expert therapists, total privacy.</p>
            <Link href="/contact" className="inline-block bg-white text-stone-900 px-10 py-5 rounded-sm text-xs font-bold uppercase tracking-[3px] hover:bg-stone-200 transition-all shadow-2xl">
              Request Home Service
            </Link>
         </div>
      </section>
    </main>
  );
}
