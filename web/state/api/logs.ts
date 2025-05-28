import { createApi } from '@reduxjs/toolkit/query/react';
import { LogResponseDto, LogsService } from '@/api';

export const logsApi = createApi({
    reducerPath: 'logsApi',
    baseQuery: async ({ queryFn }) => {
        try {
            const data = await queryFn();
            return { data };
        } catch (error) {
            return { error };
        }
    },
    endpoints: (builder) => ({
        getErrorLogs: builder.query({
            queryFn: async function getErrorLogs(lines: number): Promise<{ data?: LogResponseDto, error?: any }> {
                try {
                    return {
                        data: await LogsService.logsControllerGetErrorLogs(lines)
                    }
                } catch (error: any) {
                    return {
                        error
                    }
                }
            }
        }),
        getOutputLogs: builder.query({
            queryFn: async function getOutputLogs(lines: number): Promise<{ data?: LogResponseDto, error?: any }> {
                try {
                    return {
                        data: await LogsService.logsControllerGetOutputLogs(lines)
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

export const { useGetErrorLogsQuery, useGetOutputLogsQuery } = logsApi;
export const logsPath = logsApi.reducerPath;
export const logsReducer = logsApi.reducer;
export const logsMiddleware = logsApi.middleware;
export const { getErrorLogs, getOutputLogs } = logsApi.endpoints;

export default logsApi;
