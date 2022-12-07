import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { JwtStrategy } from './strategy/jwt.strategy';
import { WsJwtStrategy } from './strategy/ws-jwt.strategy';

@Module({
  providers: [AuthService, JwtStrategy, WsJwtStrategy],
  controllers: [AuthController],
  imports: [
    JwtModule.register({}),
    UserModule,
  ]
})
export class AuthModule { }
