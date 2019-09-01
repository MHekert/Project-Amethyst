import { expect, request } from 'chai';

import { connectDB, disconnectDB } from '@config/mongoose';
import { unsetFavoriteActionRoute } from '@controllers/mode/action/unsetFavoriteActionController';
import { correctBody } from '@dummy/putModeBodyDummy';
import IModeModel from '@interfaces/mode/IModeModel';
import Mode from '@models/mode/mode';
import ModeAction from '@models/modeAction';
import app from '@tests/serverSetup';
import { error400 } from '@util/errorObjects';

app.use('/mode/action/', unsetFavoriteActionRoute);
let mode: IModeModel;

describe(`POST on path /mode/action/unsetfavorite`, () => {
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
