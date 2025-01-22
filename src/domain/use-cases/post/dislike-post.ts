import { PostRepository } from "../../interfaces/repositories/post-repository";

import { DislikePostUseCase } from "../../interfaces/uses-cases/post/dislike-post";

export class DislikePost implements DislikePostUseCase {
    constructor(private readonly postRepository: PostRepository) {}
    async dislikePost(post_id: string, user_id: string) {
        return await this.postRepository.dislikePost(post_id, user_id);
    }
}   