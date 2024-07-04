'use client';

import { locales } from 'src/config';
import { useTransition } from 'react';
import { useLocale } from 'next-intl';
import { Languages } from 'lucide-react';
import { Button } from 'src/components/ui';
import { useRouter, usePathname } from 'src/navigation';

export default function LocaleToggle() {
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

    return (
        <Button variant="ghost" size="icon" disabled={isPending} onClick={onClick}>
            <Languages className="h-5 w-5" />
            <span className="sr-only">Locale toggle</span>
        </Button>
    );
}
