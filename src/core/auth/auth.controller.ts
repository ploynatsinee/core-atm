import { Body, Controller, Post } from "@nestjs/common";
import { AuthServices } from "./auth.services";
import { Public } from "../guards/pubilc.guards";
import { AuthLoginDto, AuthRegisterDto } from "./auth.dto";

@Controller('auth')
export class AuthController {
  constructor(protected service: AuthServices) { }

  @Public()
  @Post('register')
  async register(@Body() data: AuthRegisterDto) {
    return await this.service.register(data)
  }

  @Public()
  @Post('login')
  async login(@Body() data: AuthLoginDto) {
    return await this.service.login(data)
  }

}