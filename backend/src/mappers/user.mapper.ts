import { User as DbUser } from '$prisma/client';
import { UserEntity } from '$entities/user.entity';
import { UserDTO } from '$dtos/user.dto';
import { BaseMapper } from './base.mapper';

export type UserMapperToDomainParams = {
  dbUser: DbUser;
};

export type UserMapperToDtoParams = {
  entity: UserEntity;
};

export class UserMapper extends BaseMapper<
  UserEntity,
  UserDTO,
  UserMapperToDomainParams,
  UserMapperToDtoParams
> {
  toDomain(params: UserMapperToDomainParams): UserEntity {
    const { dbUser } = params;
    return new UserEntity({
      id: dbUser.id,
      email: dbUser.email,
      firstName: dbUser.firstName,
      lastName: dbUser.lastName,
      createdAt: dbUser.createdAt,
      updatedAt: dbUser.updatedAt,
    });
  }

  toDTO(params: UserMapperToDtoParams): UserDTO {
    const { entity } = params;

    return {
      id: entity.id,
      email: entity.email,
      firstName: entity.firstName,
      lastName: entity.lastName,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
