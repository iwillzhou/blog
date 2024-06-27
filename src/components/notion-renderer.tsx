'use client';

import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';
import { NotionRenderer } from 'react-notion-x';
import type { ExtendedRecordMap } from 'notion-types';
import { useEffect, useState } from 'react';

export default function CustomNotionRenderer({ recordMap }: { recordMap: ExtendedRecordMap }) {
    const { resolvedTheme } = useTheme();
    const [darkMode, setDarkMode] = useState<boolean>();
    const Code = dynamic(() => import('react-notion-x/build/third-party/code').then(m => m.Code), { ssr: false });

    useEffect(() => {
        setDarkMode(resolvedTheme === 'dark');
    }, [resolvedTheme]);

    return (
        <NotionRenderer
            recordMap={recordMap}
            darkMode={darkMode}
            fullPage={false}
            components={{
                Code
            }}
        />
    );
}
