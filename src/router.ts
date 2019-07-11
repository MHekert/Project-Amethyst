import { Router } from 'express';
import modeController from './controllers/mode';
import revisionController from './controllers/revision';

const router: Router = Router();

router.use('/mode', modeController);
router.use('/revision', revisionController);

export default router;
