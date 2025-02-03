export interface GetCommunityUseCase {
    getCommunityById(community_id: string): any;
    getCommunities(): any;
}