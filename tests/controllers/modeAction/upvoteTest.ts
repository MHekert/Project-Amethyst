process.env.NODE_ENV = 'test';
import { expect, request, use } from 'chai';
import { connection, Types } from 'mongoose';
import { MONGODB_URI_TEST } from '../../../src/util/secrets';
import chaiHttp from 'chai-http';
import ModeAction from '../../../src/models/modeAction';
import app from '../../../src/server';
import { correctBody } from '../../dummyData/putModeBodyDummy';
import Mode from '../../../src/models/mode/mode';
import IModeModel from '../../../src/interfaces/mode/IModeModel';

const mongoUri: string = MONGODB_URI_TEST;
use(chaiHttp);
let mode: IModeModel;

describe(`POST on path /mode/action/upvote`, () => {
	before(async () => {
		await connection.openUri(mongoUri, { useNewUrlParser: true, useCreateIndex: true });
		await Promise.all([ModeAction.deleteMany({}), Mode.deleteMany({})]);
	});
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
			.post('/mode/action/upvote')
			.set('content-type', 'application/json')
			.send({});
		expect(res).have.status(400);
		expect(res.body.error).to.have.property('message', 'Wrong params in body');
		expect(res.body.error).to.have.property('status', 400);
	});

	it('should return status code 200 on first request, 304 second and increase points by 1', async () => {
		const res1 = await request(app)
			.post('/mode/action/upvote')
			.set('content-type', 'application/json')
			.send({ modeId: mode._id });
		const res2 = await request(app)
			.post('/mode/action/upvote')
			.set('content-type', 'application/json')
			.send({ modeId: mode._id });
		expect(res1).have.status(200);
		expect(res2).have.status(304);
		const updatedMode = await Mode.findById(mode._id);
		expect(updatedMode.points).to.be.equal(mode.points + 1);
	});

	it('should return status code 200 and decrease points correctly after downvote', async () => {
		await request(app)
			.post('/mode/action/downvote')
			.set('content-type', 'application/json')
			.send({ modeId: mode._id });
		const res = await request(app)
			.post('/mode/action/upvote')
			.set('content-type', 'application/json')
			.send({ modeId: mode._id });
		expect(res).have.status(200);
		const updatedMode = await Mode.findById(mode._id);
		expect(updatedMode.points).to.be.equal(mode.points + 1);
	});
});
