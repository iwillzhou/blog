import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from 'src/components/header';
import Footer from 'src/components/footer';
import { ThemeProvider } from 'src/components/theme-provider';
import 'src/styles/index.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: '个人笔记',
    description: 'My learning note as a developer'
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="zh">
            <body className={inter.className}>
                <ThemeProvider defaultTheme="dark" attribute="class">
                    <div className="flex min-h-screen flex-col">
                        <Header />
                        <main className="flex-grow">{children}</main>
                        <Footer />
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
}
