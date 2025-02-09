import express from 'express';
import { CreateCommunityUseCase } from '../../domain/interfaces/uses-cases/community/create-community';
import { JoinCommunityUseCase } from '../../domain/interfaces/uses-cases/community/join-community';
import { parseError } from '../../domain/utils/parse_error';
import { authenticateToken } from '../../domain/middleware/authenticate_token';
import { validate } from '../../domain/middleware/validate';
import { CreateCommunitySchema, GetCommunitySchema, JoinCommunitySchema, LeaveCommunitySchema } from '../../domain/schema/community-schema';
import { LeaveCommunityUseCase } from '../../domain/interfaces/uses-cases/community/leave-community';
import multer from 'multer';
import cloudinary from '../../../cloudinary.config';
import fs from 'fs';
import { GetCommunityUseCase } from '../../domain/interfaces/uses-cases/community/get-community';
import { CreateEventUseCase } from '../../domain/interfaces/uses-cases/event/create-event';
import { RegisterUnregisterEventUseCase } from '../../domain/interfaces/uses-cases/event/register-unregister-event';


export default function CommunityRouter(
    createCommunityUseCase: CreateCommunityUseCase,
    joinCommunityUseCase: JoinCommunityUseCase,
    leaveCommunityUseCase: LeaveCommunityUseCase,
    getCommunityUseCase: GetCommunityUseCase,
    createEventUseCase: CreateEventUseCase,
    registerUnregisterEventUseCase: RegisterUnregisterEventUseCase,
) {
    const router = express.Router();
    const upload = multer({ dest: 'uploads/' });

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
    router.post('/', upload.fields([{name: 'image'}]),authenticateToken, validate(CreateCommunitySchema), async (req, res) => {
        // const community = req.body;
        const files = req.files as { [fieldname: string]: Express.Multer.File[] };
        const image = files?.image || [];

        let imageUrl = null;
        if (image.length > 0) {
            try {
            const timestamp = Math.round(Date.now() / 1000) + 3600;

                const result = await cloudinary.uploader.upload(image[0].path, {
                    resource_type: 'image',
                    folder: 'community/imagePreview',
                    timestamp: timestamp,
                    public_id: `${timestamp}-${image[0].originalname}`,
                });
                fs.unlinkSync(image[0].path);
                imageUrl = result.secure_url;
            } catch (error: any) {
                return res.status(500).json({ error: error.message });
            }
        }
        
        const community = { ...req.body, image: imageUrl };
        console.log("dans le router", community)
        const result = await createCommunityUseCase.createCommunity(community, req.body.userConnect.id);
        return parseError(result, res);
    });

    /**
     * @swagger
     * /api/v1/community/{community}/join:
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
    router.post('/:community/join', authenticateToken, validate(JoinCommunitySchema), async (req, res) => {
        const {community} = req.params;
        const user = req.body.userConnect.id;
        const result = await joinCommunityUseCase.joinCommunity(community, user);
        return parseError(result, res);
    });

    /**
     * @swagger
     * /api/v1/community:
     *   get:
     *     summary: Get all communities
     *     description: Get all communities
     *     tags: ["Community"]
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Communities retrieved successfully
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Internal server error
     */
    router.get('/', authenticateToken, async(req, res) => {
        const result = await getCommunityUseCase.getCommunities();
        return parseError(result, res);
    });

    /**
     * @swagger
     * /api/v1/community/{community}/event:
     *   post:
     *     summary: Create an event in a community
     *     description: Create an event in a community
     *     tags: ["Community"]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       $ref: '#/components/requestBodies/CreateEventSchema'
     *     parameters:
     *       - name: community
     *         in: path
     *         description: The id of the community
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Event created successfully
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Internal server error
     */
    router.post('/:community/event', authenticateToken, async(req, res) => {
        const event  = {
            title: req.body.title,
            description: req.body.description,
            date: req.body.date,
            location: req.body.location,
            organizer: req.body.userConnect.id,
            image: req.body.image,
            tags: req.body.tags
        };
        console.log(req.params.community, event);
        const result = await createEventUseCase.createEvent(req.params.community, event as any);
        return parseError(result, res);
    })

    /**
     * @swagger
     * /api/v1/community/{community}/event/{event}/register:
     *   post:
     *     summary: Register to an event
     *     description: Register to an event
     *     tags: ["Community"]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - name: community
     *         in: path
     *         description: The id of the community
     *         required: true
     *         type: string
     *       - name: event
     *         in: path
     *         description: The id of the event
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Registration successful
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Internal server error
     */
    router.post('/:community/event/:event/register', authenticateToken, async(req, res) => {
        const result = await registerUnregisterEventUseCase.registerEvent(req.params.community, req.params.event, req.body.userConnect.id);
        return parseError(result, res);
    })

    /**
     * @swagger
     * /api/v1/community/{community}/event/{event}/unregister:
     *   post:
     *     summary: Unregister from an event
     *     description: Unregister from an event
     *     tags: ["Community"]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - name: community
     *         in: path
     *         description: The id of the community
     *         required: true
     *         type: string
     *       - name: event
     *         in: path
     *         description: The id of the event
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Unregistration successful
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Internal server error
     */
    router.delete('/:community/event/:event/unregister', authenticateToken, async(req, res) => {
        const result = await registerUnregisterEventUseCase.unregisterEvent(req.params.community, req.params.event, req.body.userConnect.id);
        return parseError(result, res);
    })

    /**
     * @swagger
     * /api/v1/community/{community}:
     *   get:
     *     summary: Get a community
     *     description: Get a community
     *     tags: ["Community"]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - name: community
     *         in: path
     *         description: The id of the community
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Community retrieved successfully
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Internal server error
     */
    router.get('/:community', authenticateToken, validate(GetCommunitySchema), async (req, res) => {
        const {community} = req.params;
        console.log(community);
        const result = await getCommunityUseCase.getCommunityById(community);
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