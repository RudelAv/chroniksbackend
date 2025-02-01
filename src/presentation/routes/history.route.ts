import { GetUserHistoryUseCase } from "../../domain/interfaces/uses-cases/history/get-viewed-post";
import express from "express";
import { authenticateToken } from "../../domain/middleware/authenticate_token";
import { parseError } from "../../domain/utils/parse_error";

export default function HistoryRouter(
    getUserHistoryUseCase: GetUserHistoryUseCase
) {
    const router = express.Router();
    /**
     * @swagger
     * /api/v1/history/viewed-post:
     *   get:
     *     summary: Get user history
     *     description: Get user history
     *     tags: ["History"]
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: User history retrieved successfully
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Internal server error
     */
    router.get('/viewed-post', authenticateToken,  async (req, res) => {
        const user_id = req.body.userConnect.id;
        const result = await getUserHistoryUseCase.getUserHistory(user_id);
        return parseError(result, res);
    });

    return router;  
}