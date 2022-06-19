import { Body, ClassSerializerInterceptor, Controller, HttpStatus, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from 'src/decorators/user.decorator';
import { ErrorResponseException } from 'src/utils/ErrorResponse';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/LoginDto';
import { LoginResponseDto } from './dto/LoginResponseDto';
import { ProfileDto } from './dto/ProfileDto';
import { RegisterDto } from './dto/RegisterDto';
import { RegisterResponseDto } from './dto/RegisterResponseDto';
import { IJWTPayload } from './interfaces/IJWTPayload';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
@ApiTags('Auth')
@ApiBearerAuth('access-token')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post('/me')
    @UseGuards(JwtAuthGuard)
    async profile(@User() tokenModel: IJWTPayload) {
        const user = await this.authService.findUserByUserName(tokenModel.userName)
        if (!user)
            throw new ErrorResponseException(HttpStatus.UNAUTHORIZED, 'token.is.not.valid', 'Invalid Token')
        return new ProfileDto(user);
    }

    @Post('/register')
    @UseInterceptors(ClassSerializerInterceptor)
    async register(
        @Body() body: RegisterDto
    ) {
        const user = await this.authService.createUser(body)
        return new RegisterResponseDto(user);
    }

    @Post('/login')
    @UseInterceptors(ClassSerializerInterceptor)
    async login(@Body() body: LoginDto) {
        const { token, user } = await this.authService.login(body);
        return new LoginResponseDto({ user: new ProfileDto(user), token })
    }

}
