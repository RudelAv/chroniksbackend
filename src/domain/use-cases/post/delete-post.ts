import { DeletePostUseCase } from "../../interfaces/uses-cases/post/delete-post";
import { PostRepository } from "../../interfaces/repositories/post-repository";

export class DeletePost implements DeletePostUseCase {
    private postRepository: PostRepository;

    constructor(postRepository: PostRepository) {
        this.postRepository = postRepository;
    }

    async deletePost(post_id: string) {
        return await this.postRepository.deletePost(post_id);
    }
}   