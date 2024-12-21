import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import handleZodError from '../errors/handleZodError';
import { TError } from '../interface/error';
import handleValidationError from '../errors/handleValidationError';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = 'Something went wrong';
  let errors: TError = [
    {
      path: '',
      message: '',
    },
  ];

  // console.log(err?.name);
  if (err instanceof ZodError) {
    const simpleError = handleZodError(err);
    statusCode = simpleError.statusCode;
    message = simpleError.message;
    errors = simpleError.error;
  } else if (err?.name === 'ValidationError') {
    const simpleError = handleValidationError(err);
    statusCode = simpleError.statusCode;
    message = simpleError.message;
    errors = simpleError.error;
  }
  res.status(statusCode).json({
    success: false,
    message: message,
    statusCode: statusCode,
    error: errors,
    stack: err?.stack,
  });
};

export default globalErrorHandler;
