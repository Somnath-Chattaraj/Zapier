import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { prisma } from "./lib/prisma.js";

interface AuthenticatedRequest extends Request {
    id?: string;
}

async function authMiddle(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const token = req.cookies?.Authorization; // Safely access the Authorization cookie
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
