export interface Post {
  id: string;
  title: string;
  content: string;
  imagePreview: string;
  author: string;
  likes?: string[];
  comments?: {
    user: string;
    content: string;
    createdAt: Date;
  }[];
  tags?: string[];
}

export type PostInput = Omit<Post, 'id' | 'createdAt' | 'updatedAt'>;