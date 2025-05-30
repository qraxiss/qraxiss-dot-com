/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LogResponseDto } from '../models/LogResponseDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class LogsService {
    /**
     * @param lines Number of error log lines to retrieve
     * @returns LogResponseDto
     * @throws ApiError
     */
    public static logsControllerGetErrorLogs(
        lines: number,
    ): CancelablePromise<LogResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/logs/error/{lines}',
            path: {
                'lines': lines,
            },
        });
    }
    /**
     * @param lines Number of error log lines to retrieve
     * @returns LogResponseDto
     * @throws ApiError
     */
    public static logsControllerTestErrorLogs(
        lines: number,
    ): CancelablePromise<LogResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/logs/test-error-logs/{lines}',
            path: {
                'lines': lines,
            },
        });
    }
    /**
     * @param lines Number of output log lines to retrieve
     * @returns LogResponseDto
     * @throws ApiError
     */
    public static logsControllerGetOutputLogs(
        lines: number,
    ): CancelablePromise<LogResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/logs/output/{lines}',
            path: {
                'lines': lines,
            },
        });
    }
}
