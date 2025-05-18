import { FastifySchema } from "fastify";
import { headersJsonSchema } from "./headers.schema.js";
import { errorResponseSchema } from "./response.schema.js";

const tags = ["auth"];

export const loginSchema: FastifySchema = {
  description: "User login endpoint",
  tags,
  summary: "Log in a user",
  body: {
    type: "object",
    required: ["username", "password"],
    properties: {
      username: { type: "string", minLength: 3 },
      password: { type: "string", minLength: 8 },
    },
  },
  response: {
    ...errorResponseSchema,
    200: {
      description: "Successful login",
      type: "object",
      properties: {
        message: { type: "string" },
        token: { type: "string" },
      },
    },
  },
};

export const registerSchema: FastifySchema = {
  description: "User register endpoint",
  tags,
  summary: "Register a new user",
  body: {
    type: "object",
    required: ["username", "password", "email"],
    properties: {
      username: { type: "string", minLength: 3 },
      password: { type: "string", minLength: 8 },
      email: { type: "string", format: "email" },
    },
  },
  response: {
    ...errorResponseSchema,
    201: {
      description: "Successful registration",
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
  },
};

export const getProfileSchema: FastifySchema = {
  description: "Get user information endpoint",
  tags,
  summary: "Get user information",
  headers: headersJsonSchema,
  response: {
    ...errorResponseSchema,
    200: {
      description: "Successful get profile",
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
  },
};
