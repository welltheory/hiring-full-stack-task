import { Request, Response } from 'express';

export class CronController {
  /**
   * Generates daily notification digests for all users
   */
  async generateDailyDigests(req: Request, res: Response) {
    // TODO: Implement daily digest generation
    // This endpoint is called by a scheduler to generate digests for all users

    res.json({
      message: 'Not implemented yet',
      todo: 'Generate AI-powered notification digests for all users'
    });
  }
}
