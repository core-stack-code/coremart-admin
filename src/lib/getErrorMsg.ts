import { ApiError } from "@/types/api";

export const getErroMsg = (moduleName: string, error: ApiError) => {
    const code = error.code

    switch (code) {
        case "RESOURCE_NOT_FOUND":
            return `${moduleName} does not exist`
        case "CONFLICT":
            return `${moduleName} already exists`
        default:
            return error.message
    }
}