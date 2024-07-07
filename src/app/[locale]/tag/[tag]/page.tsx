import { name, type Locale } from 'src/config';
import { getAllPosts } from 'src/utils/notion';
import { getTranslations } from 'next-intl/server';
import ArticleList from 'src/components/article-list';

export async function generateStaticParams({ params: { locale } }: { params: { locale: Locale } }) {
    const { tagCountMap } = await getAllPosts({ locale });
    return [...tagCountMap.keys()].map((tag: string) => ({
        tag
    }));
}

export async function generateMetadata({ params: { tag, locale } }: { params: { tag: string; locale: Locale } }) {
    const t = await getTranslations({ locale, namespace: 'header' });
    return {
        title: `${t('tag')}: ${tag} - ${name}`
    };
}

export default async function TagDetail({ params: { tag, locale } }: { params: { tag: string; locale: Locale } }) {
    const { allResults: posts, tagCountMap } = await getAllPosts({ locale, tag });
    const t = await getTranslations({ locale, namespace: 'header' });

    return (
        <div className="mx-auto max-w-screen-md px-4">
            <div className="my-12 text-xl">{`${t('tag')}： ${tag} (${tagCountMap.get(tag)})`}</div>
            <ArticleList posts={posts} />
        </div>
    );
}
