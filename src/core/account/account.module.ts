import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Account, AccountSchema } from "./account.schema";
import { AccountController } from "./account.controller";
import { AccountService } from "./account.services";
import { Profile, ProfileSchema } from "../profile/profile.schema";

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: `${Account.name}`,
        useFactory: () => AccountSchema
      },
      {
        name: Profile.name,
        useFactory: () => ProfileSchema
      },
    ]),
  ],
  controllers: [AccountController],
  providers: [AccountService],
  exports: [AccountService]
})

export class AccountModule { }