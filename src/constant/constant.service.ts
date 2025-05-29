import { Injectable } from '@nestjs/common';
import { ConstantsType } from './constant.type';

@Injectable()
export class ConstantService {
    public readonly CONSTANTS: ConstantsType;

    constructor() {
        this.CONSTANTS = {
            NODE_ENV: 'development',

            DATABASE: {
                PORT: 3306,
                HOST: '127.0.0.1',
                USERNAME: 'admin',
                PASSWORD: 'admin123',
                NAME: 'sample-database',
            },

            APP: {
                PORT: 3000,
                HOST: 'localhost',
                PATH: '',
                PROTOCOL: 'http',
            },

            ADMIN_KEY: 'HIGHSECURIRTYADMINKEY',
            JWT_KEY: 'HIGHSECURIRTYJWTKEY',
            USERS: [
                {
                    email: 'user@mail.com',
                    password: 'password123!',
                },
            ],
        };
    }

    get isDevelopment(): boolean {
        return this.CONSTANTS.NODE_ENV !== 'production';
    }

    get isProduction(): boolean {
        return !this.isDevelopment;
    }

    get appUrl(): string {
        const path = `${this.CONSTANTS.APP.PATH ? `/${this.CONSTANTS.APP.PATH}` : ''}`;

        if (this.isDevelopment) {
            return `${this.CONSTANTS.APP.PROTOCOL}://${this.CONSTANTS.APP.HOST}:${this.CONSTANTS.APP.PORT}${path}`;
        } else {
            return `${this.CONSTANTS.APP.PROTOCOL}://${this.CONSTANTS.APP.HOST}${path}`;
        }
    }
}
