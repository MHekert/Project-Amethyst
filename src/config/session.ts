import mongo from 'connect-mongo';
import expressSession from 'express-session';

import { MONGODB_URI, SESSION_SECRET } from '@util/secrets';

const MongoStore = mongo(expressSession);
const mongoUri = MONGODB_URI;
const secret = SESSION_SECRET;

const session = () =>
	expressSession({
		secret,
		cookie: { secure: false, httpOnly: true },
		resave: false,
		saveUninitialized: false,
		store: new MongoStore({
			autoReconnect: true,
			collection: 'sessions',
			stringify: false,
			url: mongoUri
		}),
		unset: 'destroy'
	});

export default session;
