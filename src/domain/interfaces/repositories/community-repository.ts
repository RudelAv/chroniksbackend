import { Community } from "../../entities/Community";

export interface CommunityRepository {
    createCommunity(community: Community, creator: String): any;
    joinCommunity(community: string, user: String): any;
    leaveCommunity(community: string, user: String): any;
}