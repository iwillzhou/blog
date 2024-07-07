import { getAllPosts } from 'src/utils/notion';
import { name, type Locale } from 'src/config';
import { getTranslations } from 'next-intl/server';
import { Link } from 'src/navigation';

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }) {
    const t = await getTranslations({ locale, namespace: 'header' });
    return {
        title: `${t('tag')} - ${name}`
    };
}

const Tag = async ({ params: { locale } }: { params: { locale: Locale } }) => {
    const { tagCountMap } = await getAllPosts({ locale });
    const t = await getTranslations({ locale, namespace: 'header' });
    return (
        <div className="mx-auto max-w-screen-md p-4 md:mt-8">
            <div className="my-8 text-xl">{t('tag')}</div>
            <ul className="mt-4 flex max-w-full flex-wrap gap-3 overflow-x-auto">
                {[...tagCountMap.entries()].map(([key, value]) => {
                    return (
                        <li key={key} className="whitespace-nowrap bg-secondary font-medium">
                            <Link key={key} className="block px-4 py-2" href={`/tag/${encodeURIComponent(key)}`}>
                                {`${key} (${value})`}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Tag;
