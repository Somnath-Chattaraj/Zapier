import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface AuthenticatedRequest extends Request {
    id?: string;
}

async function authMiddle(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    // Skip auth for certain routes
    const openRoutes = ['/api/v1/user/signup', '/api/v1/user/login', '/api/v1/trigger/available', '/api/v1/actions/available'];
    if (openRoutes.includes(req.path)) {
        return next();
    }

    const token = req.cookies?.Authorization;
    if (!token) {
        return res.sendStatus(401); // No token found
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET || "123random") as JwtPayload;

        if (Date.now() >= (decoded.exp! * 1000)) {  // Check if the token is expired
            res.sendStatus(410);
            return;
        }

        req.id = decoded.sub;
        next();
    } catch (err) {
        res.sendStatus(401);
        return;
    }
}

export default authMiddle;
