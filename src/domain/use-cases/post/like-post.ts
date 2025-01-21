import { PostRepository } from "../../interfaces/repositories/post-repository";

import { LikePostUseCase } from "../../interfaces/uses-cases/post/like-post";

export class LikePost implements LikePostUseCase {
    private postRepository: PostRepository;

    constructor(postRepository: PostRepository) {
        this.postRepository = postRepository;
    }
    async likePost(post_id: string, user_id: string) {
        return await this.postRepository.likePost(post_id, user_id);
    }
}