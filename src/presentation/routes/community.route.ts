import express from 'express';
import { CreateCommunityUseCase } from '../../domain/interfaces/uses-cases/community/create-community';
import { JoinCommunityUseCase } from '../../domain/interfaces/uses-cases/community/join-community';
import { parseError } from '../../domain/utils/parse_error';
import { authenticateToken } from '../../domain/middleware/authenticate_token';
import { validate } from '../../domain/middleware/validate';
import { CreateCommunitySchema, JoinCommunitySchema, LeaveCommunitySchema } from '../../domain/schema/community-schema';
import { LeaveCommunityUseCase } from '../../domain/interfaces/uses-cases/community/leave-community';

export default function CommunityRouter(
    createCommunityUseCase: CreateCommunityUseCase,
    joinCommunityUseCase: JoinCommunityUseCase,
    leaveCommunityUseCase: LeaveCommunityUseCase
) {
    const router = express.Router();

    /**
     * @openapi
     * /api/v1/community:
     *   post:
     *     summary: Create a community
     *     description: Create a community
     *     tags: ["Community"]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       $ref: '#/components/requestBodies/CreateCommunitySchema'
     *     responses:
     *       200:
     *         description: Community created successfully
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Internal server error
     */
    router.post('/', authenticateToken, validate(CreateCommunitySchema), async (req, res) => {
        const community = req.body;
        console.log("dans le router",community);
        const result = await createCommunityUseCase.createCommunity(community, req.body.userConnect.id);
        return parseError(result, res);
    });

    /**
     * @swagger
     * /api/v1/community/{community}:
     *   post:
     *     summary: Join a community
     *     description: Join a community
     *     tags: ["Community"]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       $ref: '#/components/requestBodies/JoinCommunitySchema'
     *     responses:
     *       200:
     *         description: Community joined successfully
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Internal server error
     */
    router.post('/:community', authenticateToken, validate(JoinCommunitySchema), async (req, res) => {
        const {community} = req.params;
        const user = req.body.userConnect.id;
        const result = await joinCommunityUseCase.joinCommunity(community, user);
        return parseError(result, res);
    });

    /**
     * @swagger
     * /api/v1/community/{community}:
     *   delete:
     *     summary: Leave a community
     *     description: Leave a community
     *     tags: ["Community"]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       $ref: '#/components/requestBodies/LeaveCommunitySchema'
     *     responses:
     *       200:
     *         description: Community left successfully
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Internal server error
     */
    router.delete('/:community', authenticateToken, validate(LeaveCommunitySchema), async (req, res) => {
        const {community} = req.params;
        const user = req.body.userConnect.id;
        const result = await leaveCommunityUseCase.leaveCommunity(community, user);
        return parseError(result, res);
    });
    return router;
}