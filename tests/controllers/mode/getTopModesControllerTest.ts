process.env.NODE_ENV = 'test';
import { describe, it } from 'mocha';
import { expect, request, use } from 'chai';
import { connection } from 'mongoose';
import { MONGODB_URI_TEST } from '../../../src/util/secrets';
import chaiHttp from 'chai-http';
import { isArray } from 'lodash';
import app, { server } from '../../../src/server';
import getDummyIds from '../../dummyData/getDummyIds';
import Mode from '../../../src/models/mode/mode';
import IModeModel from '../../../src/interfaces/mode/IModeModel';
import { error400 } from '../../../src/util/errorObjects';
const mongoUri: string = MONGODB_URI_TEST;
use(chaiHttp);

describe(`GET on path`, () => {
	before(async () => connection.openUri(mongoUri, { useNewUrlParser: true, useCreateIndex: true }));
	after(async () => {
		await server.close();
		return connection.close();
	});

	describe(`/mode/top`, async () => {
		let dummyIds: string[];
		before(async () => (dummyIds = await getDummyIds()));
		after(async () => Mode.deleteMany({}));

		describe(`/:quantity with number in quantity's place`, () => {
			it(`should return array and status code 200`, async () => {
				const res = await request(app).get('/mode/top/10');
				expect(res).have.status(200);
				expect(isArray(res.body)).to.equal(true);
			});
		});
		describe(`/:quantity with sting quantity's place`, () => {
			it(`should return message and status code 400`, async () => {
				const res = await request(app).get('/mode/top/wrong_param');
				expect(res).have.status(400);
				expect(res.body).to.be.deep.equal(error400);
			});
		});

		describe(`/:quantity?ids[]=... with correct params`, () => {
			it(`should return array and status code 200`, async () => {
				const res = await request(app).get(`/mode/top/10?ids[]=${dummyIds[1]}&ids[]=${dummyIds[2]}`);
				expect(res).have.status(200);
				expect(isArray(res.body)).to.equal(true);
				res.body.forEach((el: IModeModel) => expect(el.points).to.be.at.most(45));
			});
		});
		describe(`/:quantity?ids[]=... with wrong quantity param`, () => {
			it(`should return message and status code 400`, async () => {
				const res = await request(app).get(`/mode/top/wrong_param?ids[]=${dummyIds[1]}&ids[]=${dummyIds[2]}`);
				expect(res).have.status(400);
				expect(res.body).to.be.deep.equal(error400);
			});
		});

		describe(`/:quantity?ids[]=... with wrong ids query param`, () => {
			it(`should return message and status code 400`, async () => {
				const res = await request(app).get(`/mode/top/10?ids=wrong_param`);
				expect(res).have.status(400);
				expect(res.body).to.be.deep.equal(error400);
			});
		});

		describe(`/:quantity?ids[]=... with ids query param not being hexadecimal`, () => {
			it(`should return message and status code 400`, async () => {
				const res = await request(app).get(`/mode/top/10?ids[]=not&ids[]=hex`);
				expect(res).have.status(400);
				expect(res.body).to.be.deep.equal(error400);
			});
		});
	});
});
