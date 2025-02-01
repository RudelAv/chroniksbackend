import { BanTokenUseCase } from "../../domain/interfaces/uses-cases/banToken/createBanToken";
import express from 'express';
import { Request, Response } from "express";
import { parseError } from "../../domain/utils/parse_error";
import { authenticateToken } from "../../domain/middleware/authenticate_token";


export default function BanTokenRouter(
    banTokenUseCase: BanTokenUseCase,
) {
    const router = express.Router();

    /**
     * @swagger
     * /api/v1/logout:
     *   post:
     *     tags: ["Logout"]
     *     summary: Logout a user
     *     description: Logout a user
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               accessToken:
     *                 type: string
     *               refreshToken:
     *                 type: string
     *     responses:
     *       200:
     *         description: User logged out successfully
     *       401:
     *         description: Unauthorized
     *       500:

     *         description: Internal server error
     */


    router.post('/', authenticateToken, async (req: Request, res: Response) => {
        const result = await banTokenUseCase.banToken(req.body.refreshToken, req.body.accessToken);
        return parseError(result, res);
    });

    return router;
}