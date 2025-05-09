export class EnvVarsNotFoundError extends Error {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.name = "EnvVarsNotFoundError";
    this.statusCode = 500;
  }
}