import type { FastifyReply, FastifyRequest } from "fastify";
import { AppError } from "../middlewares/app-error";
import { createUserSchema } from "../schemas/user.schema";
import { createUser, findUser } from "../services/user.service";

export async function createUserController(
  request: FastifyRequest<{ Body: unknown }>,
  reply: FastifyReply,
) {
  const body = createUserSchema.parse(request.body);

  const email = request.user.email;

  if (!email) {
    throw new AppError("Authenticated user does not have an email", 400);
  }

  console.log("chegou aqui", body);

  const user = await createUser(request.user.uid, {
    name: body.name,
    email,
  });

  return reply.status(201).send(user);
}
export async function findUserController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const user = await findUser(request.user.uid);

  return reply.status(200).send(user);
}
