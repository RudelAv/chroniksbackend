import { object, TypeOf, z } from 'zod';

/**
 * @openapi
 * components:
 *   requestBodies:
 *     SigninSchema:
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
 */
export const signinSchema = object({
    body: object({
        provider: z.string().min(3).max(255),
        email: z.string().email(),
        password: z.string().min(6).max(255)
    })
});

export type SignUpSchema = TypeOf<typeof signinSchema>["body"];
