import { Post } from "../../../entities/Post";

export interface CreatePostUseCase {
    createPost(communityId: string, post: Post): any
}