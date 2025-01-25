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
import multer from 'multer';
import cloudinary from "../../../cloudinary.config";
import fs from 'fs';
import { GetPostAuthorUseCase } from '../../domain/interfaces/uses-cases/post/get-post-author';
import { DislikePostUseCase } from '../../domain/interfaces/uses-cases/post/dislike-post';
import { SearchPostsUseCase } from '../../domain/interfaces/uses-cases/post/search-posts';
import { GetBestPostUseCase } from '../../domain/interfaces/uses-cases/post/get-best-post';
import { GetAllPostByUserUseCase } from '../../domain/interfaces/uses-cases/post/get-all-post-by-user';



export default function PostRouter(
    createPostUseCase: CreatePostUseCase,
    updatePostUseCase: UpdatePostUseCase,
    deletePostUseCase: DeletePostUseCase,
    getPostUseCase: GetPostUseCase,
    likePostUseCase: LikePostUseCase,
    commentPostUseCase: CommentPostUseCase,
    savePostUseCase: SavePostUseCase,
    getPostAuthorUseCase: GetPostAuthorUseCase,
    dislikePostUseCase: DislikePostUseCase,
    searchPostsUseCase: SearchPostsUseCase,
    getBestPostsUseCase: GetBestPostUseCase,
    getPostByUserUseCase: GetAllPostByUserUseCase
) {
    const router = express.Router();
    const upload = multer({ dest: 'uploads/' });


    router.get('/search', authenticateToken, async (req: Request, res: Response) => {
        const query = req.query.q as string || '';
        const tags = req.query.tags ? (req.query.tags as string).split(',') : undefined;
        const user_id = req.body.userConnect.id;
        
        const result = await searchPostsUseCase.searchPosts(query, tags, user_id);
        return parseError(result, res);
    });

    router.get('/best', async (req: Request, res: Response) => {
        const result = await getBestPostsUseCase.getBestPosts();
        return parseError(result, res);
    });

    router.post('/', upload.fields([{ name: 'imagePreview', maxCount: 1 }]), authenticateToken, validate(CreatePostSchema), async (req, res) => {
        const user_id = req.body.userConnect.id;
        
        const files = req.files as { [fieldname: string]: Express.Multer.File[] };
        const imagePreviewFile = files?.imagePreview || [];
        
        let imageUrl = null;
        if (imagePreviewFile.length > 0) {
            try {
                const timestamp = Math.round(Date.now() / 1000) + 3600;
                const result = await cloudinary.uploader.upload(imagePreviewFile[0].path, {
                    resource_type: 'image',
                    folder: 'chroniks/posts/previews',
                    timestamp: timestamp
                });
                fs.unlinkSync(imagePreviewFile[0].path);
                imageUrl = result.secure_url;
            } catch (error) {
                console.error(error);
            }
        }

        const post = {
            title: req.body.title,
            content: req.body.content,
            author: user_id,
            likes: [],
            comments: [],
            tags: req.body.tags,
            imagePreview: imageUrl
        };
        
        const result = await createPostUseCase.createPost(post as any);
        return parseError(result, res);
    });

    router.get('/user/:id', authenticateToken, async (req: Request, res: Response) => {
        const user_id = req.params.id;
        const result = await getPostByUserUseCase.getAllPostByUser(user_id);
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
        const user_id = req.body.userConnect.id;
        const result = await getPostUseCase.getPost(post_id, user_id);
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

    router.get('/:id/author', authenticateToken, async (req: Request, res: Response) => {
        const post_id = req.params.id;
        const result = await getPostAuthorUseCase.getPostAuthor(post_id);
        return parseError(result, res);
    });

    router.delete('/:id/dislike', authenticateToken, async (req: Request, res: Response) => {
        const post_id = req.params.id;
        const user_id = req.body.userConnect.id;
        const result = await dislikePostUseCase.dislikePost(post_id, user_id);
        return parseError(result, res);
    });

    return router;
}   