import type { FastifyRequest, FastifyReply } from "fastify";
import { verifyToken } from "../utils/jwt.util.js";
import { fetchUser } from "../services/users.service.js";
import { JwtPayload } from "jsonwebtoken";
import { UserPg } from "../types/users/users.js";

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
      request.user = { 
        userId: userInfo.id, 
        userEmail: userInfo.email 
      };
    } catch (error) {
      return reply.status(401).send({ message: "Unauthorized" });
    }
  
}