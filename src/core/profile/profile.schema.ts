import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


@Schema()
export class Profile extends Document {
  @Prop({ required: true })
  first_name: string;

  @Prop({ required: true })
  last_name: string;

  @Prop({ required: true, is_unique: true })
  user_name: string;

  @Prop({ required: false, password: true })
  password: string;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile)