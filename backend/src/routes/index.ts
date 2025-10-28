import RootRouter from './root.router';
import CronRouter from './cron.router';
import NotificationsRouter from './notifications.router';
import UsersRouter from './users.router';

const router = RootRouter.getInstance();

router.registerBackgroundRouter({
  path: '/cron',
  router: CronRouter,
});
router.registerMainRouter({
  path: '/notifications',
  router: NotificationsRouter,
});
router.registerMainRouter({
  path: '/users',
  router: UsersRouter,
});

export default router.getRouter();
