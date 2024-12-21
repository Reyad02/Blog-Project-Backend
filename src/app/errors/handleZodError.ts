import { ZodError, ZodIssue } from 'zod';
import { TError, TGenericError } from '../interface/error';
import httpStatus from 'http-status';

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
  const statusCode = httpStatus.BAD_REQUEST;
  return {
    statusCode,
    error,
    message: errorMsgs,
  };
};

export default handleZodError;
