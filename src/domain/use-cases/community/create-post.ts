import { CreatePostUseCase } from "../../interfaces/uses-cases/community/create-post";
import { Post } from "../../entities/Post";
import { CommunityRepository } from "../../interfaces/repositories/community-repository";

export class CreatePostUseCaseImplementation implements CreatePostUseCase {
    constructor(private communityRepository: CommunityRepository) {}

    createPost(communityId: string, post: Post) {
        return this.communityRepository.createPost(communityId, post);
    }
}