import { object, TypeOf, z } from 'zod';

/**
 * @openapi
 * components:
 *   requestBodies:
 *     SignupSchema:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               provider:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *               name:
 *                 type: string
 */


export const signupSchema = object({
    body: object({
        name: z.string().min(3).max(255),
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

/**
 * @openapi
 * components:
 *   requestBodies:
 *     SignupOAuthSchema:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 */
export const signupOAuthSchema = object({
    body: object({
        token: z.string(),
    })
});
