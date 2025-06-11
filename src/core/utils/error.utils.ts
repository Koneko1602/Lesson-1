import { ValidationError } from '../../videos/dto/validationError';

export const createErrorsMessages = (
    errors: ValidationError[],
): { errorsMessages: ValidationError[] } => {
    return { errorsMessages: errors };
};