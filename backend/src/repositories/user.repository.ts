import { PrismaClient, Prisma } from '$prisma/client';
import { UserEntity } from '$entities/user.entity';
import { UserMapper } from '$mappers/user.mapper';

// Repositories handle data access and return domain entities
export class UserRepository {
  private mapper: UserMapper;

  constructor(private readonly prisma: PrismaClient) {
    this.mapper = new UserMapper();
  }

  /**
   * Find user by ID
   * @returns UserEntity or null
   */
  async findById(id: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) return null;
    return this.mapper.toDomain({ dbUser: user });
  }

  /**
   * Find user by email
   * @returns UserEntity or null
   */
  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) return null;
    return this.mapper.toDomain({ dbUser: user });
  }

  /**
   * List all users
   * @returns Array of UserEntity
   */
  async listAll(): Promise<UserEntity[]> {
    const users = await this.prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return users.map((user) => this.mapper.toDomain({ dbUser: user }));
  }

  /**
   * Create a new user
   * @returns UserEntity
   */
  async create(data: Prisma.UserCreateInput): Promise<UserEntity> {
    const user = await this.prisma.user.create({
      data,
    });

    return this.mapper.toDomain({ dbUser: user });
  }

  /**
   * Update an existing user
   * @returns UserEntity
   */
  async update(
    id: string,
    data: Partial<Prisma.UserUpdateInput>
  ): Promise<UserEntity> {
    const user = await this.prisma.user.update({
      where: { id },
      data,
    });

    return this.mapper.toDomain({ dbUser: user });
  }

  /**
   * Delete a user
   * @returns void
   */
  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }
}
