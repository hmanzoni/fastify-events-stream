import { z } from "zod";
import { uuidv7 } from "uuidv7";

// This schema defines the structure of an user object.
export const UserSchema = z.object({
  id: z.string().uuid().optional().transform(() => uuidv7()),
  username: z.string(),
  email: z.string().email(),
  password_hash: z.string(),
  created_at: z.date().optional().transform(() => new Date().getTime().toString()),
});