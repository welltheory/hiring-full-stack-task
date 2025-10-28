/**
 * User API types
 *
 * These types match the backend DTOs and Prisma models.
 */

export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateUserParams = {
  email: string;
  firstName: string;
  lastName: string;
};

export type UpdateUserParams = Partial<CreateUserParams>;

export type GetUserParams = {
  id: string;
};

export type DeleteUserParams = {
  id: string;
};

export type GetUsersResponse = User[];

export type GetUserResponse = User;

export type CreateUserResponse = User;

export type UpdateUserResponse = User;

export type DeleteUserResponse = {
  success: boolean;
};
