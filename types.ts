
export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  client?: string;
  timeline?: string;
  challenge?: string;
  solution?: string;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  longDescription?: string;
  features?: string[];
}

export interface Author {
  name: string;
  avatar: string;
  role: string;
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content?: string[];
  date: string;
  category: string;
  image: string;
  author: Author;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
