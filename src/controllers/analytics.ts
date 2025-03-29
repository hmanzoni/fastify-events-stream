import { FastifyRequest, FastifyReply } from "fastify";

// GET	/analytics/top-events	Obtener los eventos más frecuentes
export async function events(request: FastifyRequest, reply: FastifyReply) {
  return { hello: "world, from /analytics/top-events" };
}

// GET	/analytics/user/:id	Consultar eventos de un usuario específico
export async function user(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  
  return { hello: `world, from /analytics/user/${id}` };
}
