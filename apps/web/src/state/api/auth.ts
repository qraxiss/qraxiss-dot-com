import { createApi } from '@reduxjs/toolkit/query/react';
import { AuthService, LoginResponseDto, UserDto } from '@/api';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: async ({ queryFn }) => {
        try {
            const data = await queryFn();
            return { data };
        } catch (error) {
            return { error };
        }
    },
    endpoints: (builder) => ({
        login: builder.mutation({
            queryFn: async function login(userDto: UserDto): Promise<{ data?: LoginResponseDto, error?: any }> {
                try {
                    return {
                        data: await AuthService.authControllerLogin(userDto)
                    }
                } catch (error: any) {
                    return {
                        error
                    }
                }
            }
        })
    }),
});

export const { useLoginMutation } = authApi;
export const authPath = authApi.reducerPath;
export const authReducer = authApi.reducer;
export const authMiddleware = authApi.middleware;
export const { login } = authApi.endpoints;

export default authApi;
