import { Post } from "../../entities/Post";

export interface PostRepository{
    createPost(post: Post): any;
    getPost(post_id: string): any;
    deletePost(post_id: string): any;
    updatePost(post_id: string, post: Post): any;
}