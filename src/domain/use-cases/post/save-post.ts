import { PostRepository } from "../../interfaces/repositories/post-repository";
import { SavePostUseCase } from "../../interfaces/uses-cases/post/save-post";
export class SavePost implements SavePostUseCase {
    private postRepository: PostRepository;

    constructor(postRepository: PostRepository) {
        this.postRepository = postRepository;
    }
    async savePost(post_id: string, user_id: string) {
        return await this.postRepository.savePost(post_id, user_id);
    }
}