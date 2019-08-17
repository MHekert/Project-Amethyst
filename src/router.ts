import { Router } from 'express';
import modeController from './controllers/mode';
import revisionController from './controllers/revision';
import modeActionController from './controllers/modeAction';
import authController from './controllers/auth';
import isUserLoggedIn from './controllers/middleware/isUserLoggedIn';
import isAuthorOfMode from './controllers/middleware/isAuthorOfMode';
import validateRequest from './controllers/middleware/validateRequest';
import { body } from 'express-validator/check';
import errorHandler from './controllers/middleware/errorHandler';

const router: Router = Router();

router.use('/mode', modeController);
router.use('/revision', revisionController);
router.use(
	'/mode/action',
	isUserLoggedIn,
	[body('modeId').isHexadecimal()],
	validateRequest,
	isAuthorOfMode,
	modeActionController
);
router.use('/auth', authController);
router.use(errorHandler);

export default router;
