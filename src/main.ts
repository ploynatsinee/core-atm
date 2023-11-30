import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthGuards } from './core/guards/auth_guards/auth_guards.services';
import { JwtService } from '@nestjs/jwt';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const auth = app.get(JwtService);
  const reflector = app.get(Reflector);

  app.useGlobalGuards(new AuthGuards(auth, reflector));
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(7001);
}
bootstrap();
