import { object, z } from "zod";
/**
 * @openapi
 * components:
 *   requestBodies:
 *     CreateCommunitySchema:
 *       required: true
 *       content:
 *         formData:
 *           schema:

 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               image:
 *                 type: File
 */

export const CreateCommunitySchema = object({
    body: object({
        name: z.string().min(3).max(255),
        description: z.string().min(6),
        image: z.instanceof(File).optional()
    })
});

/**
 * @openapi
 * components:
 *   requestBodies:
 *     JoinCommunitySchema:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               community:
 *                 type: string
 */
export const JoinCommunitySchema = object({
    params: object({
        community: z.string().min(3).max(255)
    })
});

/**
 * @openapi
 * components:
 *   requestBodies:
 *     LeaveCommunitySchema:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               community:
 *                 type: string

 */ 
export const LeaveCommunitySchema = object({
    params: object({
        community: z.string().min(3).max(255)
    })
});

/**
 * @openapi
 * components:
 *   requestBodies:
 *     GetCommunitySchema:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               community_id:
 *                 type: string
 */
export const GetCommunitySchema = object({
    params: object({
        community: z.string().min(3).max(255)
    })
});

