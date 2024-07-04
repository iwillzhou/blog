import { Inter } from 'next/font/google';
import Header from 'src/components/header';
import Footer from 'src/components/footer';
import { Locale, locales } from 'src/config';
import { NextIntlClientProvider } from 'next-intl';
import { ThemeProvider } from 'src/components/theme-provider';
import { getMessages, unstable_setRequestLocale } from 'next-intl/server';
import 'src/styles/index.css';

const inter = Inter({ subsets: ['latin'] });

export function generateStaticParams() {
    return locales.map(locale => ({ locale }));
}

export default async function LocaleLayout({
    children,
    params: { locale }
}: Readonly<{
    children: React.ReactNode;
    params: { locale: Locale };
}>) {
    unstable_setRequestLocale(locale);
    const messages = await getMessages();

    return (
        <html lang={locale} suppressHydrationWarning>
            <body className={inter.className}>
                <NextIntlClientProvider messages={messages}>
                    <ThemeProvider defaultTheme="dark" attribute="class">
                        <div className="flex min-h-screen flex-col">
                            <Header />
                            <main className="relative flex-auto">{children}</main>
                            <Footer />
                        </div>
                    </ThemeProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
