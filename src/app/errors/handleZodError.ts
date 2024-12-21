import { ZodError, ZodIssue } from 'zod';
import { TError, TGenericError } from '../interface/error';

const handleZodError = (err: ZodError): TGenericError => {
  const error: TError = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue?.path.length - 1],
      message: issue?.message,
    };
  });
  const errorMsgs = err?.issues
  .map((issue: ZodIssue) => issue.message)
  .join(', ');
  const statusCode = 400;
  return {
    statusCode,
    error,
    message: errorMsgs,
  };
};

export default handleZodError;
