import NotionRenderer from 'src/components/notion-renderer';
import { getPages, getPageContent } from 'src/utils/notion';

export async function generateStaticParams() {
    const pages = await getPages();
    return pages.map(page => ({
        slug: page.slug
    }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
    const pages = await getPages();
    const title = pages.find(i => i.slug === params.slug)?.title;
    return {
        title
    };
}

export default async function Post({ params }: { params: { slug: string } }) {
    const pages = await getPages();
    const { id: pageId } = pages.find(i => i.slug === params.slug) || {};
    const recordMap = pageId && (await getPageContent(pageId));

    if (!pageId) {
        return null;
    }

    return <NotionRenderer recordMap={recordMap} />;
}
