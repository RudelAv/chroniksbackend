import express from 'express';
import { authenticateToken } from "../../domain/middleware/authenticate_token";
import { CreatePostUseCase } from '../../domain/interfaces/uses-cases/post/create-post';
import { UpdatePostUseCase } from '../../domain/interfaces/uses-cases/post/update-post';
import { DeletePostUseCase } from '../../domain/interfaces/uses-cases/post/delete-post';
import { GetPostUseCase } from '../../domain/interfaces/uses-cases/post/get-post';
import { parseError } from '../../domain/utils/parse_error';
import { validate } from '../../domain/middleware/validate';
import { CreatePostSchema, UpdatePostSchema, GetPostSchema, DeletePostSchema } from '../../domain/schema/post-schema';
import { PostInput } from '../../domain/entities/Post';


export default function PostRouter(
    createPostUseCase: CreatePostUseCase,
    updatePostUseCase: UpdatePostUseCase,
    deletePostUseCase: DeletePostUseCase,
    getPostUseCase: GetPostUseCase
) {
    const router = express.Router();

    router.post('/', authenticateToken, validate(CreatePostSchema),async (req, res) => {
        const user_id = req.body.userConnect.id;
        const post = {
            title: req.body.title,
            content: req.body.content,
            author: user_id,
            likes: [],
            comments: [],
            tags: req.body.tags
        };
        const result = await createPostUseCase.createPost(post as any);
        return parseError(result, res);
    });

    router.put('/:id', authenticateToken, validate(UpdatePostSchema), async (req, res) => {
        const post_id = req.params.id;
        const user_id = req.body.userConnect.id;
        const post = {
            title: req.body.title,
            content: req.body.content,
            tags: req.body.tags,
            author: user_id
        };
        const result = await updatePostUseCase.updatePost(post_id, post as any);
        return parseError(result, res);
    });

    router.delete('/:id', authenticateToken, validate(DeletePostSchema), async (req, res) => {
        const post_id = req.params.id;
        const result = await deletePostUseCase.deletePost(post_id);
        return parseError(result, res);
    });

    router.get('/:id', authenticateToken, validate(GetPostSchema), async (req, res) => {
        const post_id = req.params.id;
        const result = await getPostUseCase.getPost(post_id);
        return parseError(result, res);
    });

    return router;
}   