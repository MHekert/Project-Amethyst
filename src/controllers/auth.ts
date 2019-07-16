import { Router } from 'express';
import authFacebookController from './auth/facebook';
import authFailController from './auth/failed';
import authSuccessController from './auth/success';
import authLogoutController from './auth/logout';

const router: Router = Router();

router.use('/facebook', authFacebookController);
router.use('/fail', authFailController);
router.use('/success', authSuccessController);
router.use('/logout', authLogoutController);

export default router;
