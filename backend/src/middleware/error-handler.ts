import { Request, Response, NextFunction } from 'express';
import { HttpError } from '$utils/errors';

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  // Log error for debugging
  console.error('Error:', {
    name: err.name,
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
  });

  // Handle custom HTTP errors with status codes
  if (err instanceof HttpError) {
    res.status(err.statusCode).json({
      error: err.message,
      statusCode: err.statusCode,
    });
    return;
  }

  // Handle Prisma errors (database errors)
  if (err.name === 'PrismaClientKnownRequestError') {
    res.status(400).json({
      error: 'Database operation failed',
      statusCode: 400,
    });
    return;
  }

  // Handle validation errors from express-validator or similar
  if (err.name === 'ValidationError' && !('statusCode' in err)) {
    res.status(400).json({
      error: err.message || 'Validation failed',
      statusCode: 400,
    });
    return;
  }

  // Default to 500 for unknown errors
  res.status(500).json({
    error: 'Internal server error',
    statusCode: 500,
  });
}
