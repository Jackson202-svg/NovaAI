import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NovaAI',
  description: 'A secure AI platform for chat, image generation, and productivity.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
