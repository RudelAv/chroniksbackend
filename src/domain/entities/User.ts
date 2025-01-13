export interface User {
    name: string;
    email: string;
    password: string;
    provider: 'email' | 'google';
    image: string;
    bio: string;
    savedPosts: string[];
    createdAt: Date;
    updatedAt: Date;
}