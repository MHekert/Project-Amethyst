import { Router } from 'express';
import { body } from 'express-validator/check';

import authController from '@controllers/auth';
import errorHandler from '@controllers/middleware/errorHandler';
import isUserLoggedIn from '@controllers/middleware/isUserLoggedIn';
import validateRequest from '@controllers/middleware/validateRequest';
import modeController from '@controllers/mode';
import modeActionController from '@controllers/modeAction';
import revisionController from '@controllers/revision';

const router: Router = Router();

router.use('/mode', modeController);
router.use('/revision', revisionController);
router.use('/mode/action', isUserLoggedIn, [body('modeId').isMongoId()], validateRequest, modeActionController);
router.use('/auth', authController);
router.use(errorHandler);

export default router;
