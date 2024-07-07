'use client';

import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { NotionRenderer } from 'react-notion-x';
import type { ExtendedRecordMap } from 'notion-types';

export default function CustomNotionRenderer({
    recordMap,
    isBlogPost
}: {
    recordMap: ExtendedRecordMap;
    isBlogPost?: boolean;
}) {
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
            fullPage={!!isBlogPost}
            previewImages={!!recordMap.preview_images}
            showCollectionViewDropdown={false}
            showTableOfContents={!!isBlogPost}
            disableHeader={true}
            components={{
                Code
            }}
        />
    );
}
