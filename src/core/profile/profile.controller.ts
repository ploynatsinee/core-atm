import { Controller, Get, Request, UseInterceptors } from "@nestjs/common";
import { ExcludePasswordInterceptor, ProfileServices } from "./profile.services";

@Controller('profile')
export class ProfileController {
  constructor(protected service: ProfileServices) { }

  @Get('me')
  @UseInterceptors(ExcludePasswordInterceptor)
  async getProfile(@Request() req) {
    return await this.service.getProfile(req.headers.authorization)
  }

}