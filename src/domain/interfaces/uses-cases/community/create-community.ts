import { Community } from "../../../entities/Community";

export interface CreateCommunityUseCase {
    createCommunity: (community: Community, creator: String) => Promise<Community>;
}