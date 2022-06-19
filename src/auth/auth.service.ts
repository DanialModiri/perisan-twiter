import { HttpStatus, Injectable } from '@nestjs/common';
import { ErrorResponseException } from 'src/utils/ErrorResponse';
import { hash, compare } from 'bcrypt'
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from './dto/RegisterDto';
import { LoginDto } from './dto/LoginDto';
import { JwtService } from '@nestjs/jwt';
import { IJWTPayload } from './interfaces/IJWTPayload';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {

    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) { }

    async createUser(register: RegisterDto) {
        const password = await hash(register.password, 10);
        const user = await this.prisma.user.create({
            data: {
                bio: register.bio,
                firstName: register.firstName,
                lastName: register.lastName,
                password: password,
                userName: register.userName,
            }
        })
        return user;
    }

    async validateUser(login: LoginDto) {

        // find user
        const user = await this.prisma.user.findUnique({
            where: {
                userName: login.userName
            }
        })

        // check is user exist
        if (!user) {
            throw new ErrorResponseException(HttpStatus.UNAUTHORIZED, 'email.or.password.is.incorrect', 'email or password is incorrect');
        }

        // check password
        const isPasswordMatch = await compare(login.password, user.password)
        if (isPasswordMatch === false) {
            throw new ErrorResponseException(HttpStatus.UNAUTHORIZED, 'email.or.password.is.incorrect', 'email or password is incorrect');
        }

        return user;
    }

    async login(login: LoginDto) {
        const user = await this.validateUser(login);
        const token = this.generateToken(user);
        return {
            user,
            token
        }
    }

    async findUserByUserName(userName: string) {
        return this.prisma.user.findUnique({
            where: {
                userName
            }
        })
    }

    generateToken(user: User) {
        return this.jwtService.sign({
            userName: user.userName,
            firstName: user.firstName,
            lastName: user.lastName
        } as IJWTPayload)
    }
}
