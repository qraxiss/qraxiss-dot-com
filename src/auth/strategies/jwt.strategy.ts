import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConstantService } from 'src/constant/constant.service';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private constantService: ConstantService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: constantService.CONSTANTS.JWT_KEY,
        });
    }

    async validate(payload: any) {
        return {
            id: payload.sub,
            email: payload.email,
            isAdmin: payload.isAdmin,
        };
    }
}
