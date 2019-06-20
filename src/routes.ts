import { Router } from 'express';
import { GetModesController } from './controllers/getModes';
import { GetRevisionsController } from './controllers/getRevisions';
import { AddModeController } from './controllers/addMode';
import { AddRevisionController } from './controllers/addRevision';
import { AuthController } from './controllers/auth';

const router: Router = Router();

router.use('/modes', GetModesController);
router.use('/revisions', GetRevisionsController);
router.use('/', AddModeController);
router.use('/', AddRevisionController);
router.use('/auth', AuthController);

export const RoutesController: Router = router;
