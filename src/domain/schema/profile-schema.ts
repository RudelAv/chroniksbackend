import { object, z } from "zod";

/**
 * @openapi
 * components:
 *   requestBodies:
 *     UpdateProfileSchema:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               bio:
 *                 type: string
 *               image:
 *                 type: string
 */
export const profileSchema = object({
    body: object({
        name: z.string().min(3).max(255).optional(),

        bio: z.string().min(6).max(255).optional(),
        image: z.string().min(6).max(255).optional(),
    })
});