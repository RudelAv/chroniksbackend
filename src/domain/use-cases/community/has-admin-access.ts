import { HasAdminAccessUseCase } from "../../interfaces/uses-cases/community/has-admin-access";
import { CommunityRepository } from "../../interfaces/repositories/community-repository";

export class HasAdminAccessUseCaseImplementation implements HasAdminAccessUseCase {
    constructor(private communityRepository: CommunityRepository) {}
    async hasAdminAccess(communityId: string, userId: String) {
        return this.communityRepository.hasAdminAccess(communityId, userId);
    }
    
}