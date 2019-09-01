import { Router } from 'express';
import passport from 'passport';

const facebookRoute: Router = Router();

facebookRoute.get('/', passport.authenticate('facebook'));
facebookRoute.get(
	'/callback',
	passport.authenticate('facebook', {
		successRedirect: '/auth/success',
		failureRedirect: '/auth/fail'
	})
);

export default facebookRoute;
