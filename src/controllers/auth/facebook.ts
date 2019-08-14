import { Router } from 'express';
import passport from 'passport';

const router: Router = Router();

router.get('/', passport.authenticate('facebook'));
router.get(
	'/callback',
	passport.authenticate('facebook', {
		successRedirect: '/auth/success',
		failureRedirect: '/auth/fail'
	})
);

export default router;
