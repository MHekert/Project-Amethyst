import { expect, request, use } from 'chai';
import { connection, Types } from 'mongoose';
import { MONGODB_URI_TEST } from '../../../src/util/secrets';
import chaiHttp from 'chai-http';
import Mode from '../../../src/models/mode/mode';
import app, { server } from '../../../src/server';
import { error400, notFoundError } from '../../../src/util/errorObjects';
import { createDummyRevisions } from '../../dummyData/dummyRevisions';

const mongoUri: string = MONGODB_URI_TEST;
use(chaiHttp);

describe(`DELETE on path /revision/:modeId/:revisionId`, () => {
	before(async () => connection.openUri(mongoUri, { useNewUrlParser: true, useCreateIndex: true }));
	beforeEach(async () => Mode.deleteMany({}));
	after(async () => {
		await Mode.deleteMany({});
		await server.close();
		return connection.close();
	});

	describe(`with correct params`, () => {
		it('should return status code 200', async () => {
			const mode = await createDummyRevisions();
			const res = await request(app).delete(`/revision/${mode._id}/${mode.revisions[0]._id}`);
			expect(res).to.have.status(200);
		});
	});

	describe(`with wrong params`, () => {
		it('should return status code 400 and error object', async () => {
			const res = await request(app).delete(`/revision/wrong/params`);
			expect(res).to.have.status(400);
			expect(res.body).to.be.deep.equal(error400);
		});
	});

	describe(`with params leading to not existing element`, () => {
		it('should return status code 404 and error object', async () => {
			const res = await request(app).delete(`/revision/${new Types.ObjectId()}/${new Types.ObjectId()}`);
			expect(res).to.have.status(404);
			expect(res.body).to.be.deep.equal(notFoundError);
		});
	});
});
