import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileController } from './profile.controller';
import { ProfileServices } from './profile.services';
import { Profile, ProfileSchema } from './profile.schema';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../guards/guards.constants';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
    }),
    MongooseModule.forFeatureAsync([
      {
        name: `${Profile.name}`,
        useFactory: () => {
          return ProfileSchema
        }
      }
    ]),
  ],
  controllers: [ProfileController],
  providers: [ProfileServices],
  exports: [ProfileServices]
})
export class ProfileModule { }
