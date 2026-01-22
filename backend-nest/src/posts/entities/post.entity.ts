import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Post extends Document {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    body: string;

    @Prop({ required: true })
    author: string;

    @Prop({ type: [String], default: [] })
    tags: string[];

    @Prop({ default: null })
    imageUrl: string;

    @Prop({ default: false })
    published: boolean;

    @Prop()
    createdAt: Date;

    @Prop()
    updatedAt: Date;
    
    @Prop()
    deleteAt: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);
