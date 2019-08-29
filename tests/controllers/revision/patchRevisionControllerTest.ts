import { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';
import { connection } from 'mongoose';

import createDummyModes from '@dummy/createDummyModes';
import Mode from '@models/mode/mode';
import app, { server } from '@src/server';
import { error400 } from '@util/errorObjects';
import { MONGODB_URI_TEST } from '@util/secrets';

use(chaiHttp);
const mongoUri: string = MONGODB_URI_TEST;
const requestBody = { body: 'new body', code: 'newcode', changelog: ['new changelog1', 'new changelog2'] };

describe(`PATCH on path /revision/:modeId/:revisionId`, () => {
	before(async () => connection.openUri(mongoUri, { useNewUrlParser: true, useCreateIndex: true }));
	beforeEach(async () => Mode.deleteMany({}));
	after(async () => {
		await Mode.deleteMany({});
		await server.close();
		return connection.close();
	});

	describe(`with correct params and body`, () => {
		it(`should return status code 200`, async () => {
			const modes = await createDummyModes();
			const mode = modes.pop();
			const revisionId = (<any>mode.revisions[0])._id;
			const res = await request(app)
				.patch(`/revision/${mode._id}/${revisionId}`)
				.set('content-type', 'application/json')
				.send(requestBody);
			expect(res).have.status(200);
		});
	});

	describe(`with correct params and empty body`, () => {
		it(`should return status code 507`, async () => {
			const modes = await createDummyModes();
			const mode = modes.pop();
			const revisionId = (<any>mode.revisions[0])._id;
			const res = await request(app)
				.patch(`/revision/${mode._id}/${revisionId}`)
				.set('content-type', 'application/json');
			expect(res).have.status(400);
			expect(res.body).to.be.deep.equal(error400);
		});
	});

	describe(`with wrong param`, () => {
		it(`should return status code 507`, async () => {
			const modes = await createDummyModes();
			const mode = modes.pop();
			const res = await request(app)
				.patch(`/revision/${mode._id}/wrong_param`)
				.set('content-type', 'application/json')
				.send(requestBody);
			expect(res).have.status(400);
			expect(res.body).to.be.deep.equal(error400);
		});
	});

	describe(`with correct params and wrong body`, () => {
		it(`should return status code 200`, async () => {
			const modes = await createDummyModes();
			const mode = modes.pop();
			const revisionId = (<any>mode.revisions[0])._id;
			const res = await request(app)
				.patch(`/revision/${mode._id}/${revisionId}`)
				.set('content-type', 'application/json')
				.send({ body: 2 });
			expect(res).have.status(400);
			expect(res.body).to.be.deep.equal(error400);
		});
	});
});
