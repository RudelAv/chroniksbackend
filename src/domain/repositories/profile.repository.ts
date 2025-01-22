import { User } from "../entities/User";
import { UserModel } from "../../../mongoose/models/User";
import { ProfileRepository } from "../interfaces/repositories/profile-repository";

export class ProfileRepositoryIMplementation implements ProfileRepository {
    async getUserInfo(user_id: string) {
        try {
            return await UserModel.findById(user_id);
        } catch (error:any) {
            return error.code;
        }
    }
    async editProfile(user: User, imageUrl: String) {
        try {
            if (imageUrl) {
                const result = await UserModel.findByIdAndUpdate(user.id, {
                    image: imageUrl,
                })
            } 
            let result = await UserModel.findByIdAndUpdate(user.id, {
                name: user.name,
                bio: user.bio,
            })

            result = await UserModel.findById(user.id);
            return {
                name: result?.name,
                bio: result?.bio,
                image: result?.image,
            };
        } catch (error:any) {
            return error.code;
        }
    }
    async getProfile(user_id: string) {
        try {
            return await UserModel.findById(user_id);
        } catch (error:any) {
            return error.code;
            
        }
    }
    async deleteProfile(user_id: string) {
        throw new Error("Method not implemented.");
    }
    
}