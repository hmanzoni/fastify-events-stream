import type { FastifyRequest, FastifyReply } from "fastify";
import { hashPassword } from "../utils/hash.util.js";
import { loginUser, registerUser } from "../services/users.service.js";
import { createToken, verifyToken } from "../utils/jwt.util.js";
import { UserSchema } from "../models/user.model.js";
import { KafkaLoggerProducer } from "../services/logger.service.js";
import { DataLoggerKafka } from "../types/events/kafka.js";
import { LoginBody, RegisterBody, RegisterUserData, UserPg } from "../types/users/users.js";
import { EventsEnumType } from "../types/events/event.enum.js";
import { ForbiddenError, UnauthorizedError, UserAlreadyExistError, UserNotFoundError } from "../errors/AuthErrors.js";

const defaultUserId = "00000000-0000-0000-0000-000000000000";

// GET	/auth/me	Get the profile of the logged-in user
export const getProfile = async (request: FastifyRequest, reply: FastifyReply) => {
  const dataKafkaProducer: DataLoggerKafka = {request, userId: defaultUserId, serviceName: "user-fetch", actionType: EventsEnumType.getProfile, isSuccess: true}
  try {
    await KafkaLoggerProducer({...dataKafkaProducer, userId: request.user.userId});
    return reply.status(200).send({ message: `Your email is: ${request.user.userEmail}` });
  } catch (error) {
    let message: string = "Internal server error";
    let serviceName: string = "user-fetch-internal-error";
    let statusCode: number = 500;
    if (error instanceof ForbiddenError) {
      message = error.message;
      serviceName = "user-fetch-forbidden";
      statusCode = error.statusCode;
    }
    await KafkaLoggerProducer({...dataKafkaProducer, serviceName, isSuccess: false});
    return reply.status(statusCode).send({ message });
  }
};

// POST	/auth/register	Registrer a new user
export const register = async (request: FastifyRequest, reply: FastifyReply) => {
  const { username, password, email } = request.body as RegisterBody;
  const password_hash: string = await hashPassword(password);
  const userRegister: RegisterUserData = UserSchema.parse({
    username,
    password_hash,
    email,
  });
  const dataKafkaProducer: DataLoggerKafka = {request, userId: userRegister.id, serviceName: "user-register", actionType: EventsEnumType.createUser, isSuccess: true};
  try {
    const resp = await registerUser(userRegister);
    await KafkaLoggerProducer(dataKafkaProducer);
    return reply.status(201).send({
      message: `User ${resp.username} has been registered successfully`,
    });
  } catch (error) {
    let message: string = "Internal server error";
    let serviceName: string = "user-register-internal-error";
    let statusCode: number = 500;
    if (error instanceof UserAlreadyExistError) {
      message = error.message;
      serviceName = "user-register-exists"
      statusCode = error.statusCode;
    }
    await KafkaLoggerProducer({...dataKafkaProducer, userId: defaultUserId, serviceName, isSuccess: false});
    return reply.status(statusCode).send({message});
  }
};

// POST	/auth/login	Login user and get the token JWT
export const login = async (request: FastifyRequest, reply: FastifyReply) => {
  const { username, password } = request.body as LoginBody;
  const dataKafkaProducer: DataLoggerKafka = {request, userId: defaultUserId, serviceName: "auth-login", actionType: EventsEnumType.loginUser, isSuccess: true};
  try {
    const userInfo: UserPg = await loginUser({ username, password });

    const tokenJWT: string = await createToken({ username: userInfo.username });
    const refreshTokenJWT: string = await createToken({ username: userInfo.username }, true);

    await KafkaLoggerProducer({...dataKafkaProducer, userId: userInfo.id});

    return reply
      .status(200)
      .send({
        message: `Hello ${userInfo.username} ! You have logged in successfully`,
        token: tokenJWT,
        refreshToken: refreshTokenJWT,
      });
  } catch (error) {
    let serviceName: string = "auth-login-internal-error";
    let message: string = "Internal server error";
    let statusCode: number = 500;
    if (error instanceof UserNotFoundError) {
      serviceName = "auth-login-not-found";
      statusCode = error.statusCode;
      message = error.message;
    }
    if (error instanceof UnauthorizedError) {
      serviceName = "auth-login-unauthorized";
      statusCode = error.statusCode;
      message = error.message;
    }
    const dataKafkaProducer: DataLoggerKafka = {request, userId: defaultUserId, serviceName, actionType: EventsEnumType.loginUser, isSuccess: false};
    await KafkaLoggerProducer(dataKafkaProducer);
    return reply.status(statusCode).send({ message });
  }
};

export const refresh_token = async (request: FastifyRequest, reply: FastifyReply) => {
  const refreshToken = request.headers.refreshToken as string;
  const payload = await verifyToken(refreshToken);
  const newAccessToken = createToken({ username: payload.username });
  reply.send({ accessToken: newAccessToken });
};
