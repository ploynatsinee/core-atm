import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { AuthServices } from './auth.services';
import { Auth, AuthSchema } from './auth.schema';

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
  controllers: [AuthController],
  providers: [AuthServices],
  exports: [AuthServices]
})
export class AuthModule { }
