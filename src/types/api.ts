
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

type HttpStatusType = keyof typeof HTTNP_STATUS;

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
}