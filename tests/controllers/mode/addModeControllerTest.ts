process.env.NODE_ENV = 'test';
import { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';
import { connection } from 'mongoose';

import { correctBody, incorrectBody } from '@dummy/putModeBodyDummy';
import Mode from '@models/mode/mode';
import app, { server } from '@src/server';
import { error400 } from '@util/errorObjects';
import { MONGODB_URI_TEST } from '@util/secrets';

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
