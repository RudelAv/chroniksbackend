import { GetPostUseCase } from "../../interfaces/uses-cases/post/get-post";
import { PostRepository } from "../../interfaces/repositories/post-repository";

export class GetPost implements GetPostUseCase {
    private postRepository: PostRepository;

    constructor(postRepository: PostRepository) {
        this.postRepository = postRepository;
    }
    async getPost(post_id: string) {
        return await this.postRepository.getPost(post_id);
    }
}