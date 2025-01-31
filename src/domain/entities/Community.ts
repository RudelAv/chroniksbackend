import { User } from "./User";
import { Post } from "./Post";

export interface CommunityMessage {
  user: string | User;
  content: string;
  likes: (string | User)[];
}

export interface EventComment {
  user: string | User;
  content: string;
  createdAt: Date;
}

export interface CommunityEvent {
  title: string;
  description?: string;
  date: Date;
  location: {
    type: "online" | "physical";
    address?: string; // URL ou adresse physique
  };
  organizer: string | User;
  image?: string;
  registrations: (string | User)[];
  tags?: string[];
  comments: EventComment[];
}

export interface Community {
  _id: string;
  name: string;
  description: string;
  image: string;
  creator: string | User;
  members: (string | User)[];
  admins: (string | User)[];
  messages: CommunityMessage[];
  events: CommunityEvent[];
  posts: (string | Post)[];
}