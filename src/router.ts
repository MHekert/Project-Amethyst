import { Router } from 'express';
import modeController from './controllers/mode';
import revisionController from './controllers/revision';
import modeActionController from './controllers/modeAction';

const router: Router = Router();

router.use('/mode', modeController);
router.use('/revision', revisionController);
router.use('/mode/action', modeActionController);

export default router;
