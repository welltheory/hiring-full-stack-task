import { Router } from 'express';
import { NotificationsController } from '$controllers/notifications';

const router: Router = Router();
const controller = new NotificationsController();

router.get('/', controller.getForUser);
router.get('/unread-count', controller.getUnreadCount);
router.post('/', controller.create);

export default router;
