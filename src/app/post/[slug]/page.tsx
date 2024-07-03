import Link from 'next/link';
import { Calendar, Eye, Tag } from 'lucide-react';
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
    const { id: pageId, title, publishTime, tags } = posts.find(i => i.slug === params.slug) || {};
    const recordMap = pageId && (await getPageContent(pageId));

    if (!pageId) {
        return null;
    }

    return (
        <article>
            <h1 className="notion-page !my-8 text-4xl">{title}</h1>
            <div className="notion-page !mb-8 text-sm opacity-70">
                <div className="flex items-center gap-4">
                    <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4" />
                        {publishTime}
                    </div>
                    <div className="flex items-center">
                        <Eye className="mr-2 h-4 w-4" />
                        1111
                    </div>
                </div>
                <div className="mt-2 flex items-center">
                    <Tag className="mr-2 h-4 w-4 flex-auto" />
                    <div className="flex flex-wrap items-baseline gap-4">
                        {tags.map((tag: string) => (
                            <Link key={tag} href={`/tags/${tag}`}>
                                # {tag}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            <NotionRenderer recordMap={recordMap} />
        </article>
    );
}
