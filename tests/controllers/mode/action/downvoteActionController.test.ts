import { expect, request } from 'chai';

import { connectDB, disconnectDB } from '@config/mongoose';
import { downvoteActionRoute } from '@controllers/mode/action/downvoteActionController';
import { correctBody } from '@dummy/putModeBodyDummy';
import IModeModel from '@interfaces/mode/IModeModel';
import Mode from '@models/mode/mode';
import ModeAction from '@models/modeAction';
import app from '@tests/serverSetup';
import { error400 } from '@util/errorObjects';

app.use('/mode/action/', downvoteActionRoute);
let mode: IModeModel;

describe(`POST on path /mode/action/downvote`, () => {
	before(async () => connectDB(true));
	beforeEach(async () => {
		await Promise.all([ModeAction.deleteMany({}), Mode.deleteMany({})]);
		mode = await new Mode(correctBody).save();
	});
	after(async () => {
		await Promise.all([ModeAction.deleteMany({}), Mode.deleteMany({})]);
		return disconnectDB();
	});

	it('should return error 400 while no modeId in body', async () => {
		const res = await request(app)
			.post('/mode/action/downvote')
			.set('content-type', 'application/json')
			.send({});
		expect(res).have.status(400);
		expect(res.body).to.be.deep.equal(error400);
	});

	it('should return code 200 initially, then 304 and decrease points by 1', async () => {
		const res1 = await request(app)
			.post('/mode/action/downvote')
			.set('content-type', 'application/json')
			.send({ modeId: mode._id });
		const res2 = await request(app)
			.post('/mode/action/downvote')
			.set('content-type', 'application/json')
			.send({ modeId: mode._id });
		expect(res1).have.status(200);
		expect(res2).have.status(304);
		const updatedMode = await Mode.findById(mode._id);
		expect(updatedMode.points).to.be.equal(mode.points - 1);
	});

	it('should return status code 200 and decrease points correctly after upvote', async () => {
		await request(app)
			.post('/mode/action/upvote')
			.set('content-type', 'application/json')
			.send({ modeId: mode._id });
		const res = await request(app)
			.post('/mode/action/downvote')
			.set('content-type', 'application/json')
			.send({ modeId: mode._id });
		expect(res).have.status(200);
		const updatedMode = await Mode.findById(mode._id);
		expect(updatedMode.points).to.be.equal(mode.points - 1);
	});
});
