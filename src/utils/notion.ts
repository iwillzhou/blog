import { NotionCompatAPI } from 'notion-compat';
import { Client, isFullPage } from '@notionhq/client';
import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

const notion = new Client({ auth: process.env.NOTION_AUTH_TOKEN });
const notionAPI = new NotionCompatAPI(notion);

type Properties = Extract<PageObjectResponse, { properties: unknown }>['properties'];

export function getNestedProperties(properties: Properties) {
    const props: Record<string, any> = {};
    for (const key in properties) {
        const property = properties[key];
        if ('title' in property) {
            props[key] = property.title.map(i => i.plain_text).join();
        } else if ('rich_text' in property) {
            props[key] = property.rich_text.map(i => i.plain_text).join();
        } else if ('number' in property) {
            // tood
        } else if ('select' in property) {
            props[key] = property.select?.name;
        } else if ('multi_select' in property) {
            props[key] = property.multi_select.map(i => i.name);
        } else if ('date' in property) {
            props[key] = property.date?.start;
        } else if ('checkbox' in property) {
            // tood
        } else if ('status' in property) {
            const status = property['status'] as { name: string };
            if (status) {
                props[key] = status.name;
            }
        } else {
            console.log('Unknown property', key, JSON.stringify(property));
        }
    }
    return props;
}

export async function getPageContent(pageId: string) {
    return await notionAPI.getPage(pageId);
}

type GetPostsParam = {
    startCursor?: string;
    pageSize?: number;
    tag?: string;
};

export async function getPosts(params?: GetPostsParam) {
    const { startCursor, pageSize, tag } = params ?? {};
    const { results, has_more, next_cursor } = await notion.databases.query({
        database_id: process.env.NOTION_DB_ID!,
        filter: {
            and: [
                {
                    property: 'type',
                    select: { equals: 'Post' }
                },
                {
                    property: 'status',
                    select: { equals: 'Published' }
                },
                ...(tag
                    ? [
                          {
                              property: 'tags',
                              multi_select: { contains: tag }
                          }
                      ]
                    : [])
            ]
        },
        sorts: [
            {
                property: 'publishTime',
                direction: 'descending'
            }
        ],
        start_cursor: startCursor,
        page_size: pageSize
    });
    return {
        results: results.filter(isFullPage).map(i => {
            const { title, slug, publishTime, tags } = getNestedProperties(i.properties);
            return {
                id: i.id,
                title,
                slug,
                publishTime,
                tags
            };
        }),
        has_more,
        next_cursor
    };
}

export async function getAllTags(tag?: string) {
    let hasMore = true;
    let startCursor: string | undefined = undefined;
    let allResults = [];
    while (hasMore) {
        const res = await getPosts({ tag, startCursor });
        hasMore = res.has_more;
        startCursor = res.next_cursor || undefined;
        allResults.push(...res.results);
    }
    const tagCountMap = allResults
        .map(i => i.tags)
        .flat()
        .reduce((prev, curr) => {
            const count = prev.get(curr) ?? 0;
            prev.set(curr, count + 1);
            return prev;
        }, new Map());

    return tagCountMap;
}

export async function getPages() {
    const { results } = await notion.databases.query({
        database_id: process.env.NOTION_DB_ID!,
        filter: {
            and: [
                {
                    property: 'type',
                    select: { equals: 'Page' }
                },
                {
                    property: 'status',
                    select: { equals: 'Published' }
                }
            ]
        },
        sorts: [
            {
                property: 'publishTime',
                direction: 'descending'
            }
        ]
    });

    return results.filter(isFullPage).map(i => {
        const { title, slug } = getNestedProperties(i.properties);
        return {
            id: i.id,
            title,
            slug
        };
    });
}
