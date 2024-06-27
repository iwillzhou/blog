declare module 'notion-compat' {
    export class NotionCompatAPI {
        constructor(client: any);
        getPage(pageId: string): Promise<any>;
    }
}
