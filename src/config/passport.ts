import passport from 'passport';
import User from '../models/user';
import IUserModel from '../interfaces/user/IUserModel';
import facebookStrategy from './facebookStrategy';

export default (passport: passport.PassportStatic) => {
	passport.use(facebookStrategy);

	passport.serializeUser((user: IUserModel, done) => {
		done(null, user._id);
	});

	passport.deserializeUser((id, done) => {
		User.findById(id, function(err, user) {
			done(err, user);
		});
	});
};
