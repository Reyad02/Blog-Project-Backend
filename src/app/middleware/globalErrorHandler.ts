import { ErrorRequestHandler } from 'express';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const statusCode = err?.statusCode || 500;
  const message = err.message || 'Something went wrong';
  res.status(statusCode).json({
    success: false,
    message,
    statusCode: statusCode,
    err: err,
    stack: err?.stack,
  });
};

export default globalErrorHandler;
