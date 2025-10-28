import { Router } from 'express';
import { UsersController } from '$controllers/users';

const router: Router = Router();
const controller = new UsersController();

// ✅ NEW PATTERN - Routes delegate to controllers
// Controllers handle request/response logic and instantiate dependencies
// Validation happens at the service layer (not route layer)

// GET endpoints use Queries for fast reads (return DTOs directly)
router.get('/:id', controller.getById.bind(controller));
router.get('/', controller.getAll.bind(controller));

// POST/PATCH/DELETE endpoints use Services (work with entities, convert to DTOs)
router.post('/', controller.create.bind(controller));
router.patch('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
