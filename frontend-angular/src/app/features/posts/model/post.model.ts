export interface Post {
    _id?: string;
    title: string;
    body: string;
    author: string;
    tags: string[];
    imageUrl: string;
    published: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    deleteAt?: Date;
}