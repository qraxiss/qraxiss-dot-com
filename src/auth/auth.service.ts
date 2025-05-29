import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConstantService } from 'src/constant/constant.service';
import { LoginDto } from './auth.dto';
import { UserType } from 'src/constant/constant.type';
import { NotFoundError, WrongPassword } from 'src/status/errors';
@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private constantsService: ConstantService
    ) {}

    async validateUser(email: string, pass: string): Promise<any> {
        const user = this.constantsService.CONSTANTS.USERS.find(
            (user) => user.email === email
        );

        if (!user) {
            throw new NotFoundError(`${email} is not found!`);
        }

        if (user.password !== pass) {
            throw new WrongPassword();
        }

        return user;
    }

    async login(user: UserType): Promise<LoginDto> {
        await this.validateUser(user.email, user.password);

        const payload = { email: user.email, sub: user.email };
        return {
            access_token: this.jwtService.sign(payload, {
                secret: this.constantsService.CONSTANTS.JWT_KEY,
            }),
        };
    }
}
