import { CommunityRepository } from "../interfaces/repositories/community-repository";
import { Community, CommunityEvent } from "../entities/Community";
import { CommunityModel } from "../../../mongoose/models/Communities";
import { Post } from "../entities/Post";
import { PostModel } from "../../../mongoose/models/Post";

export class CommunityRepositoryImplementation implements CommunityRepository {
    async getPostByCommunity(communityId: string) {
        try {
            return await CommunityModel.findById(communityId).populate({
                path: 'posts',
                populate: {
                    path: 'author',
                    model: 'User',
                    select: 'name image'
                }
            });
        } catch (error: any) {
            return error.code;
        }
    }
    async createPost(communityId: string, post: Post) {
        try {
            const newPost = await PostModel.create(post);
            const community = await CommunityModel.findByIdAndUpdate(communityId, { $push: { posts: newPost._id } });
            return newPost;
        } catch (error : any) {
            return error.code;
        }
    }
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
            return await CommunityModel.findById(communityId)
                .populate('creator', 'name image')
                .populate('admins', 'name image')
                .populate('members', 'name image');
        } catch (error: any) {
            return error.code;
        }
    }   
    async getCommunities() {
        try {
            return await CommunityModel.find({ deleted: false })
                .populate('creator', 'name image')
                .populate('admins', 'name image')
                .populate('members', 'name image');
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

    async makeAdmin(communityId: string, user: String, userId: String) {
        const community = await CommunityModel.findById(communityId);
        if (!community) {
            return 'P2005';
        }

        if (!community.admins.some(admin => admin.toString() === userId.toString())) {
            return 'P2007';
        }

        return await CommunityModel.findByIdAndUpdate(communityId, { $addToSet: { admins: user } });
    }
    async removeAdmin(communityId: string, userId: String,user: String) {
        const community = await CommunityModel.findById(communityId);
        if (!community) {
            return 'P2005';
        }

        if (!community.admins.some(admin => admin.toString() === userId.toString())) {
            return 'P2007';
        }

        return await CommunityModel.findByIdAndUpdate(communityId, { $pull: { admins: user } });
    }

    async hasAdminAccess(communityId: string, userId: String) {
        const community = await CommunityModel.findById(communityId);
        if (!community) {
            return 'P2005';
        }

        if (!community.admins.some(admin => admin.toString() === userId.toString())) {
            return 'P2007';
        }

        return true;
    }

    async getCommunityMembers(communityId: string, limit: number, skip: number) {
        const community = await CommunityModel.findById(communityId).populate({
            path: 'members',
            select: 'name image bio',
            options: {
                skip,
                limit,
            },
        });
        if (!community) {
            return 'P2005';
        }
        return {
            members: community.members,
            total: community.members.length
        };
    }
}