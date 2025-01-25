import { GetAllPostByUserUseCase } from "../../interfaces/uses-cases/post/get-all-post-by-user";
import { PostRepository } from "../../interfaces/repositories/post-repository";

export class GetPostByUser implements GetAllPostByUserUseCase {
    constructor(private postRepository: PostRepository) {}

    async getAllPostByUser(user_id: string) {
        return await this.postRepository.getAllPostsByUser(user_id);
    }
}