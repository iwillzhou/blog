import { Link } from 'src/navigation';
import { getPosts } from 'src/utils/notion';
import { name, type Locale } from 'src/config';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }) {
    const t = await getTranslations({ locale, namespace: 'header' });
    return {
        title: `${t('post')} - ${name}`
    };
}

export default async function Post({ params: { locale } }: { params: { locale: Locale } }) {
    const { results: posts } = await getPosts({ locale });
    return (
        <div>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>
                        <Link href={`/post/${post.slug}`}>
                            {post.publishTime} | {post.title} | {post.tags.join()}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
