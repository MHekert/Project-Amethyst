import passport from 'passport';

import facebookStrategy from '@config/facebookStrategy';
import IUserModel from '@interfaces/user/IUserModel';
import User from '@models/user';

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
