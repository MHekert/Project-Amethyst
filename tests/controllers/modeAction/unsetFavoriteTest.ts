process.env.NODE_ENV = 'test';
import { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';
import { connection } from 'mongoose';

import { correctBody } from '@dummy/putModeBodyDummy';
import IModeModel from '@interfaces/mode/IModeModel';
import Mode from '@models/mode/mode';
import ModeAction from '@models/modeAction';
import app from '@src/server';
import { error400 } from '@util/errorObjects';
import { MONGODB_URI_TEST } from '@util/secrets';

const mongoUri: string = MONGODB_URI_TEST;
use(chaiHttp);
let mode: IModeModel;

describe(`POST on path /mode/action/unsetfavorite`, () => {
	before(async () => await connection.openUri(mongoUri, { useNewUrlParser: true, useCreateIndex: true }));
	beforeEach(async () => {
		await Promise.all([ModeAction.deleteMany({}), Mode.deleteMany({})]);
		mode = await new Mode(correctBody).save();
	});
	after(async () => {
		await Promise.all([ModeAction.deleteMany({}), Mode.deleteMany({})]);
		return connection.close();
	});

	it('should return error 400 while no modeId in body', async () => {
		const res = await request(app)
			.post('/mode/action/unsetfavorite')
			.set('content-type', 'application/json')
			.send({});
		expect(res).have.status(400);
		expect(res.body).to.be.deep.equal(error400);
	});

	it('should return status code 304', async () => {
		const res = await request(app)
			.post('/mode/action/unsetfavorite')
			.set('content-type', 'application/json')
			.send({ modeId: mode._id });
		expect(res).have.status(304);
	});

	it('should return status code 200 and change points value accordingly', async () => {
		await request(app)
			.post('/mode/action/setfavorite')
			.set('content-type', 'application/json')
			.send({ modeId: mode._id });
		const res = await request(app)
			.post('/mode/action/unsetfavorite')
			.set('content-type', 'application/json')
			.send({ modeId: mode._id });
		expect(res).have.status(200);
		const updatedMode = await Mode.findById(mode._id);
		expect(updatedMode.favorites).to.be.equal(mode.favorites);
	});
});
