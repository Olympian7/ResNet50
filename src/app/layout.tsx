import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import AppHeader from '@/components/app/header';
import AppFooter from '@/components/app/footer';
import { LanguageProvider } from '@/hooks/use-language';

export const metadata: Metadata = {
  title: 'AgriAssist',
  description: 'Diagnose crop diseases and get expert farming advice instantly.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Alegreya:ital,wght@0,400..900;1,400..900&family=Belleza&display=swap" rel="stylesheet" />
      </head>
      <body
        className={cn(
          'min-h-screen font-body antialiased bg-gradient-to-br from-background via-secondary to-background'
        )}
      >
        <LanguageProvider>
          <div className="relative flex min-h-screen flex-col">
            <AppHeader />
            <main className="flex-1">{children}</main>
            <AppFooter />
          </div>
          <Toaster />
        </LanguageProvider>
      </body>
    </html>
  );
}
