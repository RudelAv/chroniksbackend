import express from 'express';
import { CreateCommunityUseCase } from '../../domain/interfaces/uses-cases/community/create-community';
import { parseError } from '../../domain/utils/parse_error';
import { authenticateToken } from '../../domain/middleware/authenticate_token';
import { validate } from '../../domain/middleware/validate';
import { CreateCommunitySchema } from '../../domain/schema/community-schema';

export default function CommunityRouter(
    createCommunityUseCase: CreateCommunityUseCase
) {
    const router = express.Router();
    router.post('/', authenticateToken, validate(CreateCommunitySchema), async (req, res) => {
        const community = req.body;
        console.log("dans le router",community);
        const result = await createCommunityUseCase.createCommunity(community, req.body.userConnect.id);
        return parseError(result, res);
    });
    return router;
}