import { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';
import { connection } from 'mongoose';

import correctBody from '@dummy/dummyRevisionCorrectBody';
import Mode from '@models/mode/mode';
import app, { server } from '@src/server';
import { error400 } from '@util/errorObjects';
import { MONGODB_URI_TEST } from '@util/secrets';

const mongoUri: string = MONGODB_URI_TEST;
use(chaiHttp);

describe(`PUT on path /revision/add`, () => {
	before(async () => connection.openUri(mongoUri, { useNewUrlParser: true, useCreateIndex: true }));
	beforeEach(async () => Mode.deleteMany({}));
	after(async () => {
		await Mode.deleteMany({});
		await server.close();
		return connection.close();
	});

	describe(`with correct body`, () => {
		it(`should return saved revision object and status code 200`, async () => {
			const mode = await new Mode().save();
			const requestBody = { ...correctBody, modeId: mode._id };
			const res = await request(app)
				.put('/revision/add')
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
				.put('/revision/add')
				.set('content-type', 'application/json')
				.send({});
			expect(res).have.status(400);
			expect(res.body).to.be.deep.equal(error400);
		});
	});
});
