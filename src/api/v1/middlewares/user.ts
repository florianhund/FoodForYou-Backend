import { NextFunction, Request, Response } from 'express';

export const isVerified = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.isVerified) {
    return next();
  }
  res.status(401).json({ message: 'user is not verified!' });
};

export const isNotVerified = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user?.isVerified) {
    return res.status(401).json({ message: 'user is verified' });
  }
  next();
};

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'user is not authenticated' });
};

export const isNotAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    return res.status(401).json({ message: 'user is authenticated' });
  }
  next();
};
