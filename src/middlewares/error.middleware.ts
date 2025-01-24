import { NextFunction, Request, Response } from "express";
import AppError from "../utils/AppError";
import { ErrorResponse } from "../utils/apiResponse";

const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof AppError) {
    res.status(error.statusCode).json(new ErrorResponse(error.message));

    return;
  }

  res.status(500).json(new ErrorResponse(error.message));

  return;
};

export default errorHandler;
