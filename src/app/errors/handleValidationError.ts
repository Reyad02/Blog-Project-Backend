import mongoose from 'mongoose';
import { TError, TGenericError } from '../interface/error';
import httpStatus from 'http-status';

const handleValidationError = (
  err: mongoose.Error.ValidationError,
): TGenericError => {
  const error: TError = Object.values(err?.errors).map((val) => {
    return {
      path: val?.path,
      message: val?.message,
    };
  });

  const statusCode = httpStatus.BAD_REQUEST;

  const errorMsgs = Object.values(err?.errors)
    .map(
      (issue: mongoose.Error.ValidatorError | mongoose.Error.CastError) =>
        issue.message,
    )
    .join(', ');
  return {
    statusCode,
    error,
    message: errorMsgs,
  };
};

export default handleValidationError;
