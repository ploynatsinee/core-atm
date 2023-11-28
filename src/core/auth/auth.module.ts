import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { AuthServices } from './auth.services';
import { Profile, ProfileSchema } from '../profile/profile.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: `${Profile.name}`,
        useFactory: () => {
          return ProfileSchema
        }
      }
    ]),

  ],
  controllers: [AuthController],
  providers: [
    AuthServices,
  ],
  exports: [AuthServices]
})
export class AuthModule { }
