'use client';

import { useTransition } from 'react';
import { useLocale } from 'next-intl';
import { Languages } from 'lucide-react';
import { type Locale, locales } from 'src/config';
import { useRouter, usePathname } from 'src/navigation';
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from 'src/components/ui';

export default function LocaleToggle({ className }: { className?: string }) {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();

    const onClick = () => {
        const newLocale = locales.filter(i => i !== locale)[0];
        startTransition(() => {
            router.replace(pathname, { locale: newLocale });
        });
    };

    const onLocaleChange = (locale: Locale) => {
        startTransition(() => {
            router.replace(pathname, { locale });
        });
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className={className}>
                <Button variant="ghost" size="icon" disabled={isPending} onClick={onClick} className={className}>
                    <Languages className="h-5 w-5" />
                    <span className="sr-only">Locale toggle</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onLocaleChange('en')}>English</DropdownMenuItem>
                <DropdownMenuItem onClick={() => onLocaleChange('zh-CN')}>简体中文</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
