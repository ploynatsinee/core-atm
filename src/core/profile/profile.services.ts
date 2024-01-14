import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { Profile } from "./profile.schema";
import { map, Observable } from "rxjs";

@Injectable()
export class ExcludePasswordInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data: mongoose.Document<any>) => {
        if (!data) return;
        const { password, ...result } = data.toJSON();
        return result;
      }),
    );
  }
}


@Injectable()
export class ProfileServices {
  constructor(
    @InjectModel(Profile.name)
    protected model: mongoose.Model<Profile>
  ) { }

  private async findOne(query: any): Promise<Profile> {
    return await this.model.findOne(query).exec()
  }

  public async getProfile(profile: any): Promise<Profile> {
    try {
      const user = await this.findOne({ user_name: profile.username, _id: profile.sub })

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