import { BanTokenUseCase } from "../../domain/interfaces/uses-cases/banToken/createBanToken";
import express from 'express';
import { Request, Response } from "express";
import { parseError } from "../../domain/utils/parse_error";

export default function BanTokenRouter(
    banTokenUseCase: BanTokenUseCase,
) {
    const router = express.Router();

    router.post('/', async (req: Request, res: Response) => {
        const result = await banTokenUseCase.banToken(req.body.refreshToken, req.body.accessToken);
        return parseError(result, res);
    });

    return router;
}