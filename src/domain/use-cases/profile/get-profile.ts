import { ProfileRepository } from "../../interfaces/repositories/profile-repository";
import { GetProfileUseCase } from "../../interfaces/uses-cases/profile/get-profile";

export class GetProfile implements GetProfileUseCase {
    private profileRepository: ProfileRepository;

    constructor(profileRepository: ProfileRepository) {
        this.profileRepository = profileRepository;
    }

    async getProfile(user_id: string){
        return await this.profileRepository.getProfile(user_id);
    }
}