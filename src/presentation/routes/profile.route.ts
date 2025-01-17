import express from 'express';
import multer from 'multer';
import { authenticateToken } from "../../domain/middleware/authenticate_token";
import cloudinary from "../../../cloudinary.config"
import { parseError } from "../../domain/utils/parse_error";
import { EditProfileUseCase } from '../../domain/interfaces/uses-cases/profile/edit-profile';
import fs from 'fs'

const bodyParser = require('body-parser');
export default function ProfileRouter(
    profileUseCase: EditProfileUseCase
) {
    const router = express.Router();
    const upload = multer({ dest: 'uploads/' });

    router.use(bodyParser.json());
    router.use(bodyParser.urlencoded({ extended: true }));

    router.put('/', upload.fields([{ name: 'avatar', maxCount: 1 }]), authenticateToken, async (req, res) => {
        const user_id = req.body.userConnect.id;

        const files = req.files as { [fieldname: string]: Express.Multer.File[] };
        const profileImageFile = files?.avatar || [];

        const imageUrl = (
            await Promise.all(
                profileImageFile.map(async (file) => {
                    try {
                        const result = await cloudinary.uploader.upload(file.path, {
                            resource_type: 'image',
                            folder: 'chroniks/users/avatar'
                        });
                        fs.unlinkSync(file.path);
                        return result.secure_url;
                    } catch (error) {
                        console.error (error)
                    }
                })
            )
        )[0];
        const user = {
            id: user_id,
            name: req.body.name,
            bio: req.body.bio,
        };
        const result = await profileUseCase.updateProfile(user as any, imageUrl as any)
        return parseError(result, res)
    })

    return router;
}


