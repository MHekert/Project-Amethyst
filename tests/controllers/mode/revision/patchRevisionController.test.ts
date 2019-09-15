import { expect, request } from 'chai';
import { describe, it } from 'mocha';

import { connectDB, disconnectDB } from '@config/mongoose';
import { patchRevisionRoute } from '@controllers/mode/revision/patchRevisionController';
import createDummyModes from '@dummy/createDummyModes';
import Mode from '@models/mode/mode';
import app from '@tests/serverSetup';
import { error400 } from '@util/errorObjects';

app.use('/mode/revision/', patchRevisionRoute);

const requestBody = {
	body: 'new body',
	code: 'newcode',
	changelog: ['new changelog1', 'new changelog2']
};

describe(`PATCH on path /mode/revision/:modeId/:revisionId`, () => {
	before(async () => connectDB(true));
	beforeEach(async () => Mode.deleteMany({}));
	after(async () => {
		await Mode.deleteMany({});
		return disconnectDB();
	});

	describe(`with correct params and body`, () => {
		it(`should return status code 200`, async () => {
			const modes = await createDummyModes();
			const mode = modes.pop();
			const revisionId = (<any>mode.revisions[0])._id;
			const res = await request(app)
				.patch(`/mode/revision/${mode._id}/${revisionId}`)
				.set('content-type', 'application/json')
				.send(requestBody);
			expect(res).have.status(200);
		});
	});

	describe(`with correct params and empty body`, () => {
		it(`should return status code 400`, async () => {
			const modes = await createDummyModes();
			const mode = modes.pop();
			const revisionId = (<any>mode.revisions[0])._id;
			const res = await request(app)
				.patch(`/mode/revision/${mode._id}/${revisionId}`)
				.set('content-type', 'application/json');
			expect(res).have.status(400);
			expect(res.body).to.be.deep.equal(error400);
		});
	});

	describe(`with wrong param`, () => {
		it(`should return status code 400`, async () => {
			const modes = await createDummyModes();
			const mode = modes.pop();
			const res = await request(app)
				.patch(`/mode/revision/${mode._id}/wrong_param`)
				.set('content-type', 'application/json')
				.send(requestBody);
			expect(res).have.status(400);
			expect(res.body).to.be.deep.equal(error400);
		});
	});

	describe(`with correct params and wrong body`, () => {
		it(`should return status code 400`, async () => {
			const modes = await createDummyModes();
			const mode = modes.pop();
			const revisionId = (<any>mode.revisions[0])._id;
			const res = await request(app)
				.patch(`/mode/revision/${mode._id}/${revisionId}`)
				.set('content-type', 'application/json')
				.send({ body: 2 });
			expect(res).have.status(400);
			expect(res.body).to.be.deep.equal(error400);
		});
	});
});
