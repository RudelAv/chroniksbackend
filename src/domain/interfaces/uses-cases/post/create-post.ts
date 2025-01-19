import { Post } from "../../../entities/Post";

export interface CreatePostUseCase {
    createPost(post: Post): any;
}