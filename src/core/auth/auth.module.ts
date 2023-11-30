import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { AuthServices } from './auth.services';
import { Profile, ProfileSchema } from '../profile/profile.schema';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../guards/auth_guards/auth_guards.constants';

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
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '12h' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthServices
  ],
  exports: [AuthServices]
})
export class AuthModule { }
