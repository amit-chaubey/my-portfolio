import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ChatWidget } from '@/components/chat/ChatWidget';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Amit Chaubey - Portfolio',
  description: 'Personal portfolio and blog of Amit Chaubey',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col dark:bg-gray-900 dark:text-white">
            <Header />
            <main className="flex-grow flex items-center justify-center px-4 my-20">
              <div className="w-full max-w-4xl py-20">
                {children}
              </div>
            </main>
            <Footer />
            <ChatWidget />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}