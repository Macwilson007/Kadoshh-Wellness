"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, Clock, ChevronRight, Check, Loader2 } from 'lucide-react';
import { useAuth } from '@/components/AuthContext';

interface Service {
  id: string;
  title: string;
  price: number;
  duration: string;
  description: string;
}

const TIMES = [
  "09:00 AM", "10:30 AM", "12:00 PM", 
  "01:30 PM", "03:00 PM", "04:30 PM", "06:00 PM"
];

export default function BookingForm() {
  const router = useRouter();
  const { user } = useAuth();
  
  const [step, setStep] = useState(1);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  const [selectedService, setSelectedService] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch('/api/content')
      .then(res => res.json())
      .then(data => {
        setServices(data.services);
        setLoading(false);
      });
  }, []);

  const handleBooking = async () => {
    if (!user) {
      router.push(`/login?redirect=/book`);
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceId: selectedService,
          date: selectedDate,
          time: selectedTime
        })
      });

      const data = await res.json();

      if (res.ok) {
        setStep(4);
      } else {
        setError(data.error || "Booking failed");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return (
    <div className="flex justify-center py-20">
      <Loader2 className="animate-spin text-stone-400" size={32} />
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="flex justify-between mb-12 relative px-4">
        <div className="absolute top-1/2 left-0 w-full h-px bg-stone-200 -z-10"></div>
        {[1, 2, 3].map((s) => (
          <div 
            key={s} 
            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm transition-all duration-500 ${
              step >= s ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-400'
            }`}
          >
            {step > s ? <Check size={18} /> : s}
          </div>
        ))}
      </div>

      <div className="bg-white border border-stone-200 rounded-sm p-8 md:p-12 shadow-sm min-h-[500px] flex flex-col">
        
        {/* Step 1: Select Service */}
        {step === 1 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header className="text-center">
              <h2 className="text-3xl font-light text-stone-900 mb-2">Select Treatment</h2>
              <p className="text-stone-500 font-light">Choose the experience you wish to embrace.</p>
            </header>
            
            <div className="grid gap-4">
              {services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => setSelectedService(service.id)}
                  className={`p-6 text-left border rounded-sm transition-all hover:border-stone-900 group ${
                    selectedService === service.id ? 'border-stone-900 bg-stone-50' : 'border-stone-100'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-light text-stone-800">{service.title}</h3>
                    <span className="text-lg font-light">₦{service.price.toLocaleString()}</span>
                  </div>
                  <p className="text-sm text-stone-500 mb-3 font-light leading-relaxed">{service.description}</p>
                  <span className="text-[10px] uppercase tracking-widest text-stone-400 font-semibold">{service.duration} Session</span>
                </button>
              ))}
            </div>

            <button
              disabled={!selectedService}
              onClick={() => setStep(2)}
              className="w-full bg-stone-900 text-stone-50 py-4 rounded-sm uppercase text-xs tracking-[0.2em] font-medium hover:bg-stone-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-8"
            >
              Continue <ChevronRight size={14} />
            </button>
          </div>
        )}

        {/* Step 2: Date & Time */}
        {step === 2 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <header className="text-center">
              <h2 className="text-3xl font-light text-stone-900 mb-2">Timing</h2>
              <p className="text-stone-500 font-light">Secure your slot in our sanctuary.</p>
            </header>

            <div className="space-y-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-stone-400 mb-3 font-semibold">Preferred Date</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" size={18} />
                  <input 
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 border border-stone-200 rounded-sm focus:outline-none focus:border-stone-900 font-light text-stone-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-stone-400 mb-3 font-semibold">Available Sittings</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {TIMES.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`py-3 border text-xs tracking-wider rounded-sm transition-all ${
                        selectedTime === time ? 'bg-stone-900 text-white border-stone-900' : 'border-stone-200 hover:border-stone-400 text-stone-600'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-8">
              <button
                onClick={() => setStep(1)}
                className="flex-1 py-4 border border-stone-200 text-stone-600 rounded-sm uppercase text-xs tracking-widest hover:bg-stone-50"
              >
                Back
              </button>
              <button
                disabled={!selectedDate || !selectedTime}
                onClick={() => setStep(3)}
                className="flex-[2] bg-stone-900 text-stone-50 py-4 rounded-sm uppercase text-xs tracking-[0.2em] font-medium hover:bg-stone-800 disabled:opacity-50"
              >
                Review
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Review */}
        {step === 3 && (
          <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500 flex flex-col flex-1">
            <header className="text-center">
              <h2 className="text-3xl font-light text-stone-900 mb-2">Final Review</h2>
              <p className="text-stone-500 font-light">Confirm your journey details.</p>
            </header>

            <div className="bg-stone-50 p-8 space-y-4 rounded-sm border border-stone-100 flex-1">
              <div className="flex justify-between py-2 border-b border-stone-200">
                <span className="text-xs uppercase tracking-widest text-stone-400">Treatment</span>
                <span className="text-stone-800 font-light">{services.find(s => s.id === selectedService)?.title}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-stone-200">
                <span className="text-xs uppercase tracking-widest text-stone-400">Date</span>
                <span className="text-stone-800 font-light">{selectedDate}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-stone-200">
                <span className="text-xs uppercase tracking-widest text-stone-400">Time</span>
                <span className="text-stone-800 font-light">{selectedTime}</span>
              </div>
              <div className="flex justify-between py-4 mt-4">
                <span className="text-xs uppercase tracking-widest text-stone-900 font-bold">Total Investment</span>
                <span className="text-2xl font-light text-stone-900">₦{services.find(s => s.id === selectedService)?.price.toLocaleString()}</span>
              </div>
              
              {!user && (
                <p className="text-xs text-amber-600 bg-amber-50 p-3 rounded-sm border border-amber-100 text-center">
                  You will be prompted to sign in to confirm your booking.
                </p>
              )}
              {error && (
                <p className="text-xs text-red-600 bg-red-50 p-3 rounded-sm border border-red-100 text-center">
                  {error}
                </p>
              )}
            </div>

            <div className="flex gap-4 pt-4">
              <button
                onClick={() => setStep(2)}
                className="flex-1 py-4 border border-stone-200 text-stone-600 rounded-sm uppercase text-xs tracking-widest hover:bg-stone-50"
              >
                Adjust
              </button>
              <button
                disabled={submitting}
                onClick={handleBooking}
                className="flex-[2] bg-stone-900 text-stone-50 py-4 rounded-sm uppercase text-xs tracking-[0.2em] font-medium hover:bg-stone-800 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {submitting ? <Loader2 className="animate-spin" size={16} /> : "Confirm Sanctuary Session"}
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Success */}
        {step === 4 && (
          <div className="flex-1 flex flex-col items-center justify-center space-y-8 animate-in fade-in zoom-in-95 duration-700 text-center py-12">
            <div className="w-24 h-24 bg-sage-50 rounded-full flex items-center justify-center text-sage-600 mb-4 animate-bounce">
              <Check size={48} />
            </div>
            <div>
              <h2 className="text-4xl font-light text-stone-900 mb-4">Confirmed.</h2>
              <p className="text-stone-600 font-light max-w-sm mx-auto leading-relaxed">
                Your sanctuary slot has been secured. We await your presence at Kadoshh Wellness.
              </p>
            </div>
            
            <div className="space-y-3 w-full pt-8">
              <button
                onClick={() => router.push('/profile')}
                className="w-full bg-stone-900 text-stone-50 py-4 rounded-sm uppercase text-xs tracking-widest hover:bg-stone-800 transition-colors"
              >
                View My Guest Journey
              </button>
              <button
                onClick={() => router.push('/')}
                className="w-full py-4 text-stone-500 uppercase text-[10px] tracking-[0.3em] hover:text-stone-900 transition-colors"
              >
                Back to Sanctuary Home
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
