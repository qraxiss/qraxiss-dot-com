import { LocalError } from './errors';

export interface StatusType<T> {
    success: boolean;

    data: T | null | undefined;

    error: LocalError | Error | null | undefined;
}
