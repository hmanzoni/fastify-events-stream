import type { FastifyRequest, FastifyReply } from "fastify";
import kaftaProducer from "../services/producer.service.js";
import { hashPassword } from "../utils/hash.util.js";
import { loginUser, UserPg } from "../services/users.service.js";
import { createToken } from "../utils/jwt.util.js";

// GET	/auth/me	Get the profile of the logged-in user
export const getProfile = async (request: FastifyRequest, reply: FastifyReply) => {
  return reply
    .status(200)
    .send({ email: `Your email is: ${request.headers?.userEmail}` });
}

type RegisterBody = {
  username: string;
  password: string;
  email: string;
};

// POST	/auth/register	Registrer a new user
export const register = async (request: FastifyRequest, reply: FastifyReply) => {
  const { username, password, email } = request.body as RegisterBody;
  const password_hash: string = await hashPassword(password);
  await kaftaProducer({
    username,
    password_hash,
    email,
    action_type: "create_user",
  });
  return reply.status(201).send({
    message: `User ${username} has been registered successfully`,
  });
}

type LoginBody = {
  username: string;
  password: string;
};

// POST	/auth/login	Login user and get the token JWT
export const login = async (request: FastifyRequest, reply: FastifyReply) => {
  const { username, password } = request.body as LoginBody;
  const userInfo: UserPg = await loginUser({ username, password });
  if (!userInfo) {
    return reply.status(401).send({ message: "Login failed" });
  }

  const tokenJWT: string = await createToken({
    username: userInfo.username,
    email: userInfo.email,
  });

  return reply
    .status(200)
    .header("Authorization", "Bearer " + tokenJWT)
    .send({
      message: `Hello ${userInfo.username} ! You have logged in successfully`,
      tokenJWT,
    });
}
