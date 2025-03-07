import { Comments } from "../../entities/Comment";
import { Post } from "../../entities/Post";

export interface PostRepository{
    createPost(post: Post): any;
    getPost(post_id: string, user_id: string): any;
    deletePost(post_id: string): any;
    updatePost(post_id: string, post: Post): any;
    getAllPosts(): any;
    likePost(post_id: string, user_id: string): any;
    dislikePost(post_id: string, user_id: string): any;
    savePost(post_id: string, user_id: string): any;
    commentPost(post_id: string, comment: Comments): any;
    getPostAuthor(postId: string): any;
    searchPosts(query: string, tags?: string[], user_id?: string): any;
    getBestPosts(): any;
    getAllPostsByUser(user_id: string): any;
    getUserHistory(user_id: string): any;
    getSavedPosts(user_id: string): any;
    unsavePost(post_id: string, user_id: string): any;
}