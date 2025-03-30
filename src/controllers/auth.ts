import type { FastifyRequest, FastifyReply } from "fastify";
import kaftaProducer from "../utils/kafkaProducer.ts";

// GET	/auth/me	Obtener perfil del usuario autenticado
export async function getProfile(request: FastifyRequest, reply: FastifyReply) {
  return reply.send({ hello: "world, from /auth/me" });
}

// POST	/auth/register	Registrar un usuario
export async function register(request: FastifyRequest, reply: FastifyReply) {
  const { username, password, email } = request.body as {
    username: string;
    password: string;
    email: string;
  };
  kaftaProducer({ username, password, email });
  return reply.send({
    message: `User ${username} has been registered successfully`,
  });
}

// POST	/auth/login	Iniciar sesión y obtener un JWT
export async function login(request: FastifyRequest, reply: FastifyReply) {
  const { username, password } = request.body as {
    username: string;
    password: string;
  };
  return reply.send({ hello: "world, from /auth/login" });
}
