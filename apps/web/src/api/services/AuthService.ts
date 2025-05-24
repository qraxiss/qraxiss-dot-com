/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { IsUserLoggedResponseDto } from '../models/IsUserLoggedResponseDto';
import type { LoginResponseDto } from '../models/LoginResponseDto';
import type { UserDto } from '../models/UserDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AuthService {
    /**
     * @param requestBody
     * @returns LoginResponseDto
     * @throws ApiError
     */
    public static authControllerLogin(
        requestBody: UserDto,
    ): CancelablePromise<LoginResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/login',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns IsUserLoggedResponseDto
     * @throws ApiError
     */
    public static authController(): CancelablePromise<IsUserLoggedResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/auth/check',
        });
    }
}
