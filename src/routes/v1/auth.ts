import type { FastifyInstance } from "fastify";
import { getProfile, register, login } from "../../controllers/auth.js";

async function routes(fastify: FastifyInstance, options: Object) {
  // GET	/auth/me	Obtener perfil del usuario autenticado
  fastify.get("/me", getProfile);
  
  // POST	/auth/register	Registrar un usuario
  fastify.post("/register", register);
  
  // POST	/auth/login	Iniciar sesión y obtener un JWT
  fastify.post("/login", login);
}

export default routes;
