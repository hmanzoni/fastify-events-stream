import type { FastifyRequest, FastifyReply } from "fastify";
import { verifyToken } from "../utils/jwt.util.js";
import { fetchUser, type  UserPg } from "../services/users.service.js";
import { JwtPayload } from "jsonwebtoken";

export const authMiddleware = async (request: FastifyRequest, reply: FastifyReply)  =>{
    const tokenAuth: string | undefined = request.headers?.authorization;
    if (!tokenAuth) {
      return reply.status(401).send({ message: "Unauthorized" });
    }
    try {
      const token: string = tokenAuth.split(" ")[1];
      const { username } = await verifyToken(token) as JwtPayload;
      const userInfo: UserPg = await fetchUser(username);

      if (!userInfo) {
        return reply.status(401).send({ message: "Unauthorized" });
      }

      request.headers.userEmail = userInfo.email;
    } catch (error) {
      return reply.status(401).send({ message: "Unauthorized" });
    }
  
}