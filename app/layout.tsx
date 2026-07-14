import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { QueryProvider } from '@/components/QueryProvider';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: 'VelvetStore — Curated Fashion',
  description: 'Discover premium fashion, electronics, and jewellery at VelvetStore.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased flex flex-col min-h-screen font-sans bg-white">
        <QueryProvider>
          <Toaster 
            position="top-right" 
            richColors 
            toastOptions={{ duration: 2500 }}
            closeButton
          />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}
