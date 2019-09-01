import bodyParser from 'body-parser';
import { use } from 'chai';
import chaiHttp from 'chai-http';
import express from 'express';

const app = express();
use(chaiHttp);
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true
	})
);

export default app;
