import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Comment extends Document {
    @Prop({ type: Types.ObjectId, required: true, ref: 'Post' })
    postId: Types.ObjectId;

    @Prop({ required: true, minlength: 2, maxlength: 100 })
    name: string;

    @Prop({ required: true, lowercase: true })
    email: string;

    @Prop({ required: true, minlength: 5, maxlength: 1000 })
    body: string;

    @Prop()
    createdAt: Date;

    @Prop()
    updatedAt: Date;

    @Prop()
    deleteAt: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
