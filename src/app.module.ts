import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './core/auth/auth.module';
import { ProfileModule } from './core/profile/profile.module';
import { JwtService } from '@nestjs/jwt';
import { AccountModule } from './core/account/account.module';
// import { ATMModule } from './core/atm/atm.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/atm'),
    AuthModule,
    ProfileModule,
    AccountModule,
    // ATMModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    JwtService,
  ],
})
export class AppModule { }
