import router from 'express'
import authMiddle from '../middleware';
import { zapSchema } from '../types';
import { prisma } from '../lib/prisma';

export const triggerRouter = router.Router();

triggerRouter.get("/available", async (req, res) => {
    const availableTriggers = await prisma.availableTrigger.findMany();
    res.json(availableTriggers);
})