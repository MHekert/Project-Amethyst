import { expect, request } from 'chai';
import { describe, it } from 'mocha';

import { connectDB, disconnectDB } from '@config/mongoose';
import { putModeRoute } from '@controllers/mode/putModeController';
import { correctBody, incorrectBody } from '@dummy/putModeBodyDummy';
import Mode from '@models/mode/mode';
import app from '@tests/serverSetup';
import { error400 } from '@util/errorObjects';

app.use('/mode', putModeRoute);

describe(`PUT on path /mode`, () => {
	before(async () => connectDB(true));
	beforeEach(async () => Mode.deleteMany({}));
	after(async () => {
		await Mode.deleteMany({});
		return disconnectDB();
	});

	describe(`with correct body`, () => {
		it(`should return object with nested mode and revision objects and status code 200`, async () => {
			const res = await request(app)
				.put('/mode')
				.set('content-type', 'application/json')
				.send(correctBody);
			expect(res).have.status(200);
			expect(res.body).to.be.an('object');
			expect(res.body).to.have.property('mode');
			expect(res.body.mode).to.have.property('revisions');
			expect(res.body.mode.revisions).to.have.lengthOf(1);
		});
	});

	describe(`with incorrect body`, () => {
		it(`should return object with error description and status code 400`, async () => {
			const res = await request(app)
				.put('/mode')
				.set('content-type', 'application/json')
				.send(incorrectBody);
			expect(res).have.status(400);
			expect(res.body.error).to.be.an('object');
			expect(res.body).to.be.deep.equal(error400);
		});
	});
});
