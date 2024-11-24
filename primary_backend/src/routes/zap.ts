import router from 'express'
import authMiddle from '../middleware';
import { zapSchema } from '../types';
import { prisma } from '../lib/prisma';

export const zapRouter = router.Router();

zapRouter.post('/',authMiddle ,  async (req:any, res:any) => {
    const body = req.body;
    // @ts-ignore
    const id = req.id;
    const parsedData = zapSchema.safeParse(body);

    if (!parsedData.success) {
        return res.status(401).json({
            mess: "Length required"
        })
    }

    await prisma.$transaction(async tx => {
        const zap = await prisma.zap.create({
            data: {
                userId: parseInt(id),
                triggerId: "",
                actions: {
                    create: parsedData.data.actions.map((x,index) => ({
                        actionId: x.availableActionId,
                        sortingOrder: index,
                        metadata: x.actionMetadata
                    }))
                }
            }
        })
        const trigger = await tx.trigger.create({
            data : {
                triggerId: parsedData.data.availableTriggerId, // error change
                zapId: zap.id
            }
        })

        await tx.zap.update({
            where: {
                id: zap.id
            }, data : {
                triggerId: trigger.id
            }
        })
        return zap.id;
    })
    return res.json({ message: "Zap created"});
})
zapRouter.get("/:zapId", authMiddle, async (req, res) => {
    // @ts-ignore
    const id = req.id;
    const zapId = req.params.zapId;
    const zaps = await prisma.zap.findFirst({
        where: {
            id : zapId,
            userId: id
        },
        include: {
            actions: {
                include: {
                    type: true
                }
            },
            trigger: {
                include: {
                    type: true
                }
            },
            
        }
    })
    return res.json(zaps);
})
zapRouter.get('/', async (req:any, res: any) => {
    // @ts-ignore
    const id = req.id;
    const zaps = await prisma.zap.findMany({
        where: {
            userId: id
        },
        include: {
            actions: {
                include: {
                    type: true
                }
            },
            trigger: {
                include: {
                    type: true
                }
            },
            
        }
    })
    return res.json(zaps);

})
