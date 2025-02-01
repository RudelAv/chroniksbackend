import { CommunityRepository } from "../interfaces/repositories/community-repository";
import { Community } from "../entities/Community";
import { CommunityModel } from "../../../mongoose/models/Communities";

export class CommunityRepositoryImplementation implements CommunityRepository {
    async createCommunity(community: Community, creator: String) {
        console.log("dans le repository",community, creator);
        try {
            return await CommunityModel.create(
                {
                    name: community.name,
                    description: community.description,
                    image: community.image,
                    creator: creator,
                }
            );
        } catch (error: any) {
            return error.message;
        }
    }

    async joinCommunity(community: string, user: String) {
        return await CommunityModel.findByIdAndUpdate(community, { $addToSet: { members: user } });
    }

    async leaveCommunity(community: string, user: String) {
        return await CommunityModel.findByIdAndUpdate(community, { $pull: { members: user } });
    }
}