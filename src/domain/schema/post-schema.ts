import { object, z } from "zod";

export const CreatePostSchema = object({
    body: object({
        title: z.string().min(3).max(255),
        content: z.string().min(6),
        tags: z.array(z.string()).optional()
    })
});

export const GetPostSchema = object({
    params: object({
        post_id: z.string().uuid(),
    })
});

export const UpdatePostSchema = object({
    body: object({
        title: z.string().min(3).max(255).optional(),
        content: z.string().min(6).optional(),
        tags: z.array(z.string()).optional()
    })
});

export const DeletePostSchema = object({
    params: object({
        post_id: z.string().uuid(),
    })
});