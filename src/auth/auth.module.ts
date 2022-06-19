import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtStrategyService } from './jwt-strategy/jwt-strategy.service';

@Module({
    imports: [
        PrismaModule,
        PassportModule.register({
            property: 'user',
            defaultStrategy: 'jwt',
            session: false,
        }),
        JwtModule.register({
            secret: process.env.SECRETKEY,
            signOptions: {
                expiresIn: process.env.EXPIRESIN
            }
        }),
    ],
    providers: [AuthService, JwtAuthGuard, JwtStrategyService],
    controllers: [AuthController]
})
export class AuthModule { }
