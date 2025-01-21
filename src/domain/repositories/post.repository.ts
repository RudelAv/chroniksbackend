import { Post } from "../entities/Post";
import { PostModel } from "../../../mongoose/models/Post";
import { PostRepository } from "../interfaces/repositories/post-repository";
import { Types } from "mongoose";
import { UserModel } from "../../../mongoose/models/User";
import { Comments } from "../entities/Comment";

export class PostRepositoryImplementation implements PostRepository {
    async getAllPosts() {
        try {
            return await PostModel.find();
        } catch (error: any) {
            return error.code
        }
    }
    async likePost(post_id: string, user_id: string) {
        try {
            const post = await PostModel.findById(post_id);
            if (!post) {
                return 'P2005';
            }
            
            if (post.likes.some(id => id.toString() === user_id)) {
                return 'P2006';
            }
            
            post.likes.push(new Types.ObjectId(user_id));
            return await post.save();
        } catch (error: any) {
            return error.code;
        }
    }
    async savePost(post_id: string, user_id: string) {
        try {
            const user = await UserModel.findById(user_id);
            if (!user) {
                return 'P2005';
            }

            const post = await PostModel.findById(post_id);
            if (!post) {
                return 'P2005'; 
            }

            if (user.savedPosts.some(id => id.toString() === post_id)) {
                return 'P2008';
            }

            user.savedPosts.push(new Types.ObjectId(post_id));
            return await user.save();
        } catch (error: any) {
            return error.code;
        }
    }
    async commentPost(post_id: string, comment: Comments) {
        try {
            const post = await PostModel.findById(post_id);
            if (!post) {
                return 'P2005';
            }
            console.log(comment);
            post.comments.push({
                content: comment.content,
                user: new Types.ObjectId(comment.user),
                createdAt: new Date()
            });
            return await post.save();
        } catch (error: any) {
            return error.code;
        }
    }
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
            return await PostModel.findByIdAndUpdate(post_id, {
                deleted: true
            });
        } catch (error:any) {
            return error.code;
        }
    }
}