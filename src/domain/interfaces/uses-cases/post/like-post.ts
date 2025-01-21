export interface LikePostUseCase {
    likePost(post_id: string, user_id: string): any;
}