import { Community } from "../../entities/Community";
import { Post } from "../../entities/Post";
export interface CommunityRepository {
    createCommunity(community: Community, creator: String): any;
    joinCommunity(community: string, user: String): any;
    leaveCommunity(community: string, user: String): any;
    getCommunityById(communityId: string): any;
    getCommunities(): any;
    updateCommunity(communityId: string, community: Community): any;
    deleteCommunity(communityId: string): any;
    createPost(communityId: string, post: Post): any;
}