export interface User {
    id: string;
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