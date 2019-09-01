import { expect, request } from 'chai';
import { isArray } from 'lodash';
import { describe, it } from 'mocha';

import { connectDB, disconnectDB } from '@config/mongoose';
import {
	getNewModeInitialRoute,
	getNewModeWithOffsetRoute
} from '@controllers/mode/getNewModeController';
import app from '@tests/serverSetup';
import { error400 } from '@util/errorObjects';

app.use('/mode', getNewModeInitialRoute);
app.use('/mode', getNewModeWithOffsetRoute);

describe(`GET on path`, () => {
	before(async () => connectDB(true));
	after(async () => disconnectDB());

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
				const res = await request(app).get(
					'/mode/new/wrong_param/2019-05-28T16:55:56.496Z'
				);
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
				const res = await request(app).get(
					'/mode/new/10/2019-05-28T16:55:56.496Z/something_else'
				);
				expect(res).have.status(404);
			});
		});
	});
});
