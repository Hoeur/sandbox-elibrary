export interface Document {
    id: number;
    type: string;
    name: string;
    comment: string;
    keywords: string;
    ownerid: number;
    islocked: boolean;
    expires: string;
    version: number;
    size: any;
    docx_size: any;
    date: any;
    content: any | null;
    categories: any;
    views: number | null,
    downloads: number | null,
    heading: any;
    css: any;
    text: string;
    words: string;
    attributes: any[]
};

export interface Post {
    id: number | string;
    body: string;
    category: any;
    order: number;
    title: string;
    createdAt: Date | string;
    updatedAt: Date | string;
};

export interface SourceItem {
    metadata: {
        limit: number | string;
        page: number | string;
        total: number | string;
    };
    posts: Post[]
};

export interface Categories {
    id: number;
    name: string;
    order: number;
    status: number;
};

export interface MetaData {
    limit: number,
    page: number,
    total: number,
}

export interface About {
    content: string,
    id: number,
    createdAt:any,
    updatedAt:any
}
