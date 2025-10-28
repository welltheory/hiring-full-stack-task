export class HttpError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
  }
}

export class NotFoundError extends HttpError {
  constructor(message: string = 'Resource not found') {
    super(message, 404);
  }
}

export class ValidationError extends HttpError {
  constructor(message: string = 'Validation failed') {
    super(message, 400);
  }
}

export class ConflictError extends HttpError {
  constructor(message: string = 'Resource already exists') {
    super(message, 409);
  }
}

export class UnauthorizedError extends HttpError {
  constructor(message: string = 'Unauthorized') {
    super(message, 401);
  }
}

export class ForbiddenError extends HttpError {
  constructor(message: string = 'Forbidden') {
    super(message, 403);
  }
}
