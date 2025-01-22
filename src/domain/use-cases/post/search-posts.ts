import { PostRepository } from "../../interfaces/repositories/post-repository";
import { SearchPostsUseCase } from "../../interfaces/uses-cases/post/search-posts";

export class SearchPosts implements SearchPostsUseCase {
    private postRepository: PostRepository;

    constructor(postRepository: PostRepository) {
        this.postRepository = postRepository;
    }

    async searchPosts(query: string, tags?: string[]) {
        return await this.postRepository.searchPosts(query, tags);
    }
} 