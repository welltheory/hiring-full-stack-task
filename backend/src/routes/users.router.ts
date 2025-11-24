import { Router } from 'express';
import { UsersController } from '$controllers/users';

const router: Router = Router();
const controller = new UsersController();

router.get('/:id', controller.getById.bind(controller));
router.get('/', controller.getAll.bind(controller));

router.post('/', controller.create.bind(controller));
router.patch('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
