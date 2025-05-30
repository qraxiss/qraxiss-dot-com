import { LocalError } from './errors';
import { StatusType } from './status.type';
import { Logger } from '@nestjs/common';

export async function safeRun<T>(
    promise: Promise<T>,
    resource?: string,
    successMessage?: (result: T) => string
): Promise<StatusType<T>> {
    const startTime = Date.now();
    try {
        const result = await promise;
        const executionTime = Date.now() - startTime;

        if (successMessage) {
            Logger.log(
                `${successMessage(result)} +${executionTime}ms`,
                resource || 'safeRun'
            );
        }
        return {
            success: true,
            data: result,
        } as StatusType<T>;
    } catch (error) {
        const isErrorKnown = error instanceof LocalError;

        if (!isErrorKnown) {
            Logger.error(error, resource || 'safeRun');
            return {
                success: false,
            } as StatusType<T>;
        }

        return {
            success: false,
            error: {
                message: error?.message,
                name: error?.name,
                stack: error?.stack,
            },
        } as StatusType<T>;
    }
}

export function SafeRun<T>(
    resource?: string,
    successMessage?: (result: T) => string
) {
    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ): PropertyDescriptor {
        const originalMethod = descriptor.value;

        descriptor.value = async function (
            ...args: any[]
        ): Promise<StatusType<T>> {
            return await safeRun(
                await originalMethod.apply(this, args),
                resource,
                successMessage
            );
        };

        return descriptor;
    };
}
