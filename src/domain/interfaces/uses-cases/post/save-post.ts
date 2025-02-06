export interface SavePostUseCase {
    savePost(post_id: string, user_id: string): any;
    unsavePost(post_id: string, user_id: string): any;
    getSavedPosts(user_id: string): any;
}