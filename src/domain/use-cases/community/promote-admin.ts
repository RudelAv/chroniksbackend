import { PromoteAdminUseCase } from "../../interfaces/uses-cases/community/promote-admin";
import { CommunityRepository } from "../../interfaces/repositories/community-repository";

export class PromoteAdmin implements PromoteAdminUseCase {
    constructor(private communityRepository: CommunityRepository) {}

    async promoteAdmin(communityId: string, userId: string, adminId: string) {
        return this.communityRepository.makeAdmin(communityId, userId, adminId);
    }
}