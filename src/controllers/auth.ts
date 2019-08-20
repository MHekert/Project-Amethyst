import { Router } from 'express';
import authFacebookController from './auth/facebook';
import authFailController from './auth/failed';
import authSuccessController from './auth/success';
import authLogoutController from './auth/logout';
import isUserLoggedIn from './middleware/isUserLoggedIn';

const router: Router = Router();

router.use('/facebook', authFacebookController);
router.use('/fail', authFailController);
router.use('/success', authSuccessController);
router.use('/logout', isUserLoggedIn, authLogoutController);

export default router;
