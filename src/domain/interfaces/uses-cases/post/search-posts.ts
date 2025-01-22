
export interface SearchPostsUseCase {
    searchPosts(query: string, tags?: string[]): any;
} 