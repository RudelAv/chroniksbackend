import { object, z } from "zod";

/**
 * @openapi
 * components:
 *   requestBodies :
 *     CreatePostSchema:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               imagePreview:
 *                 type: string
 *               content:
 *                 type: string
 *               tags: 
 *                 type: array
 *                 items:
 *                   type: string
 */

export const CreatePostSchema = object({
    body: object({
        title: z.string().min(3).max(255),
        imagePreview: z.instanceof(File).optional(),
        content: z.string().min(6),
        tags: z.array(z.string()).optional()
    })
});


/**
 * @openapi
 * components:
 *   requestBodies:
 *     GetPostSchema:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               post_id:
 *                 type: string
 */

export const GetPostSchema = object({
    params: object({
        post_id: z.string(),
    })
});


/**
 * @openapi
 * components:
 *   requestBodies:
 *     UpdatePostSchema:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties: 
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 */
export const UpdatePostSchema = object({
    body: object({

        title: z.string().min(3).max(255).optional(),
        content: z.string().min(6).optional(),
        tags: z.array(z.string()).optional()
    })
});

/**
 * @openapi
 * components:
 *   requestBodies:
 *     DeletePostSchema:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               post_id:
 *                 type: string
 */

export const DeletePostSchema = object({
    params: object({
        post_id: z.string().uuid(),
    })
});

/**
 * @openapi
 * components:
 *   requestBodies:
 *     CommentPostSchema:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment:
 *                 type: string
 */

export const CommentPostSchema = object({
    body: object({
        comment: z.string().min(6),
    })
});



