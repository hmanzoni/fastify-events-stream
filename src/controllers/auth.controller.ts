import type { FastifyRequest, FastifyReply } from "fastify";
import { hashPassword } from "../utils/hash.util.js";
import { loginUser, registerUser } from "../services/users.service.js";
import { createToken, verifyToken } from "../utils/jwt.util.js";
import { UserSchema } from "../models/user.model.js";
import { KafkaLoggerProducer } from "../services/logger.service.js";
import { DataLoggerKafka } from "../types/events/kafka.js";
import { LoginBody, RegisterBody, RegisterUserData, UserPg } from "../types/users/users.js";
import { EventsEnumType } from "../types/events/event.enum.js";
import { UnauthorizedError } from "../errors/AuthErrors.js";

// GET	/auth/me	Get the profile of the logged-in user
export const getProfile = async (request: FastifyRequest, reply: FastifyReply) => {
  const dataKafkaProducer: DataLoggerKafka = {request, userId: request.user.userId, serviceName: "user-fetch", actionType: EventsEnumType.getProfile, isSuccess: true}
  await KafkaLoggerProducer({...dataKafkaProducer});
  return reply.status(200).send({ message: `Your email is: ${request.user.userEmail}` });
};

// POST	/auth/register	Registrer a new user
export const register = async (request: FastifyRequest, reply: FastifyReply) => {
  const { username, password, email } = request.body as RegisterBody;

  // Validate the user input, including password strength
  const validatedData = UserSchema.parse({ username, password, email });

  const password_hash: string = await hashPassword(validatedData.password);
  
  const userRegister: RegisterUserData = {
    id: validatedData.id,
    username: validatedData.username,
    email: validatedData.email,
    password_hash,
  };

  const dataKafkaProducer: DataLoggerKafka = {request, userId: userRegister.id, serviceName: "user-register", actionType: EventsEnumType.createUser, isSuccess: true};
  const resp = await registerUser(userRegister);
  await KafkaLoggerProducer(dataKafkaProducer);
  return reply.status(201).send({
    message: `User ${resp.username} has been registered successfully`,
  });
};

// POST	/auth/login	Login user and get the token JWT
export const login = async (request: FastifyRequest, reply: FastifyReply) => {
  const { username, password } = request.body as LoginBody;
  const dataKafkaProducer: DataLoggerKafka = {request, userId: "", serviceName: "auth-login", actionType: EventsEnumType.loginUser, isSuccess: true};
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
};

export const refresh_token = async (request: FastifyRequest, reply: FastifyReply) => {
  const dataKafkaProducer: DataLoggerKafka = {
    request,
    userId: request.user?.userId || "",
    serviceName: "auth-refresh-token",
    actionType: EventsEnumType.refreshToken,
    isSuccess: true
  };

  const refreshToken = request.headers.authorization?.replace('Bearer ', '');
  
  if (!refreshToken) {
    throw new UnauthorizedError('Refresh token is required');
  }

  const payload = await verifyToken(refreshToken);
  const newAccessToken = await createToken({ username: payload.username });
  
  await KafkaLoggerProducer({...dataKafkaProducer});
  
  return reply.status(200).send({ 
    accessToken: newAccessToken,
    message: 'Token refreshed successfully'
  });
}