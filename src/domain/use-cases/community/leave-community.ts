import { CommunityRepository } from "../../interfaces/repositories/community-repository";
import { LeaveCommunityUseCase } from "../../interfaces/uses-cases/community/leave-community";

export class LeaveCommunityUseCaseImplementation implements LeaveCommunityUseCase {
    constructor(private communityRepository: CommunityRepository) {}

    async leaveCommunity(community: string, user: String) {
        return await this.communityRepository.leaveCommunity(community, user);
    }
}