import { InjectModel } from "@nestjs/mongoose";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import * as mongoose from "mongoose";
import * as bcrypt from 'bcrypt';
import { Profile } from "../profile/profile.schema";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthServices {
  constructor(
    @InjectModel(Profile.name)
    protected model: mongoose.Model<Profile>,
    private jwtService: JwtService
  ) { }

  private async findOne(query: any): Promise<Profile> {
    return await this.model.findOne(query)
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
    const user = await this.findOne(data.username);
    const isValidPassword = await this.comparePassword(data.password, user.password)

    if (!user || !isValidPassword) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user._id, username: user.user_name };
    const token = await this.jwtService.signAsync(payload);

    return {
      user,
      access_token: token,
    };
  }

}