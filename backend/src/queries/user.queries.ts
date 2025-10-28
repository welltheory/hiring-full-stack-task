import { prisma } from '$prisma/client';
import { UserDTO } from '$dtos/user.dto';
import { UserMapper } from '$mappers/user.mapper';

export class UserQueries {
  private mapper: UserMapper;

  constructor() {
    this.mapper = new UserMapper();
  }

  async findById(userId: string): Promise<UserDTO | null> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) return null;

    // Convert to entity first, then to DTO using mapper
    const entity = this.mapper.toDomain({ dbUser: user });
    return this.mapper.toDTO({ entity });
  }

  async findByEmail(email: string): Promise<UserDTO | null> {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) return null;

    const entity = this.mapper.toDomain({ dbUser: user });
    return this.mapper.toDTO({ entity });
  }

  async findAll(): Promise<UserDTO[]> {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    // Convert to entities, then to DTOs
    return users.map(user => {
      const entity = this.mapper.toDomain({ dbUser: user });
      return this.mapper.toDTO({ entity });
    });
  }
}
