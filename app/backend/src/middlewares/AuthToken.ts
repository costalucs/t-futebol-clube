import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

const jwtSecretKey = process.env.JWT_SECRET;

export default class AuthToken {
  verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Token not found' });

    try {
      verify(token, jwtSecretKey as string);
    } catch (err) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }

    next();
  };
}
