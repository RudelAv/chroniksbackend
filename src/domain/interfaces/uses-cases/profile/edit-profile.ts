import { User } from "../../../entities/User";

export interface EditProfileUseCase {
    updateProfile(user: User, imageUrl: String): any;
}