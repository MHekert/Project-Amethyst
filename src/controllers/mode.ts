import { Router } from 'express';
import addModeController from './mode/addModeController';
import getNewModesController from './mode/getNewModesController';
import getTopModesController from './mode/getTopModesController';

const router: Router = Router();

router.put('/add', addModeController);
router.get('/new', getNewModesController);
router.get('/top', getTopModesController);

export default router;
