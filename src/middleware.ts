import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodError } from 'zod'; // Use AnyZodObject for object schemas

import admin from "./firebase-admin";

// T: (req, res, next) => Promise<void>
// asyncWrapper: (fn: T) -> fn(args(T))
export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<void>
) => (req: Request, res: Response, next: NextFunction) => {
  fn(req, res, next)
    .catch(next);
};                      


export async function authenticate(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  const idToken = authHeader.split('Bearer ')[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    
    // attach user info to request
    req.user = decodedToken; 
    next();
  } catch (error) {
    console.error('Token verification error: ', error);
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    // TO DO: forward to global error handler
    //  return next(new UnauthorizedError('Unauthorized: Invalid token'));
  }
};




// validateBody: (schema: AnyZodObject) -> (fn: NextFunction)
export const validateBody = (schema: AnyZodObject) => async (
  req: Request, res: Response, next: NextFunction
) => {
  try {
    const result = await schema.safeParseAsync(req.body);
    if (!result.success) {
      const formattedErrors = result.error.flatten();
      res.status(400).json({
        message: 'Validation failed',
        errors: formattedErrors,
      });
      return;
    }

    req.body = result.data;
    next();
  } catch (error: unknown) {
    console.error("Error during validation middleware: ", error);
    
    if (error instanceof ZodError) {
       res.status(400).json({
          message: 'Validation failed',
          errors: error.flatten(), 
        });
        return;
    }

    // forward to global error handler
    next(error);
  }
};

