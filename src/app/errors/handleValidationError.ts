import mongoose from 'mongoose';
import { TError, TGenericError } from '../interface/error';

const handleValidationError = (
  err: mongoose.Error.ValidationError,
): TGenericError => {
  const error: TError = Object.values(err?.errors).map((val) => {
    return {
      path: val?.path,
      message: val?.message,
    };
  });

  const statusCode = 400;

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
