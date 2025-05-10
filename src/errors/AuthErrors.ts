export class UserNotFoundError extends Error {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.name = "UserNotFoundError";
    this.statusCode = 404;
  }
}

export class UnauthorizedError extends Error {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.name = "UnauthorizedError";
    this.statusCode = 401;
  }
}

export class ForbiddenError extends Error {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.name = "ForbiddenError";
    this.statusCode = 403;
  }
}

export class UserAlreadyExistError extends Error {
  statusCode: number;
  constructor(message: string = "User already exists") {
    super(message);
    this.name = "UserAlreadyExistError";
    this.statusCode = 409;
  }
}