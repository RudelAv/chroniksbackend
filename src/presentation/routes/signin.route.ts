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

    router.post('/email', validate(signinSchema), async (req: Request, res: Response) => {
        const result = await signInEmailUseCase.signInEmail(req.body);
        return parseError(result, res);
    });

    return router;
}