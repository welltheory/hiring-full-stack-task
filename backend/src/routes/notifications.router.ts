import { Router } from 'express';
import { NotificationsController } from '$controllers/notifications';

const router: Router = Router();
const controller = new NotificationsController();

// All routes use authenticated user from req.user (populated by auth middleware)
router.get('/', controller.getForUser.bind(controller));
router.get('/unread-count', controller.getUnreadCount.bind(controller));
router.post('/', controller.create.bind(controller));
router.post('/mark-all-read', controller.markAllRead.bind(controller));

export default router;
