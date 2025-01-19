import { Post } from "../entities/Post";
import { PostModel } from "../../../mongoose/models/Post";
import { PostRepository } from "../interfaces/repositories/post-repository";

export class PostRepositoryImplementation implements PostRepository {
    async updatePost(post_id: string, post: Post) {
        console.log(post, post_id);
        try {
            const existingPost = await PostModel.findById(post_id);
            if (!existingPost) {
                return { error: "Post not found" };
            }
            
            if (existingPost.author.toString() !== post.author.toString()) {
                return 'P2005';
            }

            return await PostModel.findByIdAndUpdate(post_id, {
                title: post.title,
                content: post.content,
                tags: post.tags
            });
        } catch (error:any) {
            return error.code;
        }
    }
    async createPost(post: Post) {
        try {
            console.log(post);
            return await PostModel.create({
                title: post.title,
                content: post.content,
                author: post.author,
                likes: [],
                comments: [],
                tags: post.tags
            });
        } catch (error:any) {
            return error.code;
        }
    }
    async getPost(post_id: string) {
        try {
            return await PostModel.findById(post_id);
        } catch (error:any) {
            return error.code;
        }
    }
    async deletePost(post_id: string) {
        try {
            return await PostModel.findByIdAndDelete(post_id);
        } catch (error:any) {
            return error.code;
        }
    }
}