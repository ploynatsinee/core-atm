import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileController } from './profile.controller';
import { ProfileServices } from './profile.services';
import { Auth, AuthSchema } from '../auth/auth.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: `${Auth.name}`,
        useFactory: () => {
          return AuthSchema
        }
      }
    ]),

  ],
  controllers: [ProfileController],
  providers: [ProfileServices],
  exports: [ProfileServices]
})
export class ProfileModule { }
