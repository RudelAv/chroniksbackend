import express from 'express';
import { Request, Response } from "express";
import { SignInEmailUseCase } from '../../domain/interfaces/uses-cases/signin/singinEmail';
import { validate } from '../../domain/middleware/validate';
import { signinSchema } from '../../domain/schema/signin-schema';
import { parseError } from '../../domain/utils/parse_error';

export default function SigninRouter(
    signInEmailUseCase: SignInEmailUseCase,
)

{
    const router = express.Router();

    /**
     * @swagger
     * /api/v1/signin/email:
     *   post:
     *     summary: Sign in with email
     *     description: Sign in with email
     *     tags: ["Signin"]
     *     requestBody:
     *       $ref: '#/components/requestBodies/SigninSchema'
     *     responses:
     *       200:
     *         description: Sign in successful
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Internal server error
     */
    router.post('/email', validate(signinSchema), async (req: Request, res: Response) => {
        const result = await signInEmailUseCase.signInEmail(req.body);
        return parseError(result, res);
    });

    return router;
}