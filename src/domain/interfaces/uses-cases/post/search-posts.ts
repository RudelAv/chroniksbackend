
export interface SearchPostsUseCase {
    searchPosts(query: string, tags?: string[], user_id?: string): any;
} 