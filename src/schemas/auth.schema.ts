export const loginSchema = {
  description: "User login endpoint",
  tags: ["auth"],
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
    200: {
      description: "Successful login",
      type: "object",
      properties: {
        message: { type: "string" },
        tokenJWT: { type: "string" },
      },
    },
    401: {
      description: "Unauthorized",
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
    404: {
      description: "NotFound",
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
    500: {
      description: "InternalServerError",
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
  },
};

export const registerSchema = {
  description: "User register endpoint",
  tags: ["auth"],
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
    201: {
      description: "Successful registration",
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
    403: {
      description: "Forbidden",
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
    409: {
      description: "UserAlreadyExist",
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
    500: {
      description: "InternalServerError",
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
  },
};

export const getProfileSchema = {
  description: "Get user information endpoint",
  tags: ["auth"],
  summary: "Get user information",
  response: {
    200: {
      description: "Successful get profile",
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
    403: {
      description: "Forbidden",
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
    500: {
      description: "InternalServerError",
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
  },
};
