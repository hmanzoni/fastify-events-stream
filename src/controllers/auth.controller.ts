import type { FastifyRequest, FastifyReply } from "fastify";
import kaftaProducer from "../services/producer.service.js";
import { hashPassword } from "../utils/hash.util.js";
import { loginUser } from "../services/users.service.js";
import { createToken } from "../utils/jwt.util.js";

// GET	/auth/me	Obtener perfil del usuario autenticado
export async function getProfile(request: FastifyRequest, reply: FastifyReply) {
  return reply.status(200).send({ email: `Your email is: ${request.headers?.userEmail}` });
}

// POST	/auth/register	Registrar un usuario
export async function register(request: FastifyRequest, reply: FastifyReply) {
  const { username, password, email } = request.body as {
    username: string;
    password: string;
    email: string;
  };
  const password_hash = await hashPassword(password);
  await kaftaProducer({ username, password_hash, email });
  return reply.status(201).send({
    message: `User ${username} has been registered successfully`,
  });
}

// POST	/auth/login	Iniciar sesión y obtener un JWT
export async function login(request: FastifyRequest, reply: FastifyReply) {
  const { username, password } = request.body as {
    username: string;
    password: string;
  };
  const userInfo = await loginUser({ username, password });
  if (!userInfo) {
    return reply.status(401).send({ message: "Login failed" });
  }
  const tokenJWT = await createToken({
    username: userInfo.username,
    email: userInfo.email,
  });

  return reply
    .status(200)
    .header("Authorization", "Bearer " + tokenJWT)
    .send({
      message: `Hello ${userInfo.username} ! You have logged in successfully`,
    });
}
