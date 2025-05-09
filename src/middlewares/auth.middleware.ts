import type { FastifyRequest, FastifyReply } from "fastify";
import { verifyToken } from "../utils/jwt.util.js";
import { fetchUser } from "../services/users.service.js";
import { JwtPayload } from "jsonwebtoken";
import { UserPg } from "../types/users/users.js";
import { ForbiddenError, UnauthorizedError } from "../errors/AuthErrors.js";

export const authMiddleware = async (request: FastifyRequest, reply: FastifyReply)  =>{
  try {
      const tokenAuth: string | undefined = request.headers?.authorization;
      if (!tokenAuth || !tokenAuth.startsWith("Bearer ")) {
        throw new UnauthorizedError("Authorization header missing or malformed")
      }
      const token: string = tokenAuth.split(" ")[1];
      const { username } = await verifyToken(token) as JwtPayload;
      const userInfo: UserPg = await fetchUser(username);

      if (!userInfo) {
        throw new UnauthorizedError("User not found");
      }

      request.user = { 
        userId: userInfo.id, 
        userEmail: userInfo.email 
      };
    } catch (error) {
      let statusCode: number = 500;
      let message: string = "Internal server error";
      if (error instanceof ForbiddenError) {
        statusCode = error.statusCode;
        message = error.message;
      }
      if (error instanceof UnauthorizedError) {
        statusCode = error.statusCode;
        message = error.message;
      }
      return reply.status(statusCode).send({ message });
    }
  
}