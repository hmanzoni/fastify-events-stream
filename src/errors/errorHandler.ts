import { FastifyError } from 'fastify';
import { ZodError } from 'zod';
import { UserNotFoundError, UnauthorizedError, ForbiddenError, UserAlreadyExistError } from './AuthErrors.js';
import { EnvVarsNotFoundError } from './ConfigErrors.js';

export const errorHandler = (error: FastifyError, request: any, reply: any) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error',
      errors: error.errors
    });
  }

  if (error instanceof UserNotFoundError || error instanceof UnauthorizedError || error instanceof ForbiddenError || error instanceof UserAlreadyExistError || error instanceof EnvVarsNotFoundError) {
    return reply.status(error.statusCode).send({ message: error.message });
  }

  request.log.error(error);
  return reply.status(500).send({ message: 'Internal Server Error' });
};