process.env.NODE_ENV = 'test';
import { expect, request, use } from 'chai';
import { connection } from 'mongoose';
import { MONGODB_URI_TEST } from '../../../src/util/secrets';
import chaiHttp from 'chai-http';
import Mode from '../../../src/models/mode/mode';
import app, { server } from '../../../src/server';
import { correctBody, incorrectBody } from '../../dummyData/putModeBodyDummy';
import { error400 } from '../../../src/util/errorObjects';

const mongoUri: string = MONGODB_URI_TEST;
use(chaiHttp);

describe(`PUT on path /mode/add`, () => {
	before(async () => connection.openUri(mongoUri, { useNewUrlParser: true, useCreateIndex: true }));
	beforeEach(async () => Mode.deleteMany({}));
	after(async () => {
		await Mode.deleteMany({});
		await server.close();
		return connection.close();
	});

	describe(`with correct body`, () => {
		it(`should return object with nested mode and revision objects and status code 200`, async () => {
			const res = await request(app)
				.put('/mode/add')
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
				.put('/mode/add')
				.set('content-type', 'application/json')
				.send(incorrectBody);
			expect(res).have.status(400);
			expect(res.body.error).to.be.an('object');
			expect(res.body).to.be.deep.equal(error400);
		});
	});
});
