import { Prop } from "@nestjs/mongoose";
import type { ObjectId } from "mongoose";

export class Comment {
    _id: ObjectId;

    @Prop()
    postId: ObjectId;

    @Prop()
    name: string;

    @Prop()
    email: string;

    @Prop()
    body: string;

    @Prop()
    createdAt: Date;
}
