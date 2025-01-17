import { object, z } from "zod";

export const profileSchema = object({
    body: object({
        name: z.string().min(3).max(255).optional(),
        bio: z.string().min(6).max(255).optional(),
        image: z.string().min(6).max(255).optional(),
    })
});