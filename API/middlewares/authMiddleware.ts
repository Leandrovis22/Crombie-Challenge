import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface CustomRequest extends Request {
  user?: JwtPayload;
}

const JWT_SECRET = process.env.JWT_SECRET as string;

/**
 * Middleware to verify the JWT token from the Authorization header.
 * It will check if the token is available and valid, and if it is, it will
 * add the user details to the request object and call the next middleware/method.
 * If the token is invalid or missing, it will return an error response.
 */

export const authenticateToken = (req: CustomRequest, res: Response, next: NextFunction): Response | void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied, token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }

    req.user = user as JwtPayload;
    (req as any).userId = req.user?.id;
    next();
  });
};

