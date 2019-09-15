import { expect, request } from 'chai';
import { describe, it } from 'mocha';

import { connectDB, disconnectDB } from '@config/mongoose';
import { putRevisionRoute } from '@controllers/mode/revision/putRevisionController';
import correctBody from '@dummy/dummyRevisionCorrectBody';
import Mode from '@models/mode/mode';
import app from '@tests/serverSetup';
import { error400 } from '@util/errorObjects';

app.use('/mode/revision/', putRevisionRoute);

describe(`PUT on path /mode/revision`, () => {
	before(async () => connectDB(true));
	beforeEach(async () => Mode.deleteMany({}));
	after(async () => {
		await Mode.deleteMany({});
		return disconnectDB();
	});

	describe(`with correct body`, () => {
		it(`should return saved revision object and status code 200`, async () => {
			const mode = await new Mode().save();
			const requestBody = { ...correctBody, modeId: mode._id };
			const res = await request(app)
				.put('/mode/revision')
				.set('content-type', 'application/json')
				.send(requestBody);
			expect(res).have.status(200);
			expect(res.body).to.be.an('object');
			expect(res.body).to.have.property('_id');
			expect(res.body).to.have.property('code', requestBody.code);
			expect(res.body).to.have.property('createdAt');
			expect(res.body).to.have.property('body');
		});
	});
	describe(`with incorrect body`, () => {
		it(`should return object with error description and status code 400`, async () => {
			const res = await request(app)
				.put('/mode/revision')
				.set('content-type', 'application/json')
				.send({});
			expect(res).have.status(400);
			expect(res.body).to.be.deep.equal(error400);
		});
	});
});
