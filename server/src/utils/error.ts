import { CustomError } from '../types/customError';

export const errorHandler = (statusCode: number, message: string): CustomError => {
    return new CustomError(statusCode, message);
};

