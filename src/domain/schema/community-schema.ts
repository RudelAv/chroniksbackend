import { object, z } from "zod";

export const CreateCommunitySchema = object({
    body: object({
        name: z.string().min(3).max(255),
        description: z.string().min(6),
        image: z.string().optional()
    })
});