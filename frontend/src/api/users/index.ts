import Fetch from '@/utils/fetch';
import type {
  GetUsersResponse,
  GetUserResponse,
  GetUserParams,
  CreateUserParams,
  CreateUserResponse,
  UpdateUserParams,
  UpdateUserResponse,
  DeleteUserParams,
  DeleteUserResponse,
} from './types';

const fetch = new Fetch({ path: '/api/users' });

/**
 * Get all users
 */
export const getUsers = async (): Promise<GetUsersResponse> => {
  const response = await fetch.get<GetUsersResponse>('/');
  return response.data;
};

/**
 * Get user by ID
 */
export const getUser = async (params: GetUserParams): Promise<GetUserResponse> => {
  const response = await fetch.get<GetUserResponse>(`/${params.id}`);
  return response.data;
};

/**
 * Create a new user
 */
export const createUser = async (params: CreateUserParams): Promise<CreateUserResponse> => {
  const response = await fetch.post<CreateUserResponse>('/', { data: params });
  return response.data;
};

/**
 * Update an existing user
 */
export const updateUser = async (
  id: string,
  params: UpdateUserParams
): Promise<UpdateUserResponse> => {
  const response = await fetch.patch<UpdateUserResponse>(`/${id}`, { data: params });
  return response.data;
};

/**
 * Delete a user
 */
export const deleteUser = async (params: DeleteUserParams): Promise<DeleteUserResponse> => {
  const response = await fetch.delete<DeleteUserResponse>(`/${params.id}`);
  return response.data;
};
