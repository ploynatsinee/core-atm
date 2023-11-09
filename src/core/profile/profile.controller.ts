import { Controller, Get, Headers } from "@nestjs/common";
import { ProfileServices } from "./profile.services";

@Controller('profile')
export class ProfileController {
  constructor(protected service: ProfileServices) { }

  @Get('me')
  async getProfile(@Headers() headers: any) {
    return await this.service.getProfile(headers.authorization)
  }

}