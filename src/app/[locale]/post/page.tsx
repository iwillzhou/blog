import { getAllPosts } from 'src/api/notion';
import { name, type Locale } from 'src/config';
import { getTranslations } from 'next-intl/server';
import ArticleList from 'src/components/article-list';

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }) {
    const t = await getTranslations({ locale, namespace: 'header' });
    return {
        title: `${t('post')} - ${name}`
    };
}

export const revalidate = 3600; // 1h

export default async function Post({ params: { locale } }: { params: { locale: Locale } }) {
    const { allResults: posts } = await getAllPosts({ locale });
    return (
        <div className="mx-auto max-w-screen-md p-4 md:mt-8">
            <ArticleList posts={posts} />
        </div>
    );
}
