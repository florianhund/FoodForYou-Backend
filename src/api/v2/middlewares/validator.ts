import { NextFunction, Request, Response } from 'express';
import { ValidationChain, validationResult } from 'express-validator';

const validation = validationResult.withDefaults({
  formatter: ({ msg, location, param, value }) => {
    return {
      message: msg,
      location,
      param,
      value
    };
  }
});

export default (validations: ValidationChain[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(validations.map(validation => validation.run(req)));
    const errors = validation(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ code: 400, status: 'INVALID INPUT', errors: errors.array() });
    }
    next();
  };
