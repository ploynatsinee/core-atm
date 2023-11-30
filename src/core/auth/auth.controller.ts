import { Body, Controller, Post } from "@nestjs/common";
import { AuthServices } from "./auth.services";
import { Public } from "../guards/pubilc.guards";
import { AuthRegisterDto } from "./auth.dto";

@Controller('auth')
export class AuthController {
  constructor(protected service: AuthServices) { }

  @Public()
  @Post('register')
  async register(@Body() AuthRegisterDto: AuthRegisterDto) {
    return await this.service.register(AuthRegisterDto)
  }

  @Public()
  @Post('login')
  async login(@Body() data: any) {
    return await this.service.login(data)
  }

}