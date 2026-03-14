'use client';

import { useAuth } from '@/components/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { User, Calendar, Settings, LogOut, ShieldCheck } from 'lucide-react';

export default function ProfilePage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-8 h-8 border-2 border-stone-200 border-t-stone-800 rounded-full animate-spin"></div>
    </div>
  );

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Profile Sidebar */}
        <aside className="w-full md:w-64 space-y-6">
          <div className="bg-white p-6 border border-stone-200 rounded-sm">
            <div className="w-20 h-20 bg-stone-100 rounded-full mx-auto flex items-center justify-center mb-4">
              <User className="w-10 h-10 text-stone-400" />
            </div>
            <h2 className="text-xl font-light text-center text-stone-800 mb-1">{user.name}</h2>
            <p className="text-xs text-stone-500 text-center tracking-tight mb-4">{user.email}</p>
            
            <div className="pt-4 border-t border-stone-100 space-y-1">
              <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-stone-800 bg-stone-50 rounded-sm font-medium">
                <ShieldCheck className="w-4 h-4" /> Account Overview
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-stone-600 hover:bg-stone-50 rounded-sm transition-colors">
                <Calendar className="w-4 h-4" /> My Bookings
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-stone-600 hover:bg-stone-50 rounded-sm transition-colors">
                <Settings className="w-4 h-4" /> Treatment Preferences
              </button>
              <button 
                onClick={() => { logout(); router.push('/'); }}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-sm transition-colors mt-4"
              >
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            </div>
          </div>
        </aside>

        {/* Profile Content */}
        <main className="flex-1 space-y-8">
          <div className="bg-white p-8 border border-stone-200 rounded-sm">
            <h3 className="text-xs uppercase tracking-widest text-stone-500 mb-6 font-semibold">Welcome Back</h3>
            <h1 className="text-4xl font-light text-stone-800 mb-4 tracking-tight">Hello, {user.name.split(' ')[0]}.</h1>
            <p className="text-stone-600 leading-relaxed font-light">
              This is your Kadoshh Haven. Here you can track your skin rejuvenation journey, manage your upcoming bespoke treatments, and personalize your high-touch sanctuary experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-stone-900 p-8 rounded-sm text-stone-50 shadow-sm border border-stone-800">
              <h4 className="text-xs uppercase tracking-widest text-stone-400 mb-2">Upcoming Treatment</h4>
              <p className="text-xl font-light mb-4">No active bookings found.</p>
              <button onClick={() => router.push('/services')} className="text-xs uppercase tracking-tighter border-b border-stone-500 hover:border-stone-50 transition-colors pb-1">
                Schedule Sanctuary Session
              </button>
            </div>
            
            <div className="bg-white p-8 border border-stone-200 rounded-sm">
              <h4 className="text-xs uppercase tracking-widest text-stone-500 mb-2">Sanctuary Status</h4>
              <p className="text-xl font-light text-stone-800 mb-1">Elite Guest</p>
              <p className="text-xs text-stone-500">Thank you for choosing Kadoshh Wellness.</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
