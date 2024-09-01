import router from 'express';
import authMiddleware from '../middleware';
import { SigninSchema, SignupSchema } from '../types';
import { prisma } from '../lib/prisma';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const userRouter = router.Router();

userRouter.post('/signup', async (req: any, res: any) => {
    try {
        const parseData = SignupSchema.safeParse(req.body);
        if (!parseData.success) {
            return res.status(400).json({
                message: "Invalid data",
                errors: parseData.error.errors
            });
        }

        const { email, username, password } = parseData.data;

        const userExists = await prisma.user.findFirst({
            where: { email },
        });

        if (userExists) {
            return res.status(400).json({
                message: "User already exists, please try signing in",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 8);
        const user = await prisma.user.create({
            data: {
                email,
                name: username,
                password: hashedPassword,
            },
        });

        const exp = Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 30); // Expiry in seconds
        const token = jwt.sign({ sub: user.id, exp }, process.env.SECRET || "123random");

        res.cookie("Authorization", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
        });
        res.status(201).json({ message: "User signed up" });
    } catch (error) {
        console.error("Signup Error: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


userRouter.post('/login', async (req: any, res: any) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const parsedBody = SigninSchema.safeParse(req.body);
        if (!parsedBody) {
            return res.status(401).json({
                mess: "Length Required"
            })
        }

        if (!email || !password) {
            return res.status(401).json({
                message: "Field missing",
            });
        }

        const user = await prisma.user.findFirst({
            where: {
                email: email,
            },
        });

        if (!user) {
            return res.status(403).json({
                message: "No user exists, try signing up",
            });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({
                message: "Incorrect password",
            });
        }

        const exp = Date.now() + 1000 * 60 * 60 * 24 * 30;
        const token = jwt.sign({ sub: user.id, exp }, (process.env.SECRET||"123random"));
        res.cookie("Authorization", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
        });
        res.status(200).json({ message: "User logged in" });
    } catch (error) {
        console.error("Login Error: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

userRouter.get('/', authMiddleware, async (req: any, res: any) => {
    try {
        console.log("Fetched User");
        const user_id = req.id;
        const user = await prisma.user.findFirst({
            where: {
                id: user_id
            }
        })
        return res.json({user})
    } catch (error) {
        console.error("Fetch User Error: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
