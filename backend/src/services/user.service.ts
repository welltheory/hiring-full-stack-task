import { prisma } from '$prisma/client';
import { NotFoundError, ConflictError, ValidationError } from '$utils/errors';
import { UserEntity } from '$entities/user.entity';
import { UserRepository } from '$repositories/user.repository';
import { eventsEmitter } from '$events';
import { UserCreatedEvent } from '$events/user/user-created.event';
import { UserUpdatedEvent } from '$events/user/user-updated.event';
import { UserDeletedEvent } from '$events/user/user-deleted.event';
import { z } from 'zod';

export type UserServiceParams = {
  repository?: UserRepository;
};

export const createUserSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
});

export const updateUserSchema = z.object({
  email: z.string().email().optional(),
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
});

export type UserServiceCreateParams = {
  data: z.infer<typeof createUserSchema>;
};

export type UserServiceUpdateParams = {
  userId: string;
  data: {
    email?: string;
    firstName?: string;
    lastName?: string;
  };
};

export type UserServiceDeleteParams = {
  userId: string;
};

export class UserService {
  private repository: UserRepository;

  constructor(params: UserServiceParams = {}) {
    this.repository = params.repository ?? new UserRepository(prisma);
  }

  async update(params: UserServiceUpdateParams): Promise<{ user: UserEntity; }> {
    const { userId, data } = params;

    // Validate data
    const validatedData = updateUserSchema.safeParse(data);
    if (!validatedData.success) {
      throw new ValidationError('Invalid user data');
    }

    // Find user by id
    const user = await this.repository.findById(userId);
    if (!user) {
      throw new NotFoundError('User not found');
    }

    // Update user
    const updated = await this.repository.update(userId, data);

    // Publish event
    const event = new UserUpdatedEvent({
      userId: updated.id,
      changes: data,
    });
    eventsEmitter.publish(event);

    return { user: updated };
  }

  async create(params: UserServiceCreateParams): Promise<{ user: UserEntity; }> {
    const { data } = params;

    // Validate data
    const validatedData = createUserSchema.safeParse(data);
    if (!validatedData.success) {
      throw new ValidationError('Invalid user data');
    }

    // Check if user with this email already exists
    const existing = await this.repository.findByEmail(data.email);
    if (existing) {
      throw new ConflictError('User with this email already exists');
    }

    // Create user entity
    const user = await this.repository.create(data);

    // Publish event
    const event = new UserCreatedEvent({
      userId: user.id,
      email: user.email,
    });
    eventsEmitter.publish(event);

    return { user };
  }

  async delete(params: UserServiceDeleteParams): Promise<void> {
    const { userId } = params;

    // Find user by id
    const user = await this.repository.findById(userId);
    if (!user) {
      throw new NotFoundError('User not found');
    }

    // Delete user
    await this.repository.delete(userId);

    // Publish event
    const event = new UserDeletedEvent({
      userId,
    });
    eventsEmitter.publish(event);
  }
}
