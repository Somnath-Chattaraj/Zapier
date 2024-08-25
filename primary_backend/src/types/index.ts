import z from 'zod';

export const SignupSchema = z.object({
    username : z.string(),
    email : z.string().email(),
    password : z.string().min(8)
})

export const SigninSchema = z.object({
    username: z.string(),
    email: z.string().email(),
    password : z.string().min(8)
})

export const zapSchema = z.object({
    availableTriggerId: z.string(),
    triggerMetaData: z.any().optional(),
    actions: z.array(z.object({
        availableActionId : z.string(),
        actionMetadata: z.any().optional()
    }))
})