'use client';
import { Toaster } from 'sonner';

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: '#fff',
          border: '1px solid #f3e8f0',
          borderRadius: '12px',
          fontFamily: 'system-ui, sans-serif',
        },
      }}
    />
  );
}
