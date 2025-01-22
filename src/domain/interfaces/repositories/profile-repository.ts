import { User } from "../../entities/User";

export interface ProfileRepository {
    editProfile(user: User, file: String): any;
    getProfile(user_id: string): any;
    deleteProfile(user_id: string): any;
    getUserInfo(user_id: string): any;
}