import { Request, Response, NextFunction } from 'express';
import { UserService } from '$services/user.service';
import { UserQueries } from '$queries/user.queries';
import { UserMapper } from '$mappers/user.mapper';
import { NotFoundError } from '$utils/errors';

export type UserControllerParams = {
  userService?: UserService;
  userQueries?: UserQueries;
  userMapper?: UserMapper;
};

export class UsersController {
  private readonly userService: UserService;
  private readonly userQueries: UserQueries;
  private readonly userMapper: UserMapper;

  constructor(params: UserControllerParams = {}) {
    this.userService = params.userService ?? new UserService();
    this.userQueries = params.userQueries ?? new UserQueries();
    this.userMapper = params.userMapper ?? new UserMapper();
  }

  /**
   * GET /api/users/:id
   * Fetch user by ID (uses queries for fast reads)
   */
  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // Find user by id
      const user = await this.userQueries.findById(req.params.id);
      if (!user) throw new NotFoundError('User not found');

      res.json({
        user,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/users
   * List all users (uses queries for fast reads)
   */
  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // Find all users
      const users = await this.userQueries.findAll();
      res.json({
        users,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /api/users
   * Create new user (uses service for domain operations)
   */
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // Create user entity using service
      const { user } = await this.userService.create({ data: req.body });

      // Return DTO for response
      res.status(201).json({ id: user.id });
    } catch (error) {
      next(error);
    }
  }

  /**
   * PATCH /api/users/:id
   * Update user (uses service for domain operations)
   */
  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // Update user entity using service
      await this.userService.update({
        userId: req.params.id,
        data: req.body
      });

      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  }

  /**
   * DELETE /api/users/:id
   * Delete user (uses service for domain operations)
   */
  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // Delete user entity using service
      await this.userService.delete({ userId: req.params.id });

      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }
}
