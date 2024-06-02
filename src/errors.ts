import type { ErrorRequestHandler } from "express";
import { send } from "./response";
import type { ZodError } from "zod";

const zodErrorMessage = (err: ZodError): string => {
  const [firstIssue] = err.issues;
  const { code, path } = firstIssue;
  switch (code) {
    case "too_small": {
      return `${path[0]} is too small.`;
    }
    default: {
      return `Input data is wrong`;
    }
  }
};

export const defaultErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next
) => {
  console.log(err.name);
  switch (err.name) {
    case "NotFoundError":
      return send(res).notFound();
    case "ZodError":
      return send(res).badRequest(zodErrorMessage(err));
    default:
      return send(res).internalError(`Internal error.`);
  }
};
