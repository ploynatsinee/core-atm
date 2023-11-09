import { Body, Controller, Post } from "@nestjs/common";
import { AuthServices } from "./auth.services";

@Controller('auth')
export class AuthController {
  constructor(protected service: AuthServices) { }

  @Post('register')
  async register(@Body() data: any) {
    return await this.service.register(data)
  }

  @Post('login')
  async login(@Body() data: any) {
    return await this.service.login(data)
  }

}