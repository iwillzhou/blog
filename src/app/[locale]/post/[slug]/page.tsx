import { Link } from 'src/navigation';
import { name, type Locale } from 'src/config';
import { Calendar, Eye, Tag } from 'lucide-react';
import NotionRenderer from 'src/components/notion-renderer';
import { getAllPosts, getPageContent } from 'src/utils/notion';

export async function generateStaticParams({ params: { locale } }: { params: { locale: Locale } }) {
    const { allResults } = await getAllPosts({ locale });
    return allResults.map(post => ({
        slug: post.slug
    }));
}

export async function generateMetadata({ params: { slug, locale } }: { params: { slug: string; locale: Locale } }) {
    const { allResults } = await getAllPosts({ locale });
    const title = allResults.find(i => i.slug === slug)?.title;
    return {
        title: `${title} - ${name}`
    };
}

export default async function Post({ params: { slug, locale } }: { params: { slug: string; locale: Locale } }) {
    const { allResults } = await getAllPosts({ locale });
    const { id: pageId, title, publishTime, tags } = allResults.find(i => i.slug === slug) || {};
    const recordMap = pageId && (await getPageContent(pageId));

    if (!pageId) {
        return null;
    }

    return (
        <article>
            <h1 className="notion-page !my-8 text-3xl">{title}</h1>
            <div className="notion-page text-sm opacity-70">
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
                            <Link key={tag} href={`/tag/${tag}`}>
                                # {tag}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            <NotionRenderer isBlogPost recordMap={recordMap} />
        </article>
    );
}
