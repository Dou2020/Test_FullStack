import { ObjectId } from "mongoose";

export class Comment {
    _id: ObjectId;
    postId: ObjectId;
    name: string;
    email: string;
    body: string;
    createdAt: Date;
}
