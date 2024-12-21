import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import handleZodError from '../errors/handleZodError';
import { TError } from '../interface/error';
import handleValidationError from '../errors/handleValidationError';
import httpStatus from 'http-status';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = httpStatus.INTERNAL_SERVER_ERROR as number;
  let message = 'Something went wrong';
  let errors: TError = [
    {
      path: '',
      message: '',
    },
  ];

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
  } else if (err?.message === 'AUTH_ERROR') {
    statusCode = httpStatus.UNAUTHORIZED;
    message = 'You are not an authenticated person';
    errors = [
      {
        path: '',
        message: '',
      },
    ];
  } else if (err?.message === 'AUTHORIZATION_ERROR') {
    statusCode = httpStatus.UNAUTHORIZED;
    message = "You don't have permission to access this resource";
    errors = [
      {
        path: '',
        message: '',
      },
    ];
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
