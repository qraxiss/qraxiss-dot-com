//@ts-expect-error LocalError extends Error with custom properties
export class LocalError extends Error {
    constructor(public message?: string) {
        super();
        this.name = this.constructor.name;
        ErrorRegistry.register(
            this.constructor as new (...args: any[]) => LocalError
        );
    }
}

export class NotFoundError extends LocalError {
    constructor(message?: string) {
        super(message);
    }
}

export class WrongPassword extends LocalError {
    constructor(message?: string) {
        super(message);
    }
}

export class TestError extends LocalError {
    constructor(message?: string) {
        super(message);
    }
}

export class ErrorRegistry {
    private static errorTypes: ErrorEnumType = {};

    static register(errorClass: new (...args: any[]) => LocalError) {
        const name = errorClass.name;
        this.errorTypes[name] = name;
    }

    static getEnum(): ErrorEnumType {
        return this.errorTypes;
    }
}

export type ErrorEnumType = { [key: string]: string };

export const ErrorEnum = ErrorRegistry.getEnum();
