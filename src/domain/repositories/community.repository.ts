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
                    category: community.category,
                    image: community.image,
                    creator: creator,
                    members: [creator],
                    admins: [creator],
                }
            );
        } catch (error: any) {
            return '11000';
        }
    }

    async joinCommunity(community: string, user: String) {
        return await CommunityModel.findByIdAndUpdate(community, { $addToSet: { members: user } });
    }

    async leaveCommunity(community: string, user: String) {
        return await CommunityModel.findByIdAndUpdate(community, { $pull: { members: user } });
    }

    async getCommunityById(communityId: string) {
        try {
            return await CommunityModel.findById(communityId).populate('creator', 'name image');
        } catch (error: any) {
            return error.code;
        }
    }   
    async getCommunities() {
        try {
            return await CommunityModel.find({})
                .populate('creator', 'name image');
        } catch (error: any) {
            return error.code;
        }
    }
    async updateCommunity(communityId: string, community: Community) {
        try {
            return await CommunityModel.findByIdAndUpdate(communityId, community);
        } catch (error: any) {
            return error.code;
        }
    }
    async deleteCommunity(communityId: string) {
        try {
            return await CommunityModel.findByIdAndUpdate(communityId, { deleted: true });
        } catch (error: any) {
            return error.code;
        }
    }
}