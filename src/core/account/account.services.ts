import { Injectable, NotAcceptableException, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Account } from "./account.schema";
import * as mongoose from "mongoose";
import { AccountCreateDto } from "./account.dto";
import { Profile } from "../profile/profile.schema";


@Injectable()
export class AccountService {
  constructor(
    @InjectModel(Account.name) protected model: mongoose.Model<Account>,
    @InjectModel(Profile.name) protected profileModel: mongoose.Model<Profile>,
  ) { }

  private async findOwner(data: string[]): Promise<any> {
    try {
      const owners = await this.profileModel.find({ _id: { $in: data } }).exec()
      if (owners.length !== data.length) throw new NotAcceptableException();
      return owners
    } catch (error) {
      throw new NotAcceptableException();
    }
  }

  private validateAccountResult(result: Account): void {
    if (!result) {
      throw new NotFoundException('Account not found');
    }
  }

  public async createAccount(data: AccountCreateDto): Promise<Account> {

    const owners = await this.findOwner(data.owners);

    const account = new this.model({
      account_number: data.account_number,
      account_type: data.account_type,
      total_balance: data.total_balance || 0,
      available_balance: data.total_balance || 0,
      owners: owners.map((owner: any) => owner._id),
      created_at: new Date(),
      isDisabled: false,
    });

    return await account.save();
  }

  public async getAccountByAccountNumber(account_number: object): Promise<Account> {
    const accountVal = Object.values(account_number)[0] as string;
    const result = await this.model.findOne({ account_number: accountVal }).exec();
    this.validateAccountResult(result);
    return result;
  }

}
