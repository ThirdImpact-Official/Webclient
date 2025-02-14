import { ErrorType } from "@/enums/RequestType";

export interface ServiceResponse<T>
{
    data: T;
    success: boolean;
    message: string;
    ErrorType: ErrorType;
}
