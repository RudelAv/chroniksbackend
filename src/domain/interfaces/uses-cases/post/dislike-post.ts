export interface DislikePostUseCase {
    dislikePost(post_id: string, user_id: string): any;
}