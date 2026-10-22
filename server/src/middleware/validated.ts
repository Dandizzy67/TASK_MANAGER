// validated.ts - Checks that :id in the URL is a valid MONGODB ID

import type { NextFunction, Request, Response } from "express";
import { isValidObjectId } from "mongoose";

// runs BEFORE the controller on routes
// if the id is valid (it will call next) the controller will run
// if it is invalid stop here and send a 400(bad request status code)

export const validateId = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: `Invalid task ID: ${id}` });
  }

  next();
};
