import { ProfileRepository } from "../../interfaces/repositories/profile-repository";
import { deleteProfileUseCase } from "../../interfaces/uses-cases/profile/delete-profile";

export class Profile implements deleteProfileUseCase {
    private profileRepository: ProfileRepository;

    constructor(profileRepository: ProfileRepository) {
        this.profileRepository = profileRepository;
    }

    async deleteProfile(user_id: string){
        return await this.profileRepository.deleteProfile(user_id);
    }
}