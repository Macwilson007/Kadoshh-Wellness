"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const WHATSAPP_LINK = "https://wa.me/2349098914461";

export default function Footer() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch('/api/content')
      .then(res => res.json())
      .then(setData);
  }, []);

  const address = data?.footer?.address || "Ikoyi, Lagos, Nigeria";
  const phone = data?.footer?.phone || "+234 909 891 4461";
  const instagram = data?.footer?.instagram || "@kadoshhwellness";
  const email = data?.footer?.email || "hello@kadoshhwellness.com";

  return (
    <footer className="bg-stone-950 text-stone-400 py-16 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          <div>
            <h4 className="font-serif text-2xl tracking-widest text-stone-50 mb-6">KADOSHH</h4>
            <p className="font-light leading-relaxed mb-6 max-w-xs">
              Premium skin treatments, massage, facials, and wellness services in Ikoyi.
            </p>
            <p className="text-sm">
              Strictly by Appointment.
            </p>
          </div>
          
          <div>
            <h5 className="uppercase tracking-widest text-sm text-stone-50 mb-6">Contact</h5>
            <ul className="space-y-4 font-light text-sm">
              <li>{address}</li>
              <li><a href={`mailto:${email}`} className="hover:text-stone-50 transition-colors">{email}</a></li>
              <li><a href={`tel:${phone.replace(/[^0-9+]/g, '')}`} className="hover:text-stone-50 transition-colors">{phone}</a></li>
              <li><a href={`https://instagram.com/${instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="hover:text-stone-50 transition-colors">Instagram: {instagram}</a></li>
            </ul>
          </div>
          
          <div>
            <h5 className="uppercase tracking-widest text-sm text-stone-50 mb-6">Quick Links</h5>
            <ul className="space-y-4 font-light text-sm">
              <li><Link href="/services" className="hover:text-stone-50 transition-colors">Services</Link></li>
              <li><Link href="/about" className="hover:text-stone-50 transition-colors">Our Philosophy</Link></li>
              <li><Link href="/location" className="hover:text-stone-50 transition-colors">Location</Link></li>
              <li><Link href="/contact" className="hover:text-stone-50 transition-colors">Contact Us</Link></li>
              <li><a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-stone-50 transition-colors">Book Appointment</a></li>
            </ul>
          </div>

        </div>
        
        <div className="pt-8 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center text-xs font-light">
          <p>© {new Date().getFullYear()} Kadoshh Wellness. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-stone-50 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-stone-50 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
