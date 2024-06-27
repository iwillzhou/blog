import NotionRenderer from 'src/components/notion-renderer';
import { getPosts, getPageContent } from 'src/utils/notion';

export async function generateStaticParams() {
    const { results: posts } = await getPosts();
    return posts.map(post => ({
        slug: post.slug
    }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
    const { results: posts } = await getPosts();
    const title = posts.find(i => i.slug === params.slug)?.title;
    return {
        title: `${title} | Blog`
    };
}

export default async function Post({ params }: { params: { slug: string } }) {
    const { results: posts } = await getPosts();
    const { id: pageId, title } = posts.find(i => i.slug === params.slug) || {};
    const recordMap = pageId && (await getPageContent(pageId));

    if (!pageId) {
        return null;
    }

    return (
        <div>
            <div>{title}</div>
            <div>发布时间、字数、预估时间、pv</div>
            <NotionRenderer recordMap={recordMap} />
        </div>
    );
}
