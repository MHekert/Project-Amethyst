import { Strategy } from 'passport-facebook';
import User from '../models/user';
import { FACEBOOK_APP_ID, FACEBOOK_APP_SECRET, FACEBOOK_CALLBACK_URL } from '../util/secrets';

export default new Strategy(
	{
		clientID: FACEBOOK_APP_ID,
		clientSecret: FACEBOOK_APP_SECRET,
		callbackURL: FACEBOOK_CALLBACK_URL,
		profileFields: ['id', 'emails', 'displayName']
	},
	async (token, tokenSecret, profile, done) => {
		const currentUser = await User.findOne({
			'account.facebook.id': profile.id
		});
		if (!currentUser) {
			const newUser = await new User({
				'account.facebook.name': profile._json.name,
				'account.facebook.id': profile.id,
				'account.facebook.token': token
			}).save();
			if (newUser) {
				return done(null, newUser);
			}
		}
		return done(null, currentUser);
	}
);
