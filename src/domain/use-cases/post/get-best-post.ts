import { PostRepository } from "../../interfaces/repositories/post-repository";
import { GetBestPostUseCase } from "../../interfaces/uses-cases/post/get-best-post";

export class GetBestPosts implements GetBestPostUseCase {
    constructor(private postRepository: PostRepository) {}

    async getBestPosts() {
        return this.postRepository.getBestPosts();
    }
}