export type ConstantsType = {
    NODE_ENV: 'development' | 'production';

    DATABASE: {
        PORT: number;
        HOST: string;
        USERNAME: string;
        PASSWORD: string;
        NAME: string;
    };

    APP: {
        PORT: number;
        HOST: string;
        PATH: string;
        PROTOCOL: string;
    };

    ADMIN_KEY: string;
    JWT_KEY: string;

    USERS: UserType[];
};

export interface UserType {
    email: string;
    password: string;
}
