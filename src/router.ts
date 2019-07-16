import { Router } from 'express';
import modeController from './controllers/mode';
import revisionController from './controllers/revision';
import authController from './controllers/auth';

const router: Router = Router();

router.use('/mode', modeController);
router.use('/revision', revisionController);
router.use('/auth', authController);

export default router;
