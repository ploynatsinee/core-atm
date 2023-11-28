import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './core/auth/auth.module';
import { ProfileModule } from './core/profile/profile.module';
import { Guards } from './core/guards/guards.services';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/atm'),
    AuthModule,
    ProfileModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: "Guards",
      useClass: Guards,
    },
    JwtService
  ],
})
export class AppModule { }
