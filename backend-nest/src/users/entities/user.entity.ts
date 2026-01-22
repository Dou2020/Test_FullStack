import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true })
export class User extends Document {

    @Prop({ required: true })
    username: string;
    
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    email: string;
    
    @Prop({ required: true })
    password: string;

    @Prop()
    createdAt: Date;
    
    @Prop()
    updatedAt: Date;

    @Prop()
    deleteAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);