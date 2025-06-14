export interface User {
  id: string;
  name: string;
  avatarUrl?: string;
  occupation: string;
  planet: string;
}

export interface Post {
  id: string;
  authorId: string;
  content: string;
  timestamp: string;
  imageUrl?: string;
}

export interface Friend {
  userId: string;
  friendId: string;
}
