import { Router } from 'express';

import authFacebookController from '@controllers/auth/facebook';
import authFailController from '@controllers/auth/failed';
import authLogoutController from '@controllers/auth/logout';
import authSuccessController from '@controllers/auth/success';
import isUserLoggedIn from '@controllers/middleware/isUserLoggedIn';

const router: Router = Router();

router.use('/facebook', authFacebookController);
router.use('/fail', authFailController);
router.use('/success', authSuccessController);
router.use('/logout', isUserLoggedIn, authLogoutController);

export default router;
