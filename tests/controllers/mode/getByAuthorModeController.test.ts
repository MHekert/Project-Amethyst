import { expect, request } from 'chai';
import { isArray } from 'lodash';
import { describe, it } from 'mocha';

import { connectDB, disconnectDB } from '@config/mongoose';
import { getByAuthorModeRoute } from '@controllers/mode/getByAuthorModeController';
import app from '@tests/serverSetup';
import { error400 } from '@util/errorObjects';

app.use('/mode', getByAuthorModeRoute);

describe(`GET on path`, () => {
	before(async () => connectDB(true));
	after(async () => disconnectDB());

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
