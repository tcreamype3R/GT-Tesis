import type { Metadata } from 'next';
// import { GeistSans } from 'geist/font/sans'; // Removed problematic import
// import { GeistMono } from 'geist/font/mono'; // Removed problematic import
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: 'ThesisFlow',
  description: 'Planifica tu tesis de forma inteligente',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es"> {/* Removed GeistSans.variable */}
      <body className={`antialiased font-sans`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
