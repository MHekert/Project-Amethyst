import passport from 'passport';
import User from '../models/user';
import IUserModel from '../interfaces/user/IUserModel';
import facebookStrategy from './facebookStrategy';

passport.use(facebookStrategy);

passport.serializeUser((user: IUserModel, done: any) => done(null, user._id));

passport.deserializeUser(async (id: string, done: any) => {
	try {
		const user = await User.findById(id).exec();
		done(null, user);
	} catch (err) {
		done(err, null);
	}
});

export default passport;
