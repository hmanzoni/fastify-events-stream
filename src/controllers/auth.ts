import type { FastifyRequest, FastifyReply } from "fastify";
import kaftaProducer from "../services/producer.service.ts";
import { hashPassword } from "../utils/hash.ts";
import { loginUser, fetchUser } from "../services/users.service.ts";

// GET	/auth/me	Obtener perfil del usuario autenticado
export async function getProfile(request: FastifyRequest, reply: FastifyReply) {
  const username = 'Hugo';
  const userInfo = await fetchUser(username);
  return reply.status(200).send({ email: `Your email is: ${userInfo?.email}` });
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
  return reply.status(200).send({
    message: `Hello ${userInfo.username} ! You have logged in successfully`,
  });
}
