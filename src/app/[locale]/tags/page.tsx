import { getAllTags } from 'src/utils/notion';
import { name, type Locale } from 'src/config';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }) {
    const t = await getTranslations({ locale, namespace: 'header' });
    return {
        title: `${t('tags')} - ${name}`
    };
}

const Tags = async ({ params: { locale } }: { params: { locale: Locale } }) => {
    const tagCount = await getAllTags({ locale });
    return (
        <div>
            <div>Tags</div>
            <div>{tagCount}</div>
        </div>
    );
};

export default Tags;
