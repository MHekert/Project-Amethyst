import bodyParser from 'body-parser';
import mongo from 'connect-mongo';
import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import cors from 'cors';
import { isDev, MONGODB_URI, PORT, SESSION_SECRET, FRONTEND_URL } from './util/secrets';
import { morganConsole, morganFile } from './util/httpLogger';
import passport from './config/passport';

import router from './router';

const app = express();
app.use(cors({ origin: FRONTEND_URL, credentials: true }));
if (isDev && process.env.NODE_ENV !== 'test') {
	app.use(morganConsole);
	app.use(morganFile);
}

const MongoStore = mongo(session);
const mongoUri: string = MONGODB_URI;
const port = PORT;
const secret = SESSION_SECRET;

mongoose.connection.openUri(mongoUri, { useNewUrlParser: true, useCreateIndex: true });

app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true
	})
);

app.use(
	session({
		cookie: { secure: false, httpOnly: true },
		resave: false,
		saveUninitialized: false,
		secret: secret,
		store: new MongoStore({
			autoReconnect: true,
			collection: 'sessions',
			url: mongoUri
		}),
		unset: 'destroy'
	})
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/', router);

export const server = app.listen(port);
export default app;
