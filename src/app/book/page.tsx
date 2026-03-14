import BookingForm from '@/components/booking/BookingForm';

export const metadata = {
  title: 'Book a Sanctuary Session | Kadoshh Wellness',
  description: 'Secure your high-touch luxury skin treatment or massage at our Ikoyi sanctuary.',
};

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-stone-50/50">
      {/* Visual Header */}
      <div className="h-64 bg-stone-900 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-40">
           <img 
             src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2000&auto=format&fit=crop" 
             alt="Luxury Spa Background" 
             className="w-full h-full object-cover"
           />
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-light text-stone-50 tracking-tight">Schedule Your Sanctuary Session</h1>
          <div className="mt-4 flex items-center justify-center gap-2">
            <span className="h-px w-8 bg-stone-400"></span>
            <span className="text-xs uppercase tracking-[0.4em] text-stone-300">Strictly by Appointment</span>
            <span className="h-px w-8 bg-stone-400"></span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 -mt-16 pb-32 relative z-20">
        <BookingForm />
      </div>

      {/* Footer Note */}
      <div className="container mx-auto px-4 pb-20 text-center">
        <p className="text-stone-400 font-light text-sm max-w-lg mx-auto leading-relaxed italic">
          "The greatest work of art is to be at peace with yourself. We provide the atmosphere for that masterpiece to emerge."
        </p>
      </div>
    </div>
  );
}
