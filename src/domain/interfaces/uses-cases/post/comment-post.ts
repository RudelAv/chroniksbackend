import { Comments } from "../../../entities/Comment";

export interface CommentPostUseCase {
    commentPost(post_id: string, comment: Comments): any;
}
