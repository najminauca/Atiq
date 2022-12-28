import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./user.entity";
import {JwtModule} from "@nestjs/jwt";
import {PassportModule} from "@nestjs/passport";

@Module({
  imports: [TypeOrmModule.forFeature([User]),
            JwtModule.register({
              secret: 'bestSecret',
              signOptions: {
                expiresIn: 3000,
              }
            }),
            PassportModule.register({ defaultStrategy: 'jwt'})  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
