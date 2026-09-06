import { apiFetch } from './client';
import type {
  PaginatedResponse,
  Post,
  PostListParams,
} from '@/types/post';

export const postsService = {
  findAll(
    params?: PostListParams,
  ): Promise<PaginatedResponse<Post>> {
    const searchParams = new URLSearchParams();

    if (params?.page) {
      searchParams.set('page', String(params.page));
    }

    if (params?.limit) {
      searchParams.set('limit', String(params.limit));
    }

    if (params?.search) {
      searchParams.set('search', params.search);
    }

    const queryString = searchParams.toString();

    return apiFetch<PaginatedResponse<Post>>(
      `/posts${queryString ? `?${queryString}` : ''}`,
    );
  },

  findOne(id: number): Promise<Post> {
    return apiFetch<Post>(`/posts/${id}`);
  },
};