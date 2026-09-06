export interface Post {
  id: number;
  title: string;
  content: string;
  autor: string;
  discipline: {
    id: number;
    name: string;
  };
  createdAt: string;
}

export interface PaginatedResponse<T> {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  data: T[];
}

export interface PostListParams {
  page?: number;
  limit?: number;
  search?: string;
}

