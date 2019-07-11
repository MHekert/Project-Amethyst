process.env.NODE_ENV = 'test';
import { describe, it } from 'mocha';
import { expect, request, use } from 'chai';
import { connection } from 'mongoose';
import { MONGODB_URI_TEST } from '../../../src/util/secrets';
import chaiHttp from 'chai-http';
import { isArray } from 'lodash';
import app, { server } from '../../../src/server';
import getDummyIds from '../../dummyData/getDummyIds';
import Mode from '../../../src/models/mode';
import IModeModel from '../../../src/interfaces/mode/IModeModel';
import { getError400 } from '../../../src/util/errorObjects';
const mongoUri: string = MONGODB_URI_TEST;
use(chaiHttp);

describe(`GET on path`, () => {
	before(async () => {
		return connection.openUri(mongoUri, { useNewUrlParser: true, useCreateIndex: true });
	});
	after(async () => {
		server.close();
		return connection.close();
	});

	describe(`/mode/top`, async () => {
		let dummyIds: string[];
		before(async () => {
			dummyIds = await getDummyIds();
			return dummyIds;
		});
		after(async () => {
			return Mode.deleteMany({});
		});

		describe(`/:quantity with number in quantity's place`, () => {
			it(`should return array and status code 200`, (done) => {
				request(app)
					.get('/mode/top/10')
					.end((err, res) => {
						expect(res).have.status(200);
						expect(isArray(res.body)).to.equal(true);
						done();
					});
			});
		});
		describe(`/:quantity with sting quantity's place`, () => {
			it(`should return message and status code 400`, (done) => {
				request(app)
					.get('/mode/top/wrong_param')
					.end((err, res) => {
						expect(res).have.status(400);
						expect(res.body).to.be.deep.equal(getError400);
						done();
					});
			});
		});

		describe(`/:quantity?ids[]=... with correct params`, async () => {
			it(`should return array and status code 200`, (done) => {
				request(app)
					.get(`/mode/top/10?ids[]=${dummyIds[1]}&ids[]=${dummyIds[2]}`)
					.end((err, res) => {
						expect(res).have.status(200);
						expect(isArray(res.body)).to.equal(true);
						res.body.forEach((el: IModeModel) => expect(el.points).to.be.at.most(45));
						done();
					});
			});
		});
		describe(`/:quantity?ids[]=... with wrong quantity param`, () => {
			it(`should return message and status code 400`, (done) => {
				request(app)
					.get(`/mode/top/wrong_param?ids[]=${dummyIds[1]}&ids[]=${dummyIds[2]}`)
					.end((err, res) => {
						expect(res).have.status(400);
						expect(res.body).to.be.deep.equal(getError400);
						done();
					});
			});
		});

		describe(`/:quantity?ids[]=... with wrong ids query param`, () => {
			it(`should return message and status code 400`, (done) => {
				request(app)
					.get(`/mode/top/10?ids=wrong_param`)
					.end((err, res) => {
						expect(res).have.status(400);
						expect(res.body).to.be.deep.equal(getError400);
						done();
					});
			});
		});

		describe(`/:quantity?ids[]=... with ids query param not being hexadecimal`, () => {
			it(`should return message and status code 400`, (done) => {
				request(app)
					.get(`/mode/top/10?ids[]=not&ids[]=hex`)
					.end((err, res) => {
						expect(res).have.status(400);
						expect(res.body).to.be.deep.equal(getError400);
						done();
					});
			});
		});
	});
});
