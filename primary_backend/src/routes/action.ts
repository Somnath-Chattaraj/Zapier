import router from 'express'
import authMiddle from '../middleware';
import { zapSchema } from '../types';
import { prisma } from '../lib/prisma';

export const actionRouter = router.Router();


actionRouter.get("/available", async (req, res) => {
    const availableTriggers = await prisma.availableAction.findMany({});
    res.json(availableTriggers);
})