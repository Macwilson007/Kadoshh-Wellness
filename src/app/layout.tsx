import type { Metadata } from 'next';
import { Playfair_Display, Lato } from 'next/font/google';
import './globals.css';
import ConditionalLayout from '@/components/layout/ConditionalLayout';
import ChatBot from '@/components/chat/ChatBot';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const lato = Lato({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  variable: '--font-lato',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Kadoshh Aesthetics & Wellness',
  description: 'Premium Skin Treatments, Massage, Facials, and Home Services in Ikoyi.',
};

import { AuthProvider } from '@/components/AuthContext';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${lato.variable} ${playfair.variable} font-sans antialiased bg-stone-50 text-stone-900`}>
        <AuthProvider>
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
          <ChatBot />
        </AuthProvider>
      </body>
    </html>
  );
}
