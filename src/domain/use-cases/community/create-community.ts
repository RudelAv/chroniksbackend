import { CreateCommunityUseCase } from "../../interfaces/uses-cases/community/create-community";
import { CommunityRepository } from "../../interfaces/repositories/community-repository";
import { Community } from "../../entities/Community";

export class CreateCommunityUseCaseImplementation implements CreateCommunityUseCase {
    constructor(private readonly communityRepository: CommunityRepository) {}
    async createCommunity(community: Community, creator: String) {
        console.log("dans le use case",community);
        return await this.communityRepository.createCommunity(community, creator);
    }
}