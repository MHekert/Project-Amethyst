import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

import { connectDB } from '@config/mongoose';
import passport from '@config/passport';
import session from '@config/session';
import router from '@src/router';
import { morganConsole, morganFile } from '@util/httpLogger';
import { FRONTEND_URL, PORT } from '@util/secrets';

const port = PORT;
const app = express();

app.use(helmet());
app.use(cors({ origin: FRONTEND_URL, credentials: true }));

app.use(morganConsole);
app.use(morganFile);

connectDB();
app.use(session());

app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true
	})
);

app.use(passport.initialize());
app.use(passport.session());
app.use(router);

app.listen(port);
