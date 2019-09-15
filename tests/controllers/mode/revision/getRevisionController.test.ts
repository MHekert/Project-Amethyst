import { expect, request } from 'chai';
import { isArray } from 'lodash';
import { describe, it } from 'mocha';

import { connectDB, disconnectDB } from '@config/mongoose';
import { getRevisionRoute } from '@controllers/mode/revision/getRevisionController';
import { createDummyRevisions } from '@dummy/dummyRevisions';
import Mode from '@models/mode/mode';
import app from '@tests/serverSetup';
import { error400 } from '@util/errorObjects';

app.use('/mode/revision/', getRevisionRoute);
let modeId: string;

describe(`GET on path /mode/revision/:modeId/:quantity?/:offset?`, () => {
	before(async () => {
		await connectDB(true);
		await Mode.deleteMany({});
		modeId = (await createDummyRevisions())._id;
		return createDummyRevisions();
	});

	after(async () => {
		await Mode.deleteMany({});
		return disconnectDB();
	});

	describe(`without optional params: quantity and offset`, () => {
		it(`should return array with correct objects and status code 200`, async () => {
			const res = await request(app).get(`/mode/revision/${modeId}`);
			expect(res).have.status(200);
			expect(isArray(res.body)).to.equal(true);
			expect(res.body.length).to.equal(3);
			expect(res.body[0].code).to.equal('code3');
			expect(res.body[res.body.length - 1].code).to.equal('code1');
		});
	});

	describe(`with modeId and quantity`, () => {
		it(`should return array with correct objects and status code 200`, async () => {
			const res = await request(app).get(`/mode/revision/${modeId}/2`);
			expect(res).have.status(200);
			expect(isArray(res.body)).to.equal(true);
			expect(res.body.length).to.equal(2);
			expect(res.body[res.body.length - 1].code).to.equal('code2');
			expect(res.body[0].code).to.equal('code3');
		});
	});

	describe(`with modeId, quantity and offset`, () => {
		it(`should return array with correct objects and status code 200`, async () => {
			const res = await request(app).get(`/mode/revision/${modeId}/2/1`);
			expect(res).have.status(200);
			expect(isArray(res.body)).to.equal(true);
			expect(res.body.length).to.equal(2);
			expect(res.body[0].code).to.equal('code2');
			expect(res.body[res.body.length - 1].code).to.equal('code1');
		});
	});

	describe(`with sting in offset's place`, () => {
		it(`should return message and status code 400`, async () => {
			const res = await request(app).get(`/mode/revision/${modeId}/wrong_param`);
			expect(res).have.status(400);
			expect(res.body).to.be.deep.equal(error400);
		});
	});
});
