'use client';

import { useTheme } from 'next-themes';

const REPO_NAME = 'iwillzhou/blog';

export function Comment() {
    const { theme } = useTheme();
    const utterancesTheme = theme === 'light' ? 'github-light' : 'photon-dark';
    return (
        <section
            style={{ width: '100%' }}
            ref={element => {
                if (!element) {
                    return;
                }
                const scriptElement = document.createElement('script');
                scriptElement.setAttribute('src', 'https://utteranc.es/client.js');
                scriptElement.setAttribute('repo', REPO_NAME);
                scriptElement.setAttribute('issue-term', 'pathname');
                scriptElement.setAttribute('theme', utterancesTheme);
                scriptElement.setAttribute('crossorigin', 'anonymous');
                scriptElement.setAttribute('async', 'true');
                element.replaceChildren(scriptElement);
            }}
        />
    );
}
