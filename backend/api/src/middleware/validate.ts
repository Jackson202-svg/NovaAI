import { type NextFunction, type Request, type Response } from 'express';
import { z, type ZodSchema } from 'zod';

export const validate = (schema: ZodSchema) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      next(
        Object.assign(new Error('Validation failed'), {
          statusCode: 400,
          details: result.error.flatten(),
        }),
      );
      return;
    }

    req.body = result.data;
    next();
  };
};
