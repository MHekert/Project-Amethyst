process.env.NODE_ENV = 'test';
import { expect, request, use } from 'chai';
import { connection } from 'mongoose';
import { MONGODB_URI_TEST } from '../../../src/util/secrets';
import chaiHttp from 'chai-http';
import ModeAction from '../../../src/models/modeAction';
import app from '../../../src/server';
import { correctBody } from '../../dummyData/putModeBodyDummy';
import Mode from '../../../src/models/mode/mode';
import IModeModel from '../../../src/interfaces/mode/IModeModel';
import { error400 } from '../../../src/util/errorObjects';

const mongoUri: string = MONGODB_URI_TEST;
use(chaiHttp);
let mode: IModeModel;

describe(`POST on path /mode/action/unsetvote`, () => {
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
			.post('/mode/action/unsetvote')
			.set('content-type', 'application/json')
			.send({});
		expect(res).have.status(400);
		expect(res.body).to.be.deep.equal(error400);
	});

	it('should return status code 304', async () => {
		const res = await request(app)
			.post('/mode/action/unsetvote')
			.set('content-type', 'application/json')
			.send({ modeId: mode._id });
		expect(res).have.status(304);
	});

	it('should return status code 200 and change points value accordingly', async () => {
		await request(app)
			.post('/mode/action/upvote')
			.set('content-type', 'application/json')
			.send({ modeId: mode._id });
		const res = await request(app)
			.post('/mode/action/unsetvote')
			.set('content-type', 'application/json')
			.send({ modeId: mode._id });
		expect(res).have.status(200);
		const updatedMode = await Mode.findById(mode._id);
		expect(updatedMode.points).to.be.equal(mode.points);
	});
});
