import { UpdatePostUseCase } from "../../interfaces/uses-cases/post/update-post";
import { PostRepository } from "../../interfaces/repositories/post-repository";
import { Post } from "../../entities/Post";

export class UpdatePost implements UpdatePostUseCase {
    private postRepository: PostRepository;

    constructor(postRepository: PostRepository) {
        this.postRepository = postRepository;
    }

    async updatePost(post_id: string, post: Post) {
        return await this.postRepository.updatePost(post_id, post);
    }
}   