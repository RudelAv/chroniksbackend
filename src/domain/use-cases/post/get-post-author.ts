import { PostRepository } from "../../interfaces/repositories/post-repository";

import { GetPostAuthorUseCase } from "../../interfaces/uses-cases/post/get-post-author";

export class GetPostAuthor implements GetPostAuthorUseCase {
    private postRepository: PostRepository;

    constructor(postRepository: PostRepository) {
        this.postRepository = postRepository;
    }
    async getPostAuthor(postId: string) {
        return await this.postRepository.getPostAuthor(postId);
    }
}