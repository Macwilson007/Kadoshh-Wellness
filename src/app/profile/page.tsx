"use client";

import { useAuth } from '@/components/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { User, Calendar, Settings, LogOut, ShieldCheck, Clock, CreditCard } from 'lucide-react';

interface Booking {
  id: string;
  serviceTitle: string;
  date: string;
  time: string;
  status: string;
  price: number;
}

export default function ProfilePage() {
  const { user, loading, logout } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [fetching, setFetching] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'preferences'>('overview');
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
    if (user) {
      setFetching(true);
      fetch('/api/bookings')
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) {
            setBookings(data);
          } else {
            console.error("Expected array for bookings, got:", data);
            setBookings([]);
          }
        })
        .catch(err => {
          console.error("Booking fetch error:", err);
          setBookings([]);
        })
        .finally(() => setFetching(false));
    }
  }, [user, loading, router]);

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-8 h-8 border-2 border-stone-200 border-t-stone-800 rounded-full animate-spin"></div>
    </div>
  );

  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 pt-32 pb-20">
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
              <button 
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-sm transition-colors ${activeTab === 'overview' ? 'text-stone-900 bg-stone-50 font-medium' : 'text-stone-600 hover:bg-stone-50'}`}
              >
                <ShieldCheck className="w-4 h-4" /> Account Overview
              </button>
              <button 
                onClick={() => setActiveTab('bookings')}
                className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-sm transition-colors ${activeTab === 'bookings' ? 'text-stone-900 bg-stone-50 font-medium' : 'text-stone-600 hover:bg-stone-50'}`}
              >
                <Calendar className="w-4 h-4" /> My Bookings
              </button>
              <button 
                onClick={() => setActiveTab('preferences')}
                className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-sm transition-colors ${activeTab === 'preferences' ? 'text-stone-900 bg-stone-50 font-medium' : 'text-stone-600 hover:bg-stone-50'}`}
              >
                <Settings className="w-4 h-4" /> Preferences
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
          {activeTab === 'overview' && (
            <>
              <div className="bg-white p-8 border border-stone-200 rounded-sm">
                <h3 className="text-xs uppercase tracking-widest text-stone-500 mb-6 font-semibold">Guest Journey</h3>
                <h1 className="text-4xl font-light text-stone-800 mb-4 tracking-tight">Hello, {user.name.split(' ')[0]}.</h1>
                <p className="text-stone-600 leading-relaxed font-light">
                  This is your Kadoshh Haven. Here you can track your skin rejuvenation journey and manage your upcoming bespoke treatments.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 border border-stone-200 rounded-sm">
                  <h4 className="text-xs uppercase tracking-widest text-stone-500 mb-4">Membership Level</h4>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center text-amber-600">
                      <CreditCard className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-stone-900 font-medium">Sanctuary Member</p>
                      <p className="text-xs text-stone-500">Tier: Elite Recognition</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 border border-stone-200 rounded-sm">
                  <h4 className="text-xs uppercase tracking-widest text-stone-500 mb-4">Active Sessions</h4>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-stone-50 rounded-full flex items-center justify-center text-stone-600">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-stone-900 font-medium">{bookings.length} {bookings.length === 1 ? 'Session' : 'Sessions'} Scheduled</p>
                      <p className="text-xs text-stone-500">Status: Account Active</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Next Session Preview */}
              {bookings.length > 0 && (
                <div className="bg-stone-50 border border-stone-200 rounded-sm p-6">
                   <h4 className="text-xs uppercase tracking-widest text-stone-500 mb-4">Next Sanctuary Session</h4>
                   <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div>
                        <h5 className="text-xl font-light text-stone-800">{bookings[0].serviceTitle}</h5>
                        <div className="flex gap-4 text-xs text-stone-500 uppercase tracking-tighter mt-1">
                          <span className="flex items-center gap-1"><Calendar size={12}/> {bookings[0].date}</span>
                          <span className="flex items-center gap-1"><Clock size={12}/> {bookings[0].time}</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => setActiveTab('bookings')}
                        className="text-xs uppercase tracking-widest border border-stone-300 px-4 py-2 hover:bg-stone-900 hover:text-white transition-all"
                      >
                        View Details
                      </button>
                   </div>
                </div>
              )}
            </>
          )}

          {activeTab === 'bookings' && (
            <div className="space-y-6">
              <h3 className="text-xs uppercase tracking-widest text-stone-500 font-semibold px-1">Upcoming Sanctuary Sessions</h3>
              
              {fetching ? (
                <div className="animate-pulse bg-stone-100 h-24 rounded-sm"></div>
              ) : bookings.length > 0 ? (
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="bg-white p-6 border border-stone-200 rounded-sm flex justify-between items-center">
                      <div className="space-y-2">
                        <h4 className="font-light text-xl text-stone-800">{booking.serviceTitle}</h4>
                        <div className="flex gap-4 text-xs text-stone-500 uppercase tracking-tighter">
                          <span className="flex items-center gap-1"><Calendar size={12}/> {booking.date}</span>
                          <span className="flex items-center gap-1"><Clock size={12}/> {booking.time}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-light text-stone-900">₦{booking.price.toLocaleString()}</p>
                        <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 bg-sage-50 text-sage-700 border border-sage-100 rounded-full">
                          {booking.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-stone-900 p-8 rounded-sm text-stone-50 shadow-sm border border-stone-800">
                  <h4 className="text-xs uppercase tracking-widest text-stone-400 mb-2">No Active Bookings</h4>
                  <p className="text-xl font-light mb-4">You haven't scheduled your next sanctuary session yet.</p>
                  <button onClick={() => router.push('/book')} className="text-xs uppercase tracking-tighter border-b border-stone-500 hover:border-stone-50 transition-colors pb-1">
                    Schedule Sanctuary Session
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'preferences' && (
            <div className="bg-white p-8 border border-stone-200 rounded-sm">
              <h3 className="text-xs uppercase tracking-widest text-stone-500 mb-6 font-semibold">Sanctuary Preferences</h3>
              <div className="space-y-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-stone-800 font-medium">Olfactory Experience</h4>
                    <p className="text-sm text-stone-500">Choice of candles and oils during treatment.</p>
                  </div>
                  <select className="bg-stone-50 border border-stone-200 text-sm p-1 px-2 focus:outline-none">
                    <option>Sandalwood & Oud</option>
                    <option>Lavender & Musk</option>
                    <option>No Fragrance</option>
                  </select>
                </div>
                <div className="flex items-start justify-between pt-4 border-t border-stone-50">
                  <div>
                    <h4 className="text-stone-800 font-medium">Appointment Notifications</h4>
                    <p className="text-sm text-stone-500">Receive luxury lifestyle updates & reminders.</p>
                  </div>
                  <input type="checkbox" defaultChecked className="mt-1 accent-stone-900" />
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
