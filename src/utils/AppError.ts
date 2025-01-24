import { NODE_ENV } from "../config";

class AppError extends Error {
  public statusCode: number;

  constructor(statusCode = 500, message = "Something went wrong") {
    super(message);
    this.statusCode = statusCode;

    if (NODE_ENV === "development" && Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default AppError;
