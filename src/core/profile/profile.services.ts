import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { verifyToken } from "src/utils/token";
import { Auth } from "../auth/auth.schema";

@Injectable()
export class ProfileServices extends Auth {
  constructor(
    @InjectModel(Auth.name)
    protected model: mongoose.Model<Auth>
  ) {
    super()
  }

  private async findOne(query: any): Promise<Auth> {
    return await this.model.findOne(query).exec()
  }

  public async getProfile(token: string): Promise<Auth> {
    const formatToken = token.split(' ')[1];

    try {
      const decoded = await verifyToken(formatToken);
      const user = await this.findOne({ user_name: decoded.data })

      if (!user) {
        throw new Error('User not found')
      }
      return user;
    } catch (error) {
      console.error(error);
      throw new Error('Invalid token');
    }
  }

}