import bodyParser from 'body-parser';
import mongo from 'connect-mongo';
import express, { Request, Response } from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import passport from 'passport';
import cors from 'cors';
import { isDev, MONGODB_URI, PORT, SESSION_SECRET } from './util/secrets';
import { morganConsole, morganFile } from './util/httpLogger';
import router from './router';

const app = express();
app.use(cors());
if (isDev && process.env.NODE_ENV !== 'test') {
	app.use(morganConsole);
	app.use(morganFile);
}

const MongoStore = mongo(session);
const mongoUri: string = MONGODB_URI;
const port = PORT;
const secret = SESSION_SECRET;

mongoose.connection.openUri(mongoUri, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false });

app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true
	})
);

app.use(
	session({
		cookie: { secure: false },
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
