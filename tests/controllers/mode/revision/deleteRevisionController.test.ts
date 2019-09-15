import { expect, request } from 'chai';
import { describe, it } from 'mocha';
import { Types } from 'mongoose';

import { connectDB, disconnectDB } from '@config/mongoose';
import { deleteRevisionRoute } from '@controllers/mode/revision/deleteRevisionController';
import { createDummyRevisions } from '@dummy/dummyRevisions';
import Mode from '@models/mode/mode';
import app from '@tests/serverSetup';
import { error400, notFoundError } from '@util/errorObjects';

app.use('/mode/revision/', deleteRevisionRoute);

describe(`DELETE on path /mode/revision/:modeId/:revisionId`, () => {
	before(async () => connectDB(true));
	beforeEach(async () => Mode.deleteMany({}));
	after(async () => {
		await Mode.deleteMany({});
		return disconnectDB();
	});

	describe(`with correct params`, () => {
		it('should return status code 200', async () => {
			const mode = await createDummyRevisions();
			const res = await request(app).delete(
				`/mode/revision/${mode._id}/${mode.revisions[0]._id}`
			);
			expect(res).to.have.status(200);
		});
	});

	describe(`with wrong params`, () => {
		it('should return status code 400 and error object', async () => {
			const res = await request(app).delete(`/mode/revision/wrong/params`);
			expect(res).to.have.status(400);
			expect(res.body).to.be.deep.equal(error400);
		});
	});

	describe(`with params leading to not existing element`, () => {
		it('should return status code 404 and error object', async () => {
			const res = await request(app).delete(
				`/mode/revision/${new Types.ObjectId()}/${new Types.ObjectId()}`
			);
			expect(res).to.have.status(404);
			expect(res.body).to.be.deep.equal(notFoundError);
		});
	});
});
