import { Community } from "../../entities/Community";

export interface CommunityRepository {
    createCommunity(community: Community, creator: String): any;
}