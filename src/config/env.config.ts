import { config, type DotenvParseOutput } from "dotenv";
import { EnvVarsNotFoundError } from "../errors/ConfigErrors.js";

const envVars: DotenvParseOutput | undefined = config().parsed;

if (!envVars) {
  throw new EnvVarsNotFoundError("Error loading environment variables");
}

export default envVars;