import type { ErrorRequestHandler } from "express";

export const defaultErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next
) => {};
