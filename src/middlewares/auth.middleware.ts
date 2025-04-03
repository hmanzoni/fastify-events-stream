import type { FastifyRequest, FastifyReply } from "fastify";
import { verifyToken } from "../utils/jwt.util.js";
import { fetchUser } from "../services/users.service.js";

export async function authMiddleware(request: FastifyRequest, reply: FastifyReply) {
    const tokenAuth = request.headers?.authorization;
    if (!tokenAuth) {
      return reply.status(401).send({ message: "Unauthorized" });
    }
    try {
      const token = tokenAuth.split(" ")[1];
      const { username } = await verifyToken(token);
      const userInfo = await fetchUser(username);

      if (!userInfo) {
        return reply.status(401).send({ message: "Unauthorized" });
      }

      request.headers.userEmail = userInfo.email;
    } catch (error) {
      return reply.status(401).send({ message: "Unauthorized" });
    }
  
}