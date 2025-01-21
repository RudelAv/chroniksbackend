import { Comments } from "../../entities/Comment";
import { PostRepository } from "../../interfaces/repositories/post-repository";

import { CommentPostUseCase } from "../../interfaces/uses-cases/post/comment-post";

export class CommentPost implements CommentPostUseCase {
    private postRepository: PostRepository;

    constructor(postRepository: PostRepository) {
        this.postRepository = postRepository;
    }
    async commentPost(post_id: string, comment: Comments) {
        return await this.postRepository.commentPost(post_id, comment);
    }
}