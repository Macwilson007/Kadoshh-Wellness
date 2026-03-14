"use client";
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

import { useAuth } from '@/components/AuthContext';
import { User } from 'lucide-react';

const WHATSAPP_LINK = "https://wa.me/2349098914461";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, loading } = useAuth();

  return (
    <nav className="fixed w-full z-50 bg-stone-50/90 backdrop-blur-md border-b border-stone-200 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="font-serif text-2xl tracking-widest text-stone-900">
              KADOSHH
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/services" className="text-stone-600 hover:text-stone-900 transition-colors uppercase text-sm tracking-wider">Services</Link>
            <Link href="/about" className="text-stone-600 hover:text-stone-900 transition-colors uppercase text-sm tracking-wider">About</Link>
            <Link href="/contact" className="text-stone-600 hover:text-stone-900 transition-colors uppercase text-sm tracking-wider">Contact</Link>
            
            {loading ? (
              <div className="w-4 h-4 border border-stone-200 border-t-stone-800 rounded-full animate-spin"></div>
            ) : user ? (
              <Link href="/profile" className="flex items-center gap-2 text-stone-900 font-medium uppercase text-xs tracking-widest border-b border-stone-900 pb-1">
                <User size={14} /> Profile
              </Link>
            ) : (
              <Link href="/login" className="text-stone-600 hover:text-stone-900 transition-colors uppercase text-sm tracking-wider">Sign In</Link>
            )}

            <Link 
              href="/book"
              className="bg-stone-900 text-stone-50 px-6 py-2.5 rounded-sm uppercase text-xs tracking-widest hover:bg-stone-800 transition-colors"
            >
              Book Now
            </Link>
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-stone-900 hover:text-stone-600 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-stone-50 border-b border-stone-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-center">
            <Link href="/services" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-stone-600 hover:text-stone-900 uppercase text-sm tracking-wider">Services</Link>
            <Link href="/about" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-stone-600 hover:text-stone-900 uppercase text-sm tracking-wider">About</Link>
            <Link href="/location" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-stone-600 hover:text-stone-900 uppercase text-sm tracking-wider">Location</Link>
            <Link href="/contact" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-stone-600 hover:text-stone-900 uppercase text-sm tracking-wider">Contact</Link>
            <Link 
              href="/book"
              onClick={() => setIsOpen(false)}
              className="block mt-4 bg-stone-900 text-stone-50 px-6 py-3 rounded-sm uppercase text-xs tracking-widest mx-4"
            >
              Book Appointment
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
