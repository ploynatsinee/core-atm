import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Account extends Document {
  @Prop({ required: true })
  account_number: string;

  @Prop()
  total_balance: number;

  @Prop()
  available_balance: number;

  @Prop()
  account_type: string;

  @Prop([{
    type: String,
    ref: 'Profile'
  }])
  owners: string[];

  @Prop()
  created_at: Date;

  @Prop()
  delete_at: Date;

  @Prop()
  isDisabled: boolean;

}

export const AccountSchema = SchemaFactory.createForClass(Account)