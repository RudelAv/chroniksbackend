export interface GetCommunityUseCase {
    getCommunityById(community_id: string): any;
    getCommunities(): any;
    getPostByCommunity(community_id: string): any;
}