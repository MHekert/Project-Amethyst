process.env.NODE_ENV = 'test';
import { describe, it } from 'mocha';
import { expect, request, use } from 'chai';
import { connection } from 'mongoose';
import { MONGODB_URI_TEST } from '../../../src/util/secrets';
import chaiHttp from 'chai-http';
import { isArray } from 'lodash';
import app, { server } from '../../../src/server';
import { error400 } from '../../../src/util/errorObjects';
const mongoUri: string = MONGODB_URI_TEST;
use(chaiHttp);

describe(`GET on path`, () => {
	before(async () => connection.openUri(mongoUri, { useNewUrlParser: true, useCreateIndex: true }));
	after(async () => {
		await server.close();
		return connection.close();
	});

	describe(`/mode/new`, () => {
		describe(`/:quantity with number in quantity's place`, () => {
			it(`should return array and status code 200`, async () => {
				const res = await request(app).get('/mode/new/10');
				expect(res).have.status(200);
				expect(isArray(res.body)).to.equal(true);
			});
		});
		describe(`/:quantity with sting quantity's place`, () => {
			it(`should return message and status code 400`, async () => {
				const res = await request(app).get('/mode/new/wrong_param');
				expect(res).have.status(400);
				expect(res.body).to.be.deep.equal(error400);
			});
		});
		describe(`/:quantity/:date with correct params`, () => {
			it(`should return array and status code 200`, async () => {
				const res = await request(app).get('/mode/new/10/2019-05-28T16:55:56.496Z');
				expect(res).have.status(200);
				expect(isArray(res.body)).to.equal(true);
			});
		});
		describe(`/:quantity/:date with wrong quantity param`, () => {
			it(`should return message and status code 400`, async () => {
				const res = await request(app).get('/mode/new/wrong_param/2019-05-28T16:55:56.496Z');
				expect(res).have.status(400);
				expect(res.body).to.be.deep.equal(error400);
			});
		});
		describe(`/:quantity/:date with wrong date param`, () => {
			it(`should return message and status code 400`, async () => {
				const res = await request(app).get('/mode/new/10/2019-05-2');
				expect(res).have.status(400);
				expect(res.body).to.be.deep.equal(error400);
			});
		});

		describe(`/:quantity/:date/ with wrong params number`, () => {
			it(`should return message and status code 404`, async () => {
				const res = await request(app).get('/mode/new/10/2019-05-28T16:55:56.496Z/something_else');
				expect(res).have.status(404);
			});
		});
	});
});
