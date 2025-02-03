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


    /**
     * @swagger
     * /api/v1/post:
     *   post:
     *     summary: Create a post
     *     description: Create a post
     *     tags: ["Posts"]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       $ref: '#/components/requestBodies/CreatePostSchema'
     *     responses:
     *       200:
     *         description: Post created successfully
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Internal server error
     *       400:
     *         description: Bad request
     */
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


    /**
     * @swagger
     * /api/v1/post/search:
     *   get:
     *     summary: Search posts
     *     description: Search posts
     *     parameters:
     *       - name: q
     *         in: query
     *         description: The query to search for
     *         required: true
     *         type: string
     *     tags: ["Posts"]
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Posts searched successfully
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Internal server error
     *       400:
     *         description: Bad request
     *       404:
     *         description: Posts not found     
     */
    router.get('/search', authenticateToken, async (req: Request, res: Response) => {
        const query = req.query.q as string || '';
        const tags = req.query.tags ? (req.query.tags as string).split(',') : undefined;
        const user_id = req.body.userConnect.id;
        
        const result = await searchPostsUseCase.searchPosts(query, tags, user_id);
        return parseError(result, res);
    });

    /**
     * @swagger
     * /api/v1/post/best:
     *   get:
     *     summary: Get best posts
     *     description: Get best posts
     *     tags: ["Posts"]
     *     security:
     *       - bearerAuth: []

     *     responses:
     *       200:
     *         description: Best posts retrieved successfully
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Internal server error
     *       400:
     *         description: Bad request
     */
    router.get('/best', async (req: Request, res: Response) => {
        const result = await getBestPostsUseCase.getBestPosts();
        return parseError(result, res);
    });

    /** 
     * @swagger
     * /api/v1/post/user/{id}:
     *   get:
     *     summary: Get posts by user
     *     description: Get posts by user
     *     tags: ["Posts"]
     *     parameters:
     *       - name: id
     *         in: path
     *         description: The id of the user
     *         required: true
     *         type: string
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Posts retrieved successfully
     *       401:
     *         description: Unauthorized    
     *       500:
     *         description: Internal server error
     *       400:
     *         description: Bad request
    */
    router.get('/user/:id', authenticateToken, async (req: Request, res: Response) => {
        const user_id = req.params.id;
        const result = await getPostByUserUseCase.getAllPostByUser(user_id);
        return parseError(result, res);
    });

    /**
     * @swagger
     * /api/v1/post/{id}:
     *   put:
     *     summary: Update a post
     *     description: Update a post
     *     tags: ["Posts"]
     *     requestBody:
     *       $ref: '#/components/requestBodies/UpdatePostSchema'
     *     parameters:
     *       - post_id:
     *         in: path
     *         description: The id of the post to update
     *         required: true
     *         type: string

     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Post updated successfully


     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Internal server error
     *       400:
     *         description: Bad request
     */
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

    /**
     * @swagger
     * /api/v1/post/{id}:
     *   delete:
     *     summary: Delete a post
     *     description: Delete a post
     *     tags: ["Posts"]
     *     parameters:
     *       - id:
     *         in: path
     *         description: The id of the post to delete
     *         required: true
     *         type: string
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Post deleted successfully
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Internal server error
     *       400:
     *         description: Bad request
     */
    router.delete('/:id', authenticateToken, async (req, res) => {
        const post_id = req.params.id;
        const result = await deletePostUseCase.deletePost(post_id);
        return parseError(result, res);
    });


    /**
     * @swagger
     * /api/v1/post/{id}:
     *   get:
     *     summary: Get a post
     *     description: Get a post
     *     tags: ["Posts"]
     *     parameters:
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Post retrieved successfully
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Internal server error
     *       400:
     *         description: Bad request
     */
    router.get('/:id', authenticateToken, async (req, res) => {
        const post_id = req.params.id;
        const user_id = req.body.userConnect.id;
        const result = await getPostUseCase.getPost(post_id, user_id);
        return parseError(result, res);
    });


    /**
     * @swagger
     * /api/v1/post:
     *   get:
     *     summary: Get all posts
     *     description: Get all posts
     *     tags: ["Posts"]
     *     security:
     *       - bearerAuth: []   
     *     responses:
     *       200:
     *         description: Posts retrieved successfully
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Internal server error
     *       400:
     *         description: Bad request
     */
    router.get('/', authenticateToken, async (req: Request, res: Response) => {
        const user_id = req.body.userConnect?.id || null;
        const result = await getPostUseCase.getAllPosts();
        return parseError(result, res);
    });


    /**
     * @swagger
     * /api/v1/post/{id}/like:
     *   post:
     *     summary: Like a post
     *     description: Like a post
     *     parameters:
     *       - id:
     *         in: path
     *         description: The id of the post to like
     *         required: true
     *         type: string
     *     tags: ["Posts"]
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Post liked successfully
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Internal server error
     *       400:
     *         description: Bad request
     */
    router.post('/:id/like', authenticateToken, async (req: Request, res: Response) => {
        const post_id = req.params.id;

        const user_id = req.body.userConnect.id;
        const result = await likePostUseCase.likePost(post_id, user_id);
        return parseError(result, res);
    });


    /**
     * @swagger
     * /api/v1/post/{id}/comment:
     *   post:
     *     summary: Comment a post
     *     description: Comment a post
     *     parameters:
     *       - id:
     *         in: path
     *         description: The id of the post to comment
     *         required: true
     *         type: string
     *     requestBody:
     *       $ref: '#/components/requestBodies/CommentPostSchema'
     *     tags: ["Posts"]
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Post commented successfully
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Internal server error
     */
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

    /**
     * @swagger
     * /api/v1/post/{id}/save:
     *   post:  
     *     summary: Save a post
     *     description: Save a post
     *     tags: ["Posts"]
     *     parameters:
     *       - id:
     *         in: path
     *         description: The id of the post to save
     *         required: true
     *         type: string
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Post saved successfully
     *       401:

     *         description: Unauthorized
     *       500:
     *         description: Internal server error
     */

    router.post('/:id/save', authenticateToken, async (req: Request, res: Response) => {
        const post_id = req.params.id;
        const user_id = req.body.userConnect.id;
        const result = await savePostUseCase.savePost(post_id, user_id);
        return parseError(result, res);
    });


    /**
     * @swagger
     * /api/v1/post/{id}/author:
     *   get:
     *     summary: Get post author
     *     description: Get post author
     *     tags: ["Posts"]
     *     parameters:
     *       - id:
     *         in: path
     *         description: The id of the post to get the author
     *         required: true
     *         type: string
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Post author retrieved successfully
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Internal server error
     *       400:
     *         description: Bad request
     */
    router.get('/:id/author', authenticateToken, async (req: Request, res: Response) => {
        const post_id = req.params.id;
        const result = await getPostAuthorUseCase.getPostAuthor(post_id);
        return parseError(result, res);
    });

    /**
      * @swagger
      * /api/v1/post/{id}/dislike:
      *   delete:
      *     summary: Dislike a post
      *     description: Dislike a post
      *     tags: ["Posts"]
      *     parameters:
      *       - id:
      *         in: path
      *         description: The id of the post to dislike
      *         required: true
      *         type: string
      *     security:
      *       - bearerAuth: []
      *     responses:
      *       200:
      *         description: Post disliked successfully
      *       401:
      *         description: Unauthorized
      *       500:
      *         description: Internal server error
      *       400:
      *         description: Bad request
      */
    router.delete('/:id/dislike', authenticateToken, async (req: Request, res: Response) => {
        const post_id = req.params.id;
        const user_id = req.body.userConnect.id;
        const result = await dislikePostUseCase.dislikePost(post_id, user_id);
        return parseError(result, res);
    });


    return router;
}   