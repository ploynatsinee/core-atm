import { Controller, Get, UseInterceptors } from "@nestjs/common";
import { ExcludePasswordInterceptor, ProfileServices } from "./profile.services";
import { User } from "./profile.decorator";


@Controller('profile')
export class ProfileController {
  constructor(protected service: ProfileServices) { }

  @Get('me')
  @UseInterceptors(ExcludePasswordInterceptor)
  async getProfile(@User() user: any) {
    return await this.service.getProfile(user)
  }

}