import { User } from "../../entities/User";
import { ProfileRepository } from "../../interfaces/repositories/profile-repository";
import { EditProfileUseCase } from "../../interfaces/uses-cases/profile/edit-profile";

export class Profile implements EditProfileUseCase {
    private profileRepository: ProfileRepository;

    constructor(profileRepository: ProfileRepository) {
        this.profileRepository = profileRepository;
    }

    async updateProfile(user: User, imageUrl: String){
        return await this.profileRepository.editProfile(user, imageUrl);
    }

}