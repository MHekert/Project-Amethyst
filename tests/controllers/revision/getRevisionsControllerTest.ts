import { describe, it } from 'mocha';
import { expect, request, use } from 'chai';
import { connection } from 'mongoose';
import { MONGODB_URI_TEST } from '../../../src/util/secrets';
import chaiHttp from 'chai-http';
import { isArray } from 'lodash';
import app, { server } from '../../../src/server';
import Mode from '../../../src/models/mode/mode';
import { createDummyRevisions } from '../../dummyData/dummyRevisions';

const mongoUri: string = MONGODB_URI_TEST;
use(chaiHttp);

let modeId: string;

describe(`GET on path /revision/:modeId/:quantity?/:offset?`, () => {
	before(async () => {
		await connection.openUri(mongoUri, { useNewUrlParser: true, useCreateIndex: true });
		await Mode.deleteMany({});
		modeId = (await createDummyRevisions())._id;
		return createDummyRevisions();
	});

	after(async () => {
		await server.close();
		await Mode.deleteMany({});
		return connection.close();
	});

	describe(`without optional params: quantity and offset`, () => {
		it(`should return array with correct objects and status code 200`, async () => {
			const res = await request(app).get(`/revision/${modeId}`);
			expect(res).have.status(200);
			expect(isArray(res.body)).to.equal(true);
			expect(res.body.length).to.equal(3);
			expect(res.body[0].code).to.equal('code3');
			expect(res.body[res.body.length - 1].code).to.equal('code1');
		});
	});

	describe(`with modeId and quantity`, () => {
		it(`should return array with correct objects and status code 200`, async () => {
			const res = await request(app).get(`/revision/${modeId}/2`);
			expect(res).have.status(200);
			expect(isArray(res.body)).to.equal(true);
			expect(res.body.length).to.equal(2);
			expect(res.body[res.body.length - 1].code).to.equal('code2');
			expect(res.body[0].code).to.equal('code3');
		});
	});

	describe(`with modeId, quantity and offset`, () => {
		it(`should return array with correct objects and status code 200`, async () => {
			const res = await request(app).get(`/revision/${modeId}/2/1`);
			expect(res).have.status(200);
			expect(isArray(res.body)).to.equal(true);
			expect(res.body.length).to.equal(2);
			expect(res.body[0].code).to.equal('code2');
			expect(res.body[res.body.length - 1].code).to.equal('code1');
		});
	});

	describe(`with sting in offset's place`, () => {
		it(`should return message and status code 400`, async () => {
			const res = await request(app).get(`/revision/${modeId}/wrong_param`);
			expect(res).have.status(400);
			expect(res.body).to.be.deep.equal({ error: { message: 'Wrong params in path', status: 400 } });
		});
	});
});
