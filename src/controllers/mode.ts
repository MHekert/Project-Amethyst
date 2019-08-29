import { Router } from 'express';

import isUserLoggedIn from '@controllers/middleware/isUserLoggedIn';
import addModeController from '@controllers/mode/addModeController';
import getModesByAuthorController from '@controllers/mode/getModesByAuthorController';
import getNewModesController from '@controllers/mode/getNewModesController';
import getTopModesController from '@controllers/mode/getTopModesController';

const router: Router = Router();

router.use('/add', isUserLoggedIn, addModeController);
router.use('/new', getNewModesController);
router.use('/top', getTopModesController);
router.use('/author', getModesByAuthorController);

export default router;
