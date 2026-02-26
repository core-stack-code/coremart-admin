import { ZodError, ZodType } from "zod"
import { Log } from "../utils";

export const flatZodError = (schema: ZodType<any>, formData: any): string | null => {
    try {
        schema.parse(formData);
        return null;
    } 
    catch (error) {
        let errorMessage: string = "Invalid input data";
        if (error instanceof ZodError) {
            Log("zodError", error.issues[0].message)
            errorMessage = error.issues[0].message
        }
        return errorMessage;
    }
};