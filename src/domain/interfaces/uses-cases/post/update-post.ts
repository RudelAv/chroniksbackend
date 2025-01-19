import { Post } from "../../../entities/Post";

export interface UpdatePostUseCase {
    updatePost(post_id: string, post: Post): any;
}