import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';

import { Providers } from '@/components/providers';

import './globals.css';

const sfPro = localFont({
    src: [
        {
            path: '../../public/fonts/SF-Pro-Display-Regular.otf',
            weight: '400',
            style: 'normal'
        },
        {
            path: '../../public/fonts/SF-Pro-Display-Medium.otf',
            weight: '500',
            style: 'normal'
        },
        {
            path: '../../public/fonts/SF-Pro-Display-Bold.otf',
            weight: '700',
            style: 'normal'
        }
    ],
    variable: '--font-sf-pro'
});

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Brandon White',
    description: 'Full Stack Developer'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='en' className={`${sfPro.variable}`}>
            <body className={`${inter.className} font-sans`}>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
