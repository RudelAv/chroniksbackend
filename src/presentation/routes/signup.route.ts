import express from 'express';
import { Request, Response } from "express";
import { SignUpEmailUseCase } from '../../domain/interfaces/uses-cases/signup/signupEmail';
import { validate } from '../../domain/middleware/validate';
import { signupOAuthSchema, signupSchema } from '../../domain/schema/signup-schema';
import { parseError } from '../../domain/utils/parse_error';
import { SignUpOAuthUseCase } from '../../domain/interfaces/uses-cases/signup/signupOAuth';
import { verifyGoogleToken } from '../../domain/utils/googleOAuth';

export default function SignupRouter(
    signUpEmailUseCase: SignUpEmailUseCase,
    signUpOAuthUseCase: SignUpOAuthUseCase
)

{
    const router = express.Router();

    /**
     * @swagger
     * /api/v1/signup/email:
     *   post:
     *     summary: Sign up with email
     *     description: Sign up with email
     *     tags: ["Signup"]
     *     requestBody:
     *       $ref: '#/components/requestBodies/SignupSchema'
     *     responses:
     *       200:
     *         description: Sign up successful
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Internal server error
     */
    router.post('/email', validate(signupSchema), async (req: Request, res: Response) => {
        const result = await signUpEmailUseCase.signUpEmail(req.body);
        return parseError(result, res);
    });


    /**
     * @swagger
     * /api/v1/signup/oauth:
     *   post:
     *     summary: Sign up with OAuth (Google)
     *     description: Sign up with OAuth (Google)
     *     tags: ["Signup"]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               token:
     *                 type: string
     *     responses:
     *       200:
     *         description: Sign up successful
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Internal server error
     */
    router.post('/oauth', validate(signupOAuthSchema),async (req: Request, res: Response) => {
        const { token } = req.body;
        console.log(token);
        try {
            const user = await verifyGoogleToken(token);
            const result = await signUpOAuthUseCase.signUpOAuth(user);
            return parseError(result, res);
        } catch (error) {
            return res.status(500).json({ code: "500", message: error });
        }
        
    });

    return router;
}