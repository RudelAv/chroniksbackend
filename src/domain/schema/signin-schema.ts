import { object, TypeOf, z } from 'zod';

export const signinSchema = object({
    body: object({
        provider: z.string().min(3).max(255),
        email: z.string().email(),
        password: z.string().min(6).max(255)
    })
});

export type SignUpSchema = TypeOf<typeof signinSchema>["body"];
