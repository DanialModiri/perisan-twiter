import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IJWTPayload } from '../interfaces/IJWTPayload';

@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy) {
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: process.env.SECRETKEY,
        });
    }

    async validate(payload: IJWTPayload): Promise<any> {
        return payload;
    }
}
