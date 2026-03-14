"use client";

import React, { useState, useEffect } from 'react';
import { Save, Image as ImageIcon, MessageSquare, Info, LayoutGrid, Phone, Calendar, CreditCard, BarChart3, Bell, UserCheck } from 'lucide-react';

export default function AdminDashboard() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('bookings');

  useEffect(() => {
    fetch('/api/content')
      .then(res => res.json())
      .then(resData => {
        setData(resData);
        setLoading(false);
      });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const response = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setMessage('Configuration updated successfully.');
      } else {
        setMessage('Failed to update configuration.');
      }
    } catch {
      setMessage('An error occurred while saving.');
    }
    setSaving(false);
    setTimeout(() => setMessage(''), 3000);
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-stone-200 border-t-stone-800 rounded-full animate-spin"></div>
        <p className="text-stone-500 font-light tracking-widest text-xs uppercase">Initialising Dashboard...</p>
      </div>
    </div>
  );

  const tabs = [
    { id: 'bookings', label: 'Client Bookings', icon: Calendar },
    { id: 'messages', label: 'Inquiries', icon: MessageSquare },
    { id: 'payments', label: 'Financials', icon: CreditCard },
    { id: 'analytics', label: 'Performance', icon: BarChart3 },
    { id: 'hero', label: 'Hero Content', icon: ImageIcon },
    { id: 'about', label: 'Philosophy', icon: Info },
    { id: 'services', label: 'Service Catalog', icon: LayoutGrid },
    { id: 'chatbot', label: 'Voice AI Prep', icon: Bell },
    { id: 'footer', label: 'Brand Contact', icon: Phone },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-sm text-sm transition-all ${
                activeTab === tab.id 
                  ? 'bg-stone-900 text-stone-50 shadow-md translate-x-1' 
                  : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              <tab.icon size={18} />
              <span className="font-medium tracking-wide">{tab.label}</span>
            </button>
          ))}
        </aside>

        {/* Main Editor Area */}
        <main className="flex-1 bg-white border border-stone-200 rounded-sm p-6 md:p-8 shadow-sm">
          <form onSubmit={handleSave} className="space-y-8">
            <div className="flex justify-between items-center border-b border-stone-100 pb-4 mb-6">
              <h2 className="font-serif text-2xl text-stone-900 capitalize">{activeTab.replace('-', ' ')}</h2>
              <button 
                type="submit" 
                disabled={saving}
                className="flex items-center gap-2 bg-stone-900 text-stone-50 px-6 py-2 rounded-sm uppercase tracking-widest text-[10px] font-bold hover:bg-sage-700 transition-all active:scale-95 disabled:opacity-50"
              >
                {saving ? (
                  <div className="w-3 h-3 border-2 border-stone-400 border-t-white rounded-full animate-spin" />
                ) : <Save size={14} />}
                {saving ? 'Syncing...' : 'Save Changes'}
              </button>
            </div>

            {message && (
              <div className={`p-4 rounded-sm text-xs font-medium ${message.includes('successfully') ? 'bg-sage-50 text-sage-800' : 'bg-red-50 text-red-800'}`}>
                {message}
              </div>
            )}

            {/* TAB CONTENT: BOOKINGS */}
            {activeTab === 'bookings' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center bg-stone-50 p-4 rounded-sm border border-stone-100">
                  <span className="text-xs text-stone-500">You have {data.bookings?.length || 0} active appointments</span>
                  <button className="text-[10px] text-sage-700 font-bold uppercase tracking-wider">Schedule New +</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="text-[10px] uppercase tracking-widest text-stone-400 border-b border-stone-100">
                      <tr>
                        <th className="py-3 font-medium">Reference</th>
                        <th className="py-3 font-medium">Client</th>
                        <th className="py-3 font-medium">Service</th>
                        <th className="py-3 font-medium">Date/Time</th>
                        <th className="py-3 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-50">
                      {data.bookings?.map((bk: any) => (
                        <tr key={bk.id} className="hover:bg-stone-50 transition-colors">
                          <td className="py-4 font-mono text-xs text-stone-400">{bk.id}</td>
                          <td className="py-4 text-stone-900 font-medium">{bk.clientName}</td>
                          <td className="py-4 text-stone-600 text-xs">{bk.service}</td>
                          <td className="py-4 text-stone-500 text-xs">{bk.date} <span className="opacity-50">|</span> {bk.time}</td>
                          <td className="py-4 text-xs font-bold uppercase tracking-tighter text-sage-600">{bk.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB CONTENT: MESSAGES */}
            {activeTab === 'messages' && (
              <div className="space-y-6">
                {data.messages?.map((msg: any) => (
                  <div key={msg.id} className="p-6 border border-stone-100 rounded-sm hover:border-sage-200 transition-all bg-stone-50/30">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-stone-900 font-medium">{msg.name}</h4>
                        <p className="text-xs text-stone-500">{msg.email}</p>
                      </div>
                      <span className="text-[10px] text-stone-400 font-mono italic">{msg.date}</span>
                    </div>
                    <div className="bg-white p-4 rounded-sm border border-stone-100 mb-4">
                      <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">{msg.subject}</p>
                      <p className="text-sm text-stone-700 leading-relaxed font-light">{msg.message}</p>
                    </div>
                    <div className="flex gap-4">
                      <button className="text-[10px] uppercase tracking-wider font-bold text-sage-700">Reply via Email</button>
                      <button className="text-[10px] uppercase tracking-wider font-bold text-stone-400">Archive</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB CONTENT: PAYMENTS */}
            {activeTab === 'payments' && (
              <div className="space-y-8">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-sage-900 p-6 rounded-sm text-white">
                    <p className="text-[10px] uppercase tracking-widest text-sage-400 mb-1">Total Verified Revenue</p>
                    <h3 className="text-3xl font-serif">₦{(data.payments?.totalRevenue || 0).toLocaleString()}</h3>
                  </div>
                  <div className="bg-stone-900 p-6 rounded-sm text-white">
                    <p className="text-[10px] uppercase tracking-widest text-stone-400 mb-1">Outstanding Receivables</p>
                    <h3 className="text-3xl font-serif">₦{(data.payments?.pendingAmount || 0).toLocaleString()}</h3>
                  </div>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-4">Recent Transactions</h4>
                  <div className="space-y-2">
                    {data.payments?.transactions?.map((trx: any) => (
                      <div key={trx.id} className="flex justify-between items-center p-4 border border-stone-100 rounded-sm bg-white hover:shadow-sm transition-all">
                        <div className="flex items-center gap-4">
                          <div className="p-2 bg-sage-50 rounded-full text-sage-600"><CreditCard size={14} /></div>
                          <div>
                            <p className="text-sm text-stone-900 font-medium">{trx.client}</p>
                            <p className="text-[10px] text-stone-400 uppercase font-bold tracking-widest">{trx.method} • {trx.date}</p>
                          </div>
                        </div>
                        <span className="font-serif text-sage-700">₦{trx.amount.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: ANALYTICS */}
            {activeTab === 'analytics' && (
              <div className="space-y-12 pb-12">
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    { label: 'Website Visitors', value: '4,281', change: '+12% vs last month', icon: BarChart3 },
                    { label: 'Booking Rate', value: '18.4%', change: '+2.1% improvement', icon: UserCheck },
                    { label: 'Avg Order Value', value: '₦42,500', change: 'Consistent', icon: BarChart3 },
                  ].map((stat, i) => (
                    <div key={i} className="p-6 border border-stone-100 rounded-sm">
                      <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-stone-50 rounded-sm text-stone-400"><stat.icon size={16} /></div>
                        <span className="text-[10px] font-bold text-sage-600 tracking-tighter">{stat.change}</span>
                      </div>
                      <p className="text-[10px] uppercase tracking-widest text-stone-400 mb-1">{stat.label}</p>
                      <h4 className="text-2xl font-serif text-stone-900">{stat.value}</h4>
                    </div>
                  ))}
                </div>
                
                <div className="p-8 border border-stone-100 bg-stone-50 rounded-sm text-center">
                  <h4 className="font-serif text-xl mb-2 text-stone-900">Service Popularity Report</h4>
                  <p className="text-stone-500 font-light text-sm mb-6 italic">Visualizing treatment demand over the last 30 days</p>
                  <div className="flex items-end justify-center gap-4 h-48 ">
                    {[
                      { l: 'Facia', h: 'h-full', c: 'bg-sage-600' },
                      { l: 'Mass', h: 'h-[80%]', c: 'bg-stone-800' },
                      { l: 'Skin', h: 'h-[65%]', c: 'bg-stone-400' },
                      { l: 'Home', h: 'h-[40%]', c: 'bg-stone-200' },
                    ].map((bar, i) => (
                      <div key={i} className="flex flex-col items-center gap-3 flex-1 max-w-[60px]">
                        <div className={`w-full ${bar.h} ${bar.c} rounded-t-sm opacity-90 hover:opacity-100 transition-opacity`} />
                        <span className="text-[9px] uppercase font-bold tracking-tighter text-stone-400">{bar.l}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'hero' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-[2px] mb-2">Main Title Header (HTML allowed)</label>
                  <textarea 
                    rows={2}
                    value={data.hero?.title || ''}
                    onChange={e => setData({...data, hero: {...data.hero, title: e.target.value}})}
                    className="w-full bg-stone-50 border border-stone-200 p-4 text-stone-900 font-serif text-lg focus:outline-none focus:border-sage-500 rounded-sm" 
                  />
                  <p className="mt-1 text-[10px] text-stone-400">Use &lt;span class="italic font-light"&gt;text&lt;/span&gt; for stylized words.</p>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-[2px] mb-2">Compelling Subtitle</label>
                  <textarea 
                    rows={3}
                    value={data.hero?.subtitle || ''}
                    onChange={e => setData({...data, hero: {...data.hero, subtitle: e.target.value}})}
                    className="w-full bg-stone-50 border border-stone-200 p-4 text-stone-900 text-sm focus:outline-none focus:border-sage-500 rounded-sm leading-relaxed" 
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-[2px] mb-2">Primary Hero Image (Unsplash URL)</label>
                  <input 
                    type="text"
                    value={data.hero?.backgroundImage || ''}
                    onChange={e => setData({...data, hero: {...data.hero, backgroundImage: e.target.value}})}
                    className="w-full bg-stone-50 border border-stone-200 p-4 text-stone-900 text-xs focus:outline-none focus:border-sage-500 rounded-sm" 
                  />
                  <div className="mt-4 aspect-video w-full max-w-md rounded-sm overflow-hidden border border-stone-200 bg-stone-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={data.hero.backgroundImage} alt="Preview" className="w-full h-full object-cover transition-opacity duration-500" />
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: ABOUT */}
            {activeTab === 'about' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-[2px] mb-2">Section Heading</label>
                  <input 
                    type="text"
                    value={data.about?.title || ''}
                    onChange={e => setData({...data, about: {...data.about, title: e.target.value}})}
                    className="w-full bg-stone-50 border border-stone-200 p-4 text-stone-900 font-serif text-lg focus:outline-none focus:border-sage-500 rounded-sm" 
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-[2px] mb-2">Philosophy Paragraph 1</label>
                    <textarea 
                      rows={5}
                      value={data.about?.paragraph1 || ''}
                      onChange={e => setData({...data, about: {...data.about, paragraph1: e.target.value}})}
                      className="w-full bg-stone-50 border border-stone-200 p-4 text-stone-900 text-sm focus:outline-none focus:border-sage-500 rounded-sm leading-relaxed" 
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-[2px] mb-2">Philosophy Paragraph 2</label>
                    <textarea 
                      rows={5}
                      value={data.about?.paragraph2 || ''}
                      onChange={e => setData({...data, about: {...data.about, paragraph2: e.target.value}})}
                      className="w-full bg-stone-50 border border-stone-200 p-4 text-stone-900 text-sm focus:outline-none focus:border-sage-500 rounded-sm leading-relaxed" 
                    />
                  </div>
                </div>
                <div>
                  <h4 className="border-t border-stone-100 pt-6 mt-4 mb-4 text-[10px] font-bold text-stone-500 uppercase tracking-[2px]">Impact Statistics</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {data.about?.stats?.map((stat: any, index: number) => (
                      <div key={index} className="space-y-2">
                        <input 
                          type="text"
                          value={stat.value}
                          placeholder="e.g. 2,000+"
                          onChange={e => {
                            const newStats = [...data.about.stats];
                            newStats[index].value = e.target.value;
                            setData({...data, about: {...data.about, stats: newStats}});
                          }}
                          className="w-full bg-stone-50 border border-stone-200 p-2 text-stone-900 text-center font-serif focus:outline-none focus:border-sage-500 rounded-sm" 
                        />
                        <input 
                          type="text"
                          value={stat.label}
                          placeholder="Label"
                          onChange={e => {
                            const newStats = [...data.about.stats];
                            newStats[index].label = e.target.value;
                            setData({...data, about: {...data.about, stats: newStats}});
                          }}
                          className="w-full bg-stone-100 border-none p-2 text-stone-500 text-center text-[10px] uppercase tracking-wider focus:outline-none focus:bg-stone-200 rounded-sm" 
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: SERVICES */}
            {activeTab === 'services' && (
              <div className="space-y-12">
                {data.services?.map((service: any, index: number) => (
                  <div key={service.id} className="p-6 border border-stone-100 bg-stone-50/50 rounded-sm space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-sage-600 uppercase tracking-widest">Service Block {index + 1}</span>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="md:col-span-1 space-y-4">
                         <div className="aspect-[4/3] rounded-sm overflow-hidden border border-stone-200">
                           {/* eslint-disable-next-line @next/next/no-img-element */}
                           <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                         </div>
                         <input 
                          type="text"
                          value={service.image}
                          onChange={e => {
                            const newServices = [...data.services];
                            newServices[index].image = e.target.value;
                            setData({...data, services: newServices});
                          }}
                          className="w-full bg-white border border-stone-200 p-2 text-[10px] text-stone-400 focus:outline-none focus:border-sage-500 rounded-sm" 
                        />
                      </div>
                      <div className="md:col-span-2 space-y-4">
                        <input 
                          type="text"
                          value={service.title}
                          onChange={e => {
                            const newServices = [...data.services];
                            newServices[index].title = e.target.value;
                            setData({...data, services: newServices});
                          }}
                          className="w-full bg-white border border-stone-200 p-3 text-stone-900 font-serif text-lg focus:outline-none focus:border-sage-500 rounded-sm" 
                        />
                        <textarea 
                          rows={3}
                          value={service.description}
                          onChange={e => {
                            const newServices = [...data.services];
                            newServices[index].description = e.target.value;
                            setData({...data, services: newServices});
                          }}
                          className="w-full bg-white border border-stone-200 p-3 text-stone-900 text-sm focus:outline-none focus:border-sage-500 rounded-sm leading-relaxed" 
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB CONTENT: FOOTER */}
            {activeTab === 'footer' && (
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-[2px] mb-2">Location Address</label>
                    <input 
                      type="text"
                      value={data.footer?.address || ''}
                      onChange={e => setData({...data, footer: {...data.footer, address: e.target.value}})}
                      className="w-full bg-stone-50 border border-stone-200 p-4 text-stone-900 text-sm focus:outline-none focus:border-sage-500 rounded-sm" 
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-[2px] mb-2">Concierge Phone</label>
                    <input 
                      type="text"
                      value={data.footer?.phone || ''}
                      onChange={e => setData({...data, footer: {...data.footer, phone: e.target.value}})}
                      className="w-full bg-stone-50 border border-stone-200 p-4 text-stone-900 text-sm focus:outline-none focus:border-sage-500 rounded-sm" 
                    />
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-[2px] mb-2">Instagram Link (@)</label>
                    <input 
                      type="text"
                      value={data.footer?.instagram || ''}
                      onChange={e => setData({...data, footer: {...data.footer, instagram: e.target.value}})}
                      className="w-full bg-stone-50 border border-stone-200 p-4 text-stone-900 text-sm focus:outline-none focus:border-sage-500 rounded-sm" 
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-[2px] mb-2">Official Email</label>
                    <input 
                      type="text"
                      value={data.footer?.email || ''}
                      onChange={e => setData({...data, footer: {...data.footer, email: e.target.value}})}
                      className="w-full bg-stone-50 border border-stone-200 p-4 text-stone-900 text-sm focus:outline-none focus:border-sage-500 rounded-sm" 
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: CHATBOT */}
            {activeTab === 'chatbot' && (
              <div className="space-y-8">
                <div>
                  <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-[2px] mb-2">AI Greeting Message</label>
                  <textarea 
                    rows={3}
                    value={data.chatbot?.welcomeMessage || ''}
                    onChange={e => setData({...data, chatbot: {...data.chatbot, welcomeMessage: e.target.value}})}
                    className="w-full bg-stone-50 border border-stone-200 p-4 text-stone-900 text-sm focus:outline-none focus:border-sage-500 rounded-sm" 
                  />
                  <p className="mt-2 text-[10px] text-stone-400 italic font-medium tracking-wide">This is the first message users see when opening the Voice Assistant.</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8 pt-4 border-t border-stone-100">
                  <div>
                    <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-[2px] mb-2">Voice Speed (0.1 - 2.0)</label>
                    <div className="flex items-center gap-4">
                      <input 
                        type="range" min="0.5" max="1.5" step="0.05"
                        value={data.chatbot?.voiceRate || 1}
                        onChange={e => setData({...data, chatbot: {...data.chatbot, voiceRate: parseFloat(e.target.value)}})}
                        className="flex-1 accent-stone-800" 
                      />
                      <span className="text-xs font-mono w-10 text-right">{data.chatbot?.voiceRate}</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-[2px] mb-2">Voice Pitch (0.1 - 2.0)</label>
                    <div className="flex items-center gap-4">
                      <input 
                        type="range" min="0.5" max="1.5" step="0.05"
                        value={data.chatbot?.voicePitch || 1}
                        onChange={e => setData({...data, chatbot: {...data.chatbot, voicePitch: parseFloat(e.target.value)}})}
                        className="flex-1 accent-stone-800" 
                      />
                      <span className="text-xs font-mono w-10 text-right">{data.chatbot?.voicePitch}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-sage-50 p-6 rounded-sm space-y-2 border-l-4 border-sage-500">
                  <h4 className="text-[10px] font-bold text-sage-900 uppercase tracking-widest">Automation Note</h4>
                  <p className="text-xs text-sage-700 leading-relaxed font-light">
                    The AI currently recognizes intent for: <strong>Bookings, Pricing, and Operating Hours</strong>. 
                    It captures phone numbers and triggers notification alerts to the human concierge team automatically.
                  </p>
                </div>
              </div>
            )}
          </form>
        </main>
      </div>
    </div>
  );
}
