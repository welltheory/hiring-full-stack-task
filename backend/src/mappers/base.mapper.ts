export abstract class BaseMapper<
  Entity, 
  DTO,
  ToDomainParams extends Record<string, any>,
  ToDtoParams extends Record<string, any>,
  > {
  /**
   * Convert Prisma model to Domain Entity
   * Used by Repositories when fetching data from database
   */
  abstract toDomain(params: ToDomainParams): Entity;

  /**
   * Convert Domain Entity to DTO
   * Used by Routes/Queries when returning data to API
   */
  abstract toDTO(params: ToDtoParams): DTO;
}
