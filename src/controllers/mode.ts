import { Router } from 'express';
import addModeController from './mode/addModeController';
import getNewModesController from './mode/getNewModesController';
import getTopModesController from './mode/getTopModesController';

const router: Router = Router();

router.use('/add', addModeController);
router.use('/new', getNewModesController);
router.use('/top', getTopModesController);

export default router;
