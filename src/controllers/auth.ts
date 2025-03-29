import { FastifyRequest, FastifyReply } from "fastify";

// GET	/auth/me	Obtener perfil del usuario autenticado
export async function getProfile(request: FastifyRequest, reply: FastifyReply) {
  return { hello: "world, from /auth/me" };
}

// POST	/auth/register	Registrar un usuario
export async function register(request: FastifyRequest, reply: FastifyReply) {
  return { hello: "world, from /auth/register" };
}

// POST	/auth/login	Iniciar sesión y obtener un JWT
export async function login(request: FastifyRequest, reply: FastifyReply) {
  return { hello: "world, from /auth/login" };
}
