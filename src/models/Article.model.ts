import { ObjectId } from "mongodb";

export interface Article {
    _id: ObjectId | string;
    title: string;
    content: string;
    coverImageUrl: string;
    authorId: string;
    createdAt: string;
    views?: number;
    likes?: string[];
    tags?: string[];
}

export interface ArticleCreate {
  authorId: string;
  createdAt: string;
  title: string;
  content: string;
  coverImageUrl: string;
  views: number;
  likes: string[];
  tags: string[];
}