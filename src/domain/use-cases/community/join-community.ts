import { CommunityRepository } from "../../interfaces/repositories/community-repository";
import { JoinCommunityUseCase } from "../../interfaces/uses-cases/community/join-community";
export class JoinCommunityUseCaseImplementation implements JoinCommunityUseCase {
    constructor(private communityRepository: CommunityRepository) {}

    async joinCommunity(community: string, user: String) {
        return await this.communityRepository.joinCommunity(community, user);
    }
}