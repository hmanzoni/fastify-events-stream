import type { FastifyRequest, FastifyReply } from "fastify";
import { hashPassword } from "../utils/hash.util.js";
import { loginUser, registerUser } from "../services/users.service.js";
import { createToken } from "../utils/jwt.util.js";
import { UserSchema } from "../models/user.model.js";
import { KafkaLoggerProducer } from "../services/logger.service.js";
import { DataLoggerKafka } from "../types/events/kafka.js";
import { LoginBody, RegisterBody, RegisterUserData, UserPg } from "../types/users/users.js";
import { EventsEnumType } from "../types/events/event.enum.js";

const defaultUserId = "00000000-0000-0000-0000-000000000000";

// GET	/auth/me	Get the profile of the logged-in user
export const getProfile = async (request: FastifyRequest, reply: FastifyReply) => {
  const dataKafkaProducer: DataLoggerKafka = {request, userId: request.user.userId, serviceName: "user-fetch", actionType: EventsEnumType.getProfile, isSuccess: true}
  try {
    await KafkaLoggerProducer(dataKafkaProducer);
    return reply
      .status(200)
      .send({ message: `Your email is: ${request.user.userEmail}` });
  } catch (error) {
    await KafkaLoggerProducer({...dataKafkaProducer, isSuccess: false});
    return reply
      .status(400)
      .send({ message: `Error: ${error}` });
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
  } catch (err: any) {
    if (err.message.includes("User already exists")) {
      await KafkaLoggerProducer({...dataKafkaProducer, userId: defaultUserId, serviceName: "user-register-exists", isSuccess: false});
      console.warn("User already exists, continuing...");
      return reply.status(409).send({
        message: `User ${username} already exists`,
      });
    } else {
      await KafkaLoggerProducer({...dataKafkaProducer, userId: defaultUserId, isSuccess: false});
      return reply.status(400).send({
        message: err.message,
      });
    }
  }
};

// POST	/auth/login	Login user and get the token JWT
export const login = async (request: FastifyRequest, reply: FastifyReply) => {
  const { username, password } = request.body as LoginBody;
  const userInfo: UserPg = await loginUser({ username, password });
  const dataKafkaProducer: DataLoggerKafka = {request, userId: userInfo.id, serviceName: "auth-login", actionType: EventsEnumType.loginUser, isSuccess: true};

  if (!userInfo) {
    await KafkaLoggerProducer({...dataKafkaProducer, userId: defaultUserId, isSuccess: false});
    return reply.status(401).send({ message: "Login failed" });
  }

  const tokenJWT: string = await createToken({
    username: userInfo.username,
    email: userInfo.email,
  });
  await KafkaLoggerProducer(dataKafkaProducer);

  return reply
    .status(200)
    .header("Authorization", "Bearer " + tokenJWT)
    .send({
      message: `Hello ${userInfo.username} ! You have logged in successfully`,
      tokenJWT,
    });
};
