import { type FastifyInstance } from "fastify";
import { getProfile, register, login } from "../../controllers/auth.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

const routes = async (fastify: FastifyInstance) => {
  // GET	/auth/me	Get the profile of the logged-in user
  fastify.get("/me", { preHandler: [authMiddleware] }, getProfile);

  // POST	/auth/register	Registrer a new user
  fastify.post("/register", register);

  // POST	/auth/login	Login user and get the token JWT
  fastify.post("/login", login);
}

export default routes;
