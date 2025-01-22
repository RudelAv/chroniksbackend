import { ProfileRepository } from "../../interfaces/repositories/profile-repository";

import { GetUserInfoUseCase } from "../../interfaces/uses-cases/profile/get-user-info";

export class GetUserInfo implements GetUserInfoUseCase {
    constructor(private readonly profileRepository: ProfileRepository) {}
    async getUserInfo(user_id: string) {
        return await this.profileRepository.getUserInfo(user_id);
    }
}