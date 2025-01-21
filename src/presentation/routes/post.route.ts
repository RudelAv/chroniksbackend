import express from 'express';
import { authenticateToken } from "../../domain/middleware/authenticate_token";
import { CreatePostUseCase } from '../../domain/interfaces/uses-cases/post/create-post';
import { UpdatePostUseCase } from '../../domain/interfaces/uses-cases/post/update-post';
import { DeletePostUseCase } from '../../domain/interfaces/uses-cases/post/delete-post';
import { GetPostUseCase } from '../../domain/interfaces/uses-cases/post/get-post';
import { parseError } from '../../domain/utils/parse_error';
import { validate } from '../../domain/middleware/validate';
import { CreatePostSchema, UpdatePostSchema, GetPostSchema, DeletePostSchema } from '../../domain/schema/post-schema';
import { LikePostUseCase } from '../../domain/interfaces/uses-cases/post/like-post';
import { SavePostUseCase } from '../../domain/interfaces/uses-cases/post/save-post';
import { CommentPostUseCase } from '../../domain/interfaces/uses-cases/post/comment-post';
import { Request, Response } from "express";



export default function PostRouter(
    createPostUseCase: CreatePostUseCase,
    updatePostUseCase: UpdatePostUseCase,
    deletePostUseCase: DeletePostUseCase,
    getPostUseCase: GetPostUseCase,
    likePostUseCase: LikePostUseCase,
    commentPostUseCase: CommentPostUseCase,
    savePostUseCase: SavePostUseCase
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

    router.delete('/:id', authenticateToken, async (req, res) => {
        const post_id = req.params.id;
        const result = await deletePostUseCase.deletePost(post_id);
        return parseError(result, res);
    });

    router.get('/:id', authenticateToken, async (req, res) => {
        const post_id = req.params.id;
        const result = await getPostUseCase.getPost(post_id);
        return parseError(result, res);
    });

    router.get('/', authenticateToken, async (req: Request, res: Response) => {
        const user_id = req.body.userConnect?.id || null;
        const result = await getPostUseCase.getAllPosts();
        return parseError(result, res);
    });

    router.post('/:id/like', authenticateToken, async (req: Request, res: Response) => {
        const post_id = req.params.id;
        const user_id = req.body.userConnect.id;
        const result = await likePostUseCase.likePost(post_id, user_id);
        return parseError(result, res);
    });

    router.post('/:id/comment', authenticateToken, async (req: Request, res: Response) => {
        const post_id = req.params.id;
        const user_id = req.body.userConnect.id;
        const comment = {
            content: req.body.content,
            user: user_id
        };
        const result = await commentPostUseCase.commentPost(post_id, comment as any);
        return parseError(result, res);
    });

    router.post('/:id/save', authenticateToken, async (req: Request, res: Response) => {
        const post_id = req.params.id;
        const user_id = req.body.userConnect.id;
        const result = await savePostUseCase.savePost(post_id, user_id);
        return parseError(result, res);
    });

    

    return router;
}   