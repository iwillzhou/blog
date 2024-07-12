import { name, type Locale } from 'src/config';
import { getPages, getPageContent } from 'src/api/notion';
import NotionRenderer from 'src/components/notion-renderer';

export async function generateStaticParams({ params: { locale } }: { params: { locale: Locale } }) {
    const pages = await getPages({ locale });
    return pages.map(page => ({
        slug: page.slug
    }));
}

export async function generateMetadata({ params: { slug, locale } }: { params: { slug: string; locale: Locale } }) {
    const pages = await getPages({ locale });
    const title = pages.find(i => i.slug === slug)?.title;
    return {
        title: `${title} - ${name}`
    };
}

export default async function Post({ params: { slug, locale } }: { params: { slug: string; locale: Locale } }) {
    const pages = await getPages({ locale });
    const { id: pageId } = pages.find(i => i.slug === slug) || {};
    const recordMap = pageId && (await getPageContent(pageId));

    if (!pageId) {
        return null;
    }

    return <NotionRenderer recordMap={recordMap} />;
}
