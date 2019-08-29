process.env.NODE_ENV = 'test';
import { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';
import { isArray } from 'lodash';
import { describe, it } from 'mocha';
import { connection } from 'mongoose';

import app, { server } from '@src/server';
import { error400 } from '@util/errorObjects';
import { MONGODB_URI_TEST } from '@util/secrets';

const mongoUri: string = MONGODB_URI_TEST;
use(chaiHttp);

describe(`GET on path`, () => {
	before(async () => connection.openUri(mongoUri, { useNewUrlParser: true, useCreateIndex: true }));
	after(async () => {
		await server.close();
		return connection.close();
	});

	describe(`/mode/author/:author/:quantity/:offset`, () => {
		describe(`with correct parameters`, () => {
			it(`should return array and status code 200`, async () => {
				const res = await request(app).get('/mode/author/507f1f77bcf86cd799439011/10/10');
				expect(res).have.status(200);
				expect(isArray(res.body)).to.equal(true);
			});
		});
		describe(`with correct parameters (without optional offset)`, () => {
			it(`should return array and status code 200`, async () => {
				const res = await request(app).get('/mode/author/507f1f77bcf86cd799439011/10');
				expect(res).have.status(200);
				expect(isArray(res.body)).to.equal(true);
			});
		});
		describe(`with string in quantity's place`, () => {
			it(`should return message and status code 400`, async () => {
				const res = await request(app).get('/mode/author/123123/wrong_param/10');
				expect(res).have.status(400);
				expect(res.body).to.be.deep.equal(error400);
			});
		});
		describe(`with wrong offset param`, () => {
			it(`should return message and status code 400`, async () => {
				const res = await request(app).get('/mode/author/123123/10/wrong_param');
				expect(res).have.status(400);
				expect(res.body).to.be.deep.equal(error400);
			});
		});
		describe(`with wrong author param`, () => {
			it(`should return message and status code 400`, async () => {
				const res = await request(app).get('/mode/author/wrong_param/10/10');
				expect(res).have.status(400);
				expect(res.body).to.be.deep.equal(error400);
			});
		});

		describe(`with wrong params number`, () => {
			it(`should return message and status code 404`, async () => {
				const res = await request(app).get('/mode/author/wrong_param/10/10/something_else');
				expect(res).have.status(404);
			});
		});
	});
});
