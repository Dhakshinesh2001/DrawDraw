import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWTSECRET } from '@repo/backend-common/config';

interface authRequest extends Request {
    userId?: string;
}

export function authMiddleware(req: authRequest, res: Response, next: NextFunction) {
    const token = req.headers['authorization'] ?? "";

    const decoded = jwt.verify(token, JWTSECRET) as { userId: string };

    if(decoded) {
        req.userId = decoded.userId;
        next();

    }
    else{
        res.status(401).json({ message: 'Unauthorized' });
    }

}