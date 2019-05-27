import bodyParser from 'body-parser';
import mongo from 'connect-mongo';
import express, { Request, Response } from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import passport from 'passport';
import { logger } from './util/logger';
import { isDev, MONGODB_URI, PORT, SESSION_SECRET } from './util/secrets';
import { morganConsole, morganFile } from './util/httpLogger';
import { GetModesController } from './controllers/getModes';
const app = express();

if (isDev) {
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

app.use('/modes', GetModesController);

app.listen(port, () => {
	logger.log('info', `The magic happens on port ${port}!`);
});
