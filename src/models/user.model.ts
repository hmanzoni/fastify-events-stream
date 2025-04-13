import { z } from "zod";
import { uuidv7 } from "uuidv7";

const PasswordHashSchema = z.string()
  .min(8, "Password must be at least 8 characters long")
  .regex(/[a-zA-Z]/, "Password must contain at least one letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[@$!%*?&]/, "Password must contain at least one special character (@$!%*?&)"
);

const TimeStampSchema = z.date().optional().transform(() => new Date().getTime().toString());

const IdSchema = z.string().uuid().optional().transform(() => uuidv7());

// This schema defines the structure of an user object.
export const UserSchema = z.object({
  id: IdSchema,
  username: z.string().min(3, "Username must be at least 3 characters long"),
  email: z.string().email("Invalid email address"),
  password_hash: PasswordHashSchema,
  created_at: TimeStampSchema,
});
