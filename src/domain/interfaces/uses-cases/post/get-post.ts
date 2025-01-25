export interface GetPostUseCase {
    getPost(post_id: string, user_id: string): any;
    getAllPosts(): any;
}