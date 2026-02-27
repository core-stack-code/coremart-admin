import { UseMutationOptions, UseQueryOptions } from "@tanstack/react-query";

const HTTNP_STATUS = {
    CREATED: 201,
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    RESOURCE_NOT_FOUND: 404,
    CONFLICT: 409,
    TOO_MANY_REQUESTS: 429,
    INTERNAL_SERVER_ERROR: 500,
} as const;

export type HttpStatusType = keyof typeof HTTNP_STATUS;

export type ApiResponse<T> = {
    success?: boolean;
    code: HttpStatusType;
    message: string;
    data?: T | null;
}

export type ApiError = {
    success?: boolean;
    code: HttpStatusType;
    message: string;
    status?: number; 
    // status code is not send in error response body by server
    // but still adding here for better error handling in client side
}

export type QueryOptions<T> = Omit<
    UseQueryOptions<ApiResponse<T>, ApiError>,
    "queryKey" | "queryFn"
>;

export type MutationOptions<TData, TVariables> = Omit<
  UseMutationOptions<ApiResponse<TData>, ApiError, TVariables>,
  "mutationFn" | "mutationKey"
>;

export type MutationOptionsAPI<TData, TVariables> = Omit<
  UseMutationOptions<TData, ApiError, TVariables>,
  "mutationFn" | "mutationKey"
>;