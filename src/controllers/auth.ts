import { Router } from 'express';
import { AuthFacebookController } from './auth/facebook';
import { AuthFailController } from './auth/failed';
import { AuthSuccessController } from './auth/success';
import { AuthLogoutController } from './auth/logout';

const router: Router = Router();

router.use('/facebook', AuthFacebookController);
router.use('/fail', AuthFailController);
router.use('/success', AuthSuccessController);
router.use('/logout', AuthLogoutController);

export const AuthController: Router = router;
