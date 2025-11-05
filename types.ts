export interface Post {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  createdAt: string;
  category: string;
  views: number;
}

export interface User {
  uid: string;
  name: string;
  avatarUrl: string;
  role: 'admin' | 'user';
}

export interface SearchResult {
  query: string;
  summary: string;
  sources: {
    uri: string;
    title: string;
  }[];
}

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export interface CryptoData {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  image: string;
}

export type ChartDataPoint = [number, number]; // [timestamp, price]
