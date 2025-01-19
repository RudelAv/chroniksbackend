import { CreatePostUseCase } from "../../interfaces/uses-cases/post/create-post";
import { PostRepository } from "../../interfaces/repositories/post-repository";
import { Post } from "../../entities/Post";

export class CreatePost implements CreatePostUseCase {
    postRepository: PostRepository;

    constructor(postRepository: PostRepository) {
        this.postRepository = postRepository;
    }

    async createPost(post: Post) {
        return await this.postRepository.createPost(post);
    }
}