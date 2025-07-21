import { ObjectId } from "mongodb";

export interface Article {
    _id?: ObjectId;
    title: string;
    content: string;
    coverImageUrl: string;
    authorId: string;
    createdAt: Date;
    views?: number;
    likes?: number;
    tags?: string[];
}