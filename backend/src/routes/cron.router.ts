import { Router } from 'express';
import { CronController } from '$controllers/cron';

const router: Router = Router();
const controller = new CronController();

// Called by scheduler daily at 8:00 AM
// Generates AI-powered notification digests for all active users
router.post('/daily-digest', controller.generateDailyDigests.bind(controller));

export default router;
