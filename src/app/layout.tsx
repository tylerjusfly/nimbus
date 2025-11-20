import type { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/toaster';
import { EmailProvider } from '@/providers/email-provider';
import { MainNav } from '@/components/main-nav';
import { FirebaseClientProvider } from '@/firebase/client-provider';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'NimbusMail',
  description: 'An elegant email reader with forwarding capabilities.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-body antialiased',
          inter.variable
        )}
      >
        <FirebaseClientProvider>
          <EmailProvider>
            <SidebarProvider>
              <Sidebar
                collapsible="icon"
                className="group-data-[variant=sidebar]:border-r-0"
              >
                <MainNav />
              </Sidebar>
              <SidebarInset>{children}</SidebarInset>
            </SidebarProvider>
          </EmailProvider>
        </FirebaseClientProvider>
        <Toaster />
      </body>
    </html>
  );
}
