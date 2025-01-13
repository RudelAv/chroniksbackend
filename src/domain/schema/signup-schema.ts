import { object, TypeOf, z } from 'zod';

export const signupSchema = object({
    body: object({
        // name: z.string().min(3).max(255),
        provider: z.string().min(3).max(255),
        email: z.string().email(),
        password: z.string().min(6).max(255),
        confirmPassword: z.string().min(6).max(255),
    }).refine(data => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
    }),
});

export type SignUpSchema = TypeOf<typeof signupSchema>["body"];
