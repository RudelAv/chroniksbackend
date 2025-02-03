import { GetCommunityUseCase } from "../../interfaces/uses-cases/community/get-community";
import { CommunityRepository } from "../../interfaces/repositories/community-repository";

export class GetCommunityUseCaseImplementation implements GetCommunityUseCase {

    constructor(private communityRepository: CommunityRepository) {}

    async getCommunityById(community_id: string) {
        return await this.communityRepository.getCommunityById(community_id);
    }
    async getCommunities() {
        return await this.communityRepository.getCommunities();
    }
}