import express from 'express';
import { Request, Response } from "express";
import { SignUpEmailUseCase } from '../../domain/interfaces/uses-cases/signup/signupEmail';
import { validate } from '../../domain/middleware/validate';
import { signupSchema } from '../../domain/schema/signup-schema';
import { parseError } from '../../domain/utils/parse_error';

export default function SignupRouter(
    signUpEmailUseCase: SignUpEmailUseCase,
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

    return router;
}