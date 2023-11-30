import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";
import mongoose from "mongoose";
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { Profile } from "../profile/profile.schema";
import { jwtConstants } from "../guards/auth_guards/auth_guards.constants";

@Injectable()
export class AuthServices extends Profile {
  constructor(
    @InjectModel(Profile.name)
    protected model: mongoose.Model<Profile>
  ) {
    super()
  }

  private async findOne(query: any): Promise<Profile> {
    return await this.model.findOne(query)
  }

  private async generateToken(user: any): Promise<string> {
    const token = jwt.sign({ data: user.user_name }, jwtConstants.secret, { expiresIn: '12h' });
    return token;
  }

  private async encryptPassword(password: string): Promise<string> {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }

  private async comparePassword(password: string, hash: string): Promise<boolean> {
    const match = await bcrypt.compare(password, hash);
    return match;
  }

  public async register(data: any): Promise<Profile> {

    const { user_name } = data
    const user = await this.findOne({ user_name }) || null
    if (user) {
      throw new Error('User already exists')
    }
    if (data.password) {
      data.password = await this.encryptPassword(data.password)
    }
    return await this.model.create(data)
  }

  public async login(data: any): Promise<object> {
    const { user_name, password } = data
    const user = await this.findOne({ user_name })
    if (!user) {
      throw new Error('User not found')
    }
    const isValidPassword = await this.comparePassword(password, user.password)
    if (!isValidPassword) {
      throw new Error('Password is incorrect')
    }
    const token = await this.generateToken(user);

    return { user, token };
  }

}