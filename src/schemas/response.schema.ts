const description401 = "Unauthorized access";
const description403 = "Forbidden access";
const description404 = "User not found";
const description409 = "User already exists";
const description500 = "Internal Server Error";

const baseErrorResp = {
  description: "",
  type: "object",
  properties: {
    message: { type: "string" },
  },
};

export const errorResponseSchema = {
  401: {
    ...baseErrorResp,
    description: description401,
  },
  403: {
    ...baseErrorResp,
    description: description403,
  },
  404: {
    ...baseErrorResp,
    description: description404,
  },
  409: {
    ...baseErrorResp,
    description: description409,
  },
  500: {
    ...baseErrorResp,
    description: description500,
  },
};
