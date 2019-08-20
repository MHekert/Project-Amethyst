import { Router } from 'express';
import addModeController from './mode/addModeController';
import getNewModesController from './mode/getNewModesController';
import getTopModesController from './mode/getTopModesController';
import getModesByAuthorController from './mode/getModesByAuthorController';
import isUserLoggedIn from './middleware/isUserLoggedIn';

const router: Router = Router();

router.use('/add', isUserLoggedIn, addModeController);
router.use('/new', getNewModesController);
router.use('/top', getTopModesController);
router.use('/author', getModesByAuthorController);

export default router;
