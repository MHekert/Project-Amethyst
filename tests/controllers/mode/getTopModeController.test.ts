import { expect, request } from 'chai';
import { isArray } from 'lodash';
import { describe, it } from 'mocha';

import { connectDB, disconnectDB } from '@config/mongoose';
import { getTopModeRoute } from '@controllers/mode/getTopModeController';
import getDummyIds from '@dummy/getDummyIds';
import IModeModel from '@interfaces/mode/IModeModel';
import Mode from '@models/mode/mode';
import app from '@tests/serverSetup';
import { error400 } from '@util/errorObjects';

app.use('/mode', getTopModeRoute);

describe(`GET on path`, () => {
	before(async () => connectDB(true));
	after(async () => disconnectDB());

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
				const res = await request(app).get(
					`/mode/top/10?ids[]=${dummyIds[1]}&ids[]=${dummyIds[2]}`
				);
				expect(res).have.status(200);
				expect(isArray(res.body)).to.equal(true);
				res.body.forEach((el: IModeModel) => expect(el.points).to.be.at.most(45));
			});
		});
		describe(`/:quantity?ids[]=... with wrong quantity param`, () => {
			it(`should return message and status code 400`, async () => {
				const res = await request(app).get(
					`/mode/top/wrong_param?ids[]=${dummyIds[1]}&ids[]=${dummyIds[2]}`
				);
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
